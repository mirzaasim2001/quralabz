// Streaming chat calls to NVIDIA's OpenAI-compatible API, with a backup model.
// Server-side only: reads NVIDIA_API_KEY, which never reaches the browser.

const API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
// Nemotron 3 Super answers in ~0.5-1s, but now and then a request sits in NVIDIA's queue for 5-40s, and a tool
// call arrives in one piece at the end, so silence can't tell a stall from work. So requests are raced: a second
// Super request starts after HEDGE_AFTER_MS, gpt-oss-20b (same key; slower, it reasons first) after BACKUP_AFTER_MS.
// The first to produce answer text or a tool call wins. Two stalls in a row (an outage, not a blip) put the
// backup first for DEGRADED_MS. Same design as WB/app.py (Hedged), tested there with fake models.
const MAIN = "nvidia/nemotron-3-super-120b-a12b";
const BACKUP = "openai/gpt-oss-20b";
const HEDGE_AFTER_MS = 2_000;
const BACKUP_AFTER_MS = 6_000;
const IDLE_MS = 15_000; // silence mid-reply after a request has started answering
const DEGRADED_MS = 120_000;
const MIN_ATTEMPT_MS = 2_000;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
}
export interface LlmResult {
  content: string;
  toolCalls: ToolCall[];
}
export interface LlmRequest {
  messages: ChatMessage[];
  tools?: readonly unknown[];
  toolChoice?: string;
  temperature?: number;
}

