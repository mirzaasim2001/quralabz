// Server-side only. Holds NVIDIA_API_KEY, never sent to the browser.
// Deal Finder chat: narrows down what the user wants, searches Indian stores, and returns a price-ranked
// table. Ported from the Python/LangGraph prototype (WB/app.py). Serverless has no shared memory, so the
// browser sends the conversation with every message and a page reload starts fresh.
// Streams Server-Sent Events: token, status, discard (clear streamed text), final (turn to store), error, done.

import { NextRequest } from "next/server";
import { chat, type ChatMessage, type LlmResult } from "./llm";
import { searchDeals } from "./search";
import { readProductPages } from "./pages";
import { chatHistory, hasPrice, historyNote, madeUp, parseJson, pickRows, questionsAsked, renderAnswer, tail, type Turn } from "./deals";
import {
  AFTER_ANSWER,
  ANSWER_PROMPT,
  CORRECTION,
  DECLINE,
  MAX_QUESTIONS,
  NO_MORE_QUESTIONS,
  OFFERS_SEARCH,
  PROMISES_SEARCH,
  SEARCH_ONLY,
  SYSTEM_PROMPT,
  TOOLS,
} from "./prompts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
// Mumbai: users and the Indian stores are here (Vercel's default was iad1, US East).
export const preferredRegion = "bom1";

const MAX_TURNS = 40;
// Every model call in one reply shares this budget, so a reply finishes well inside maxDuration (60s)
// instead of Vercel cutting the stream off mid-way.
const REPLY_BUDGET_MS = 50_000;
// Below this much time left, the table is built from the raw results instead of asking the picker model.
const PICKER_MIN_MS = 8_000;
const MAX_MESSAGE_CHARS = 1000;

type Send = (event: string, data: unknown) => void;

function cleanHistory(raw: unknown): Turn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t) => t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string")
    .slice(-MAX_TURNS)
    .map((t) => ({
      role: t.role,
      content: String(t.content).slice(0, 8000),
      note: typeof t.note === "string" ? t.note.slice(0, 4000) : undefined,
      kind: ["chat", "question", "deals"].includes(t.kind) ? t.kind : undefined,
    }));
}

