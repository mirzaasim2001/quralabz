// Server-side only. Holds NVIDIA_API_KEY, never sent to the browser.
// The Deal Finder brain, shared by the website chat (route.ts) and the WhatsApp webhook.
// Deal Finder chat: narrows down what the user wants, searches Indian stores, and returns a price-ranked
// table. Ported from the Python/LangGraph prototype (WB/app.py). Serverless has no shared memory, so the
// browser sends the conversation with every message and a page reload starts fresh.
// Streams Server-Sent Events: token, status, discard (clear streamed text), final (turn to store), error, done.

import { chat, type ChatMessage, type LlmResult } from "./llm";
import { searchDeals, STORES } from "./search";
import { readProductPages, type PageInfo } from "./pages";
import { chatHistory, historyNote, madeUp, pickRows, questionsAsked, renderAnswer, renderWhatsApp, tail, type Turn } from "./deals";
import {
  AFTER_ANSWER,
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

const MAX_TURNS = 40;
// Every model call in one reply shares this budget, so a reply finishes well inside maxDuration (60s)
// instead of Vercel cutting the stream off mid-way.
const REPLY_BUDGET_MS = 50_000;
const PAGES_WAIT_MS = 1_200;
export const MAX_MESSAGE_CHARS = 1000;

export type Send = (event: string, data: unknown) => void;

export function cleanHistory(raw: unknown): Turn[] {
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

export async function respond(history: Turn[], message: string, send: Send, debug = false, whatsapp = false) {
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
  // A one-store search is for "anything on amazon?". The model sometimes passes a single store the user never
  // named ("sony wh-1000xm5" -> only Reliance), which hides every other store's deal: search all of them.
  const said = turns.filter((t) => t.role === "user").slice(-3).map((t) => t.content.toLowerCase()).join(" ");
  const asked = [call.args.stores].flat().filter(Boolean).map(String);
  if (asked.length === 1) {
    const key = asked[0].toLowerCase().replace(/\s+/g, "");
    const names = [key, STORES[key]?.[1].toLowerCase(), STORES[key]?.[0].split(".")[0]].filter(Boolean) as string[];
    if (!names.some((n) => said.includes(n))) delete call.args.stores;
  }
  const { artifact, diagnostics } = await searchDeals(call.args);
  send("status", "⚖️ Comparing prices…");
  const pickAt = Date.now();
  // No second model call: relevance.ts already keeps only the product asked about (or similar ones), and
  // sorting, per-store rows and the savings line are done in code. That call cost 1-3s, far more when NVIDIA
  // is slow. Product pages fill in a missing price or image, but never hold the answer up by more than this.
  const pages = await Promise.race([
    readProductPages(artifact.hits),
    new Promise<Map<number, PageInfo>>((r) => setTimeout(() => r(new Map()), PAGES_WAIT_MS)),
  ]);
  const rows = pickRows(null, artifact, pages);
  // Only when the request asks (debug: true): which stores answered, how, and how fast. No secrets in it.
  if (debug) {
    const now = Date.now();
    send("debug", { stores: diagnostics, rows: rows.length, ms: { decide: searchAt - started, search: pickAt - searchAt, pages: now - pickAt } });
  }
  const answer = whatsapp ? renderWhatsApp(rows, artifact) : renderAnswer(rows, artifact, "");

  send("token", `\n\n${answer}`);
  const note = historyNote(rows, artifact);
  send("final", { role: "assistant", content: withLead(answer), note: withLead(note), kind: "deals" } satisfies Turn);
}

