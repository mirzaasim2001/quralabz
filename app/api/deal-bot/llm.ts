// Streaming chat calls to NVIDIA's OpenAI-compatible API, with a backup model.
// Server-side only: reads NVIDIA_API_KEY, which never reaches the browser.

const API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
// Tried in order; each gets up to this long without receiving data before the next takes over.
// Nemotron 3 Super answers in ~1-3s. gpt-oss-20b (same key) was 4-5x slower as a main model (it always
// reasons first), so it's the backup. The last attempt retries Super: by then a brief overload has
// usually cleared. (Nemotron 3 Ultra was tried as the third: 17s replies and 500s on forced tool calls.)
const MODELS: [model: string, idleMs: number][] = [
  ["nvidia/nemotron-3-super-120b-a12b", 10_000],
  ["openai/gpt-oss-20b", 20_000],
  ["nvidia/nemotron-3-super-120b-a12b", 15_000],
];
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
  onToken?: (t: string) => void,
): Promise<LlmResult> {
  // Abort when no data arrives for idleMs (covers both the wait for the first byte and stalls mid-stream),
  // or once hardMs has passed in total, so a slow-but-steady stream can't outlast the reply's time budget.
  const ctrl = new AbortController();
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
          onToken?.(delta.content);
        }
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

/**
 * Tries each model in MODELS until one gives a usable reply, never running past `deadline` (epoch ms).
 * An error, silence, or an empty reply moves on to the next model. If a model had already streamed text,
 * onDiscard tells the UI to clear it before the next model's reply.
 */
export async function chat(
  req: LlmRequest,
  deadline: number,
  onToken?: (t: string) => void,
  onDiscard?: () => void,
): Promise<LlmResult> {
  let streamed = false;
  const emit = onToken
    ? (t: string) => {
        streamed = true;
        onToken(t);
      }
    : undefined;
  let lastError: unknown = new Error("No time left for a model call");

  for (const [model, idleMs] of MODELS) {
    const left = deadline - Date.now();
    if (left < MIN_ATTEMPT_MS) break;
    try {
      const result = await streamOnce(model, req, Math.min(idleMs, left), left, emit);
      if (result.content.trim() || result.toolCalls.length) return result;
      lastError = new Error(`${model} returned an empty reply`);
    } catch (e) {
      lastError = e;
    }
    if (streamed) onDiscard?.();
    streamed = false;
  }
  throw lastError;
}