function parseArgs(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

async function streamOnce(
  model: string,
  req: LlmRequest,
  idleMs: number,
  hardMs: number,
  outer: AbortSignal,
  onToken?: (t: string) => void,
  onAnswer?: () => void,
): Promise<LlmResult> {
  // Abort when no data arrives for idleMs (covers both the wait for the first byte and stalls mid-stream),
  // or once hardMs has passed in total, so a slow-but-steady stream can't outlast the reply's time budget.
  const ctrl = new AbortController();
  if (outer.aborted) ctrl.abort();
  outer.addEventListener("abort", () => ctrl.abort());
  const hardStop = setTimeout(() => ctrl.abort(), hardMs);
  let timer = setTimeout(() => ctrl.abort(), idleMs);
  const stillAlive = () => {
    clearTimeout(timer);
    timer = setTimeout(() => ctrl.abort(), idleMs);
  };

  const body: Record<string, unknown> = {
    model,
    messages: req.messages,
    stream: true,
    temperature: req.temperature ?? 1,
    top_p: 0.95,
    max_tokens: 2048,
  };
  if (req.tools) {
    body.tools = req.tools;
    if (req.toolChoice) body.tool_choice = { type: "function", function: { name: req.toolChoice } };
  }
  if (model.includes("nemotron")) body.chat_template_kwargs = { enable_thinking: false };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok || !res.body) throw new Error(`NVIDIA ${res.status}: ${(await res.text()).slice(0, 200)}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let content = "";
    const calls: { name: string; args: string }[] = [];
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      stillAlive();
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const data = line.startsWith("data:") ? line.slice(5).trim() : "";
        if (!data || data === "[DONE]") continue;
        let chunk;
        try {
          chunk = JSON.parse(data);
        } catch {
          continue;
        }
        // NVIDIA reports overloads mid-stream ("Service temporarily overloaded") as an error chunk.
        if (chunk.error) throw new Error(typeof chunk.error === "string" ? chunk.error : chunk.error.message ?? "stream error");
        const delta = chunk.choices?.[0]?.delta;
        if (!delta) continue;
        if (delta.content) {
          content += delta.content;
          onAnswer?.();
          onToken?.(delta.content);
        }
        if (delta.tool_calls?.length) onAnswer?.();
        for (const tc of delta.tool_calls ?? []) {
          const call = (calls[tc.index ?? 0] ??= { name: "", args: "" });
          if (tc.function?.name && !call.name) call.name = tc.function.name;
          if (tc.function?.arguments) call.args += tc.function.arguments;
        }
      }
    }
    return { content, toolCalls: calls.filter((c) => c?.name).map((c) => ({ name: c.name, args: parseArgs(c.args) })) };
  } catch (e) {
    if (ctrl.signal.aborted) throw new Error(`${model} timed out`);
    throw e;
  } finally {
    clearTimeout(timer);
    clearTimeout(hardStop);
  }
}

let recentStalls: boolean[] = []; // shared by requests on this server instance
let degradedUntil = 0;

function recordStall(stalled: boolean) {
  recentStalls = [...recentStalls, stalled].slice(-2);
  if (recentStalls.length === 2 && recentStalls.every(Boolean)) {
    degradedUntil = Date.now() + DEGRADED_MS;
    recentStalls = [];
  }
}

interface Lane {
  ctrl: AbortController;
  tokens: string[];
  answered: boolean;
  failed: boolean;
  result?: LlmResult;
}

/**
 * Races model requests (see the constants above) and resolves with the first usable reply, never running past
 * `deadline` (epoch ms). Only the winning request's tokens reach onToken. If the winner breaks off mid-reply,
 * onDiscard tells the UI to clear its text and another request takes over.
 */
export function chat(
  req: LlmRequest,
  deadline: number,
  onToken?: (t: string) => void,
  onDiscard?: () => void,
): Promise<LlmResult> {
  const degraded = Date.now() < degradedUntil;
  const schedule: [model: string, startAfterMs: number][] = degraded
    ? [[BACKUP, 0], [MAIN, HEDGE_AFTER_MS], [MAIN, BACKUP_AFTER_MS]]
    : [[MAIN, 0], [MAIN, HEDGE_AFTER_MS], [BACKUP, BACKUP_AFTER_MS]];
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const lanes: Lane[] = [];
    let speaker = -1;
    let finished = false;
    let lastError: unknown = new Error("No time left for a model call");
    let nextTimer: ReturnType<typeof setTimeout> | undefined;
    const deadlineTimer = setTimeout(() => end(() => reject(lastError)), Math.max(0, deadline - Date.now()));

    function end(settle: () => void) {
      if (finished) return;
      finished = true;
      clearTimeout(nextTimer);
      clearTimeout(deadlineTimer);
      lanes.forEach((l) => l.ctrl.abort());
      settle();
    }

    function promote(i: number) {
      speaker = i;
      lanes[i].tokens.forEach((t) => onToken?.(t));
      if (lanes[i].result) end(() => resolve(lanes[i].result!));
    }

    function scheduleNext() {
      clearTimeout(nextTimer);
      if (finished || speaker !== -1 || lanes.length >= schedule.length) return;
      const wait = schedule[lanes.length][1] - (Date.now() - startedAt);
      nextTimer = setTimeout(start, Math.max(0, wait));
    }

    function fail(i: number, e: unknown) {
      if (finished) return;
      lastError = e;
      lanes[i].failed = true;
      if (speaker === i) {
        if (lanes[i].tokens.length) onDiscard?.();
        speaker = -1;
        const other = lanes.findIndex((l) => !l.failed && l.answered);
        if (other >= 0) return promote(other);
      }
      if (lanes.every((l) => l.failed)) {
        // Everything running has failed (e.g. overloaded): start the next request now, not on schedule.
        if (lanes.length < schedule.length && deadline - Date.now() >= MIN_ATTEMPT_MS) return start();
        return end(() => reject(lastError));
      }
      scheduleNext();
    }

    function start() {
      if (finished || speaker !== -1 || lanes.length >= schedule.length) return;
      const left = deadline - Date.now();
      if (left < MIN_ATTEMPT_MS) return;
      const i = lanes.length;
      const [model] = schedule[i];
      if (i === 1 && !degraded) recordStall(true); // the main model said nothing in time
      const lane: Lane = { ctrl: new AbortController(), tokens: [], answered: false, failed: false };
      lanes.push(lane);
      const answer = () => {
        if (lane.answered || finished) return;
        lane.answered = true;
        if (speaker === -1) {
          if (i === 0 && lanes.length === 1 && !degraded) recordStall(false);
          clearTimeout(nextTimer);
          promote(i);
        }
      };
      streamOnce(model, req, IDLE_MS, left, lane.ctrl.signal, (t) => {
        lane.tokens.push(t);
        if (speaker === i && !finished) onToken?.(t);
      }, answer).then(
        (result) => {
          if (finished) return;
          if (!result.content.trim() && !result.toolCalls.length) return fail(i, new Error(`${model} returned an empty reply`));
          lane.result = result;
          answer();
          if (speaker === i) end(() => resolve(result));
        },
        (e) => fail(i, e),
      );
      scheduleNext();
    }

    start();
    if (!lanes.length) end(() => reject(lastError));
  });
}