async function respond(history: Turn[], message: string, send: Send, debug = false) {
  const started = Date.now();
  const deadline = started + REPLY_BUDGET_MS;
  const turns: Turn[] = [...history, { role: "user", content: message }];
  const convo = chatHistory(turns);
  const answers = questionsAsked(turns);
  const lastBot = history.filter((t) => t.role === "assistant").pop();
  const system =
    SYSTEM_PROMPT + (answers >= MAX_QUESTIONS ? `\n\n${NO_MORE_QUESTIONS}` : answers ? `\n\n${AFTER_ANSWER}` : "");

  const token = (t: string) => send("token", t);
  const discard = () => send("discard", "");
  const forceSearch = (extra: ChatMessage[] = []) =>
    chat({ messages: [{ role: "system", content: SYSTEM_PROMPT }, ...convo, ...extra], tools: SEARCH_ONLY, toolChoice: "search_deals" }, deadline);

  let res: LlmResult;
  let lead = ""; // text already on screen before a search (e.g. a recommendation)

  if (answers >= MAX_QUESTIONS && lastBot?.kind === "question") {
    // They answered a second question about this product: search now, never another question.
    res = await forceSearch();
  } else {
    res = await chat({ messages: [{ role: "system", content: system }, ...convo], tools: TOOLS }, deadline, token, discard);
    if (!res.toolCalls.length && madeUp(res.content, turns)) {
      // Made-up prices (or an echoed results note) instead of a search: clear it, one retry, then force the search.
      discard();
      res = await chat({ messages: [{ role: "system", content: `${system}\n\n${CORRECTION}` }, ...convo], tools: TOOLS }, deadline, token, discard);
      if (!res.toolCalls.length && madeUp(res.content, turns)) {
        discard();
        res = await forceSearch();
      }
    }
    const asksAgain =
      res.toolCalls[0]?.name === "ask_user" || (!res.toolCalls.length && tail(res.content).includes("?") && !DECLINE.test(res.content));
    const end = tail(res.content, 150);
    // It said "let me check deals…", or recommended something right after answering our question, but didn't search.
    const promised = !end.includes("?") && (PROMISES_SEARCH.test(end) || (answers > 0 && !DECLINE.test(res.content)));
    if (answers >= MAX_QUESTIONS && asksAgain) {
      // A third question about the same product: drop it from the screen and search with what we know.
      // Its text stays in context, so a recommendation inside it ("a bomber suits you…") picks the product.
      discard();
      res = await forceSearch(res.content.trim() ? [{ role: "assistant", content: res.content }] : []);
    } else if (!res.toolCalls.length && promised && res.content.trim()) {
      lead = res.content;
      res = await forceSearch([{ role: "assistant", content: res.content }]);
    } else if (!res.toolCalls.length && answers > 0 && OFFERS_SEARCH.test(end) && !DECLINE.test(res.content)) {
      // Right after the user answered our question it recommended something and then *asked* whether to check
      // deals ("Want me to check current deals?"). Just search: keep the recommendation, drop the offer.
      lead = res.content.replace(/[^.!?\n]*\bwant me to\b[^?]*\?[^\n]*$/i, "").trim();
      discard();
      if (lead) token(lead);
      res = await forceSearch([{ role: "assistant", content: res.content }]);
    } else if (res.toolCalls[0]?.name === "search_deals") {
      lead = res.content;
    }
  }

  const call = res.toolCalls[0];
  const withLead = (text: string) => (lead.trim() ? `${lead.trim()}\n\n${text}` : text);

  if (!call) {
    send("final", { role: "assistant", content: res.content, kind: "chat" } satisfies Turn);
    return;
  }
  if (call.name === "ask_user") {
    const question = String(call.args.question ?? "").trim() || "Could you tell me a bit more about what you're looking for? 😊";
    send("token", `${res.content.trim() ? "\n\n" : ""}${question}`);
    send("final", { role: "assistant", content: withLead(question), kind: "question" } satisfies Turn);
    return;
  }

  send("status", "🔍 Searching stores for deals…");
  const searchAt = Date.now();
  const { text, artifact, diagnostics } = await searchDeals(call.args);
  send("status", "⚖️ Comparing prices…");
  const pickAt = Date.now();
  // Product pages (image + exact price) are read while the picker model runs, so they cost ~0-1s extra.
  const pagesReady = readProductPages(artifact.hits);

  // The picker only chooses listings (JSON, no tools; with tools Nemotron writes fake tool-call XML).
  // Sorting, per-store rows and the savings line are done in code so they're always right.
  const pickerConvo: ChatMessage[] = [...convo];
  if (lead.trim()) pickerConvo.push({ role: "assistant", content: lead });
  const results = `Search results:\n${text}`;
  const last = pickerConvo[pickerConvo.length - 1];
  if (last.role === "user") pickerConvo[pickerConvo.length - 1] = { role: "user", content: `${last.content}\n\n${results}` };
  else pickerConvo.push({ role: "user", content: results });

  // With no picks (models all down, or too little time left), pickRows builds the table from the raw results.
  let picked: ReturnType<typeof parseJson> = null;
  if (artifact.hits.length && deadline - Date.now() > PICKER_MIN_MS) {
    try {
      picked = parseJson((await chat({ messages: [{ role: "system", content: ANSWER_PROMPT }, ...pickerConvo], temperature: 0.2 }, deadline)).content);
    } catch {
      picked = null;
    }
  }
  const rows = pickRows(picked, artifact, await pagesReady);
  // Only when the request asks (debug: true): which stores answered, how, and how fast. No secrets in it.
  if (debug) {
    const now = Date.now();
    send("debug", { stores: diagnostics, picked: picked?.listings?.length ?? null, rows: rows.length, ms: { decide: searchAt - started, search: pickAt - searchAt, pickAndPages: now - pickAt } });
  }
  let summary = typeof picked?.summary === "string" ? picked.summary : "";
  // Prices belong only in the verified table: the picker sees only search text, so any price talk can contradict it.
  if (hasPrice(summary) || /\bprices?\b/i.test(summary)) summary = "";
  const answer = renderAnswer(rows, artifact, summary);

  send("token", `\n\n${answer}`);
  const note = historyNote(rows, artifact);
  send("final", { role: "assistant", content: withLead(answer), note: withLead(note), kind: "deals" } satisfies Turn);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const message = String(body?.message ?? "").trim().slice(0, MAX_MESSAGE_CHARS);
  if (!message) return Response.json({ error: "Empty message" }, { status: 400 });
  if (!process.env.NVIDIA_API_KEY) return Response.json({ error: "Server is missing its API key" }, { status: 500 });
  const history = cleanHistory(body?.history);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send: Send = (event, data) => controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      try {
        await respond(history, message, send, body?.debug === true);
      } catch (e) {
        const msg = String(e instanceof Error ? e.message : e);
        send("error", /overload|timed? ?out|no time left|empty reply|5\d\d/i.test(msg) ? "NVIDIA's servers are busy right now 😓 please send that again in a moment." : "Something went wrong. Please try again.");
      }
      send("done", "");
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", "X-Accel-Buffering": "no" },
  });
}
