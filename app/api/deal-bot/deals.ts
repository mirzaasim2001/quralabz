// Conversation helpers, invented-price guard, and the ranked deals table. Ported from WB/app.py.

import { GREETING, PRICE_IN_TEXT } from "./prompts";
import { STORES, type Hit, type SearchArtifact } from "./search";
import type { ChatMessage } from "./llm";
import { cleanImage, type PageInfo } from "./pages";
import { affiliateUrl, storeSearchUrl } from "./affiliate";

/** One chat turn as the browser keeps it. The whole history is sent with every message (no server memory). */
export interface Turn {
  role: "user" | "assistant";
  content: string;
  /** For deal answers: a short text version of the table, which is what the model sees in later turns. */
  note?: string;
  kind?: "chat" | "question" | "deals";
}

export interface Row extends Omit<Hit, "price"> {
  product: string;
  price: number | null;
  image?: string;
}

const PRICE_ONE = /(?:₹|Rs\.?|INR)\s?(\d[\d,]{2,})/i;

export function tail(text: string, n = 120): string {
  return text.slice(-n);
}

export function toPrice(value: unknown): number | null {
  const n = parseFloat(String(value ?? "").replace(/[,₹\s]/g, ""));
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function pricesIn(text: string): number[] {
  return Array.from(text.matchAll(PRICE_IN_TEXT), (m) => toPrice(m[1])).filter((n): n is number => n !== null);
}

export function hasPrice(text: string): boolean {
  return PRICE_ONE.test(text);
}

/**
 * What the model sees: user turns and assistant replies as plain messages. Deal tables are replaced by their
 * short note, so the model keeps the facts for follow-ups but has no table to imitate (it otherwise starts
 * writing tables with invented prices).
 */
export function chatHistory(turns: Turn[]): ChatMessage[] {
  return turns.map((t) => ({ role: t.role, content: t.role === "assistant" ? t.note ?? t.content : t.content }));
}

/** Amounts the user typed ("30k", "3000", "₹2,500"), so echoing their budget isn't flagged as invented. */
function userNumbers(turns: Turn[]): Set<number> {
  const nums = new Set<number>();
  for (const t of turns) {
    if (t.role !== "user") continue;
    for (const m of Array.from(t.content.matchAll(/(\d[\d,.]*)\s*(k\b)?/gi))) {
      const n = toPrice(m[1]);
      if (n !== null) nums.add(m[2] ? n * 1000 : n);
    }
  }
  return nums;
}

/** ₹ amounts in a reply that never appeared earlier in the chat or in anything the user typed. */
function inventedPrices(text: string, turns: Turn[]): number[] {
  const known = userNumbers(turns);
  for (const t of turns) for (const p of pricesIn(`${t.content} ${t.note ?? ""}`)) known.add(p);
  return pricesIn(text).filter((p) => !known.has(p));
}

export function madeUp(text: string, turns: Turn[]): boolean {
  if (text.includes("[Deal results")) return true;
  // A question without a table (e.g. suggesting budget ranges) isn't a fake listing.
  if (tail(text).includes("?") && !text.includes("|")) return false;
  return inventedPrices(text, turns).length > 0;
}

/**
 * Questions the bot asked since the last search, via ask_user or in plain text (the model does both).
 * A question answering a bare greeting ("hi" -> "what are you shopping for?") doesn't count.
 */
export function questionsAsked(turns: Turn[]): number {
  let count = 0;
  let lastUser = "";
  for (const t of turns) {
    if (t.role === "user") {
      lastUser = t.content;
    } else if (t.kind === "deals") {
      count = 0;
    } else if ((t.kind === "question" || tail(t.content).includes("?")) && !GREETING.test(lastUser)) {
      count += 1;
    }
  }
  return count;
}

export function parseJson(text: string): { listings?: unknown[]; summary?: unknown } | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[0]);
  } catch {
    return null;
  }
}

/**
 * The model's picks become rows; only real result ids. Price: the product page's own listed price when it
 * could be read (exact and current), otherwise a price that appears in that result's search text.
 */
export function pickRows(
  picked: ReturnType<typeof parseJson>,
  artifact: SearchArtifact,
  pages: Map<number, PageInfo> = new Map(),
): Row[] {
  const hits = new Map(artifact.hits.map((h) => [h.id, h]));
  let rows: Row[] = [];
  if (picked) {
    for (const item of (picked.listings ?? []) as Record<string, unknown>[]) {
      const hit = hits.get(toPrice(item?.id) ?? -1);
      if (!hit) continue;
      let price = toPrice(item.price);
      if (price && !pricesIn(`${hit.title} ${hit.snippet}`).includes(price)) price = null;
      const page = pages.get(hit.id);
      rows.push({
        ...hit,
        product: String(item.product || hit.title),
        price: page?.price ?? hit.price ?? price,
        image: page?.image ?? cleanImage(hit.image),
      });
    }
  } else {
    // Model output unusable: fall back to the first price in each result's own text.
    for (const hit of artifact.hits) {
      const found = `${hit.title} ${hit.snippet}`.match(PRICE_ONE);
      const page = pages.get(hit.id);
      rows.push({
        ...hit,
        product: hit.title,
        price: page?.price ?? hit.price ?? (found ? toPrice(found[1]) : null),
        image: page?.image ?? cleanImage(hit.image),
      });
    }
  }

  // Amazon Associates policy: Amazon prices and images may only be shown when they come from Amazon's
  // Product Advertising API. Until the account has API access, Amazon rows are link-only.
  rows = rows.map((r) => (r.store === "amazon" ? { ...r, price: null, image: undefined } : r));

  if (artifact.maxPrice) rows = rows.filter((r) => r.price === null || r.price <= artifact.maxPrice!);

  // One cheapest row per store when comparing many stores; a few options when only one or two were searched.
  const perStore = artifact.stores.length === 1 ? 5 : Math.max(1, Math.floor(6 / artifact.stores.length));
  rows.sort((a, b) => (a.price === null ? 1 : 0) - (b.price === null ? 1 : 0) || (a.price ?? 0) - (b.price ?? 0));
  const kept: Row[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    const key = `${r.store}|${r.product.toLowerCase()}`;
    if (seen.has(key) || kept.filter((k) => k.store === r.store).length >= perStore) continue;
    seen.add(key);
    kept.push(r);
  }
  return kept;
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const cell = (text: string) => text.replace(/\s+/g, " ").replace(/\|/g, "/").slice(0, 80);
const storeName = (s: string) => STORES[s]?.[1] ?? s;

export function renderAnswer(rows: Row[], artifact: SearchArtifact, summary: string): string {
  const names = artifact.stores.map(storeName);
  if (!rows.length) {
    // Never a dead end: when no store returned readable listings (often because it blocked the request), hand
    // over each store's own search for the product. No model-written advice here: it tended to suggest
    // "a more specific name" that was just the user's own words.
    const links = artifact.stores
      .map((s) => [storeName(s), storeSearchUrl(s, artifact.product)] as const)
      .filter(([, url]) => url)
      .map(([name, url]) => `[${name}](${url})`);
    return `😕 The stores didn't return listings for "${artifact.product}" just now. You can check them directly: ${links.join(" · ")}`;
  }

  const priced = rows.filter((r) => r.price !== null);
  const lines = ["| # | Store | Product | Price | Link |", "|---|---|---|---|---|"];
  rows.forEach((r, i) => {
    const best = priced.length > 0 && r === priced[0];
    const store = best ? `🏆 **${storeName(r.store)}**` : storeName(r.store);
    const price = r.price === null ? (r.store === "amazon" ? "See on Amazon" : "Not shown") : best ? `**${rupees(r.price)}**` : rupees(r.price);
    const link = affiliateUrl(r.store, r.url).replace(/ /g, "%20").replace(/\)/g, "%29");
    lines.push(`| ${r.price === null ? "–" : i + 1} | ${store} | ${cell(r.product)} | ${price} | [View](${link}) |`);
  });
  for (const s of artifact.stores) {
    if (rows.some((r) => r.store === s)) continue;
    const status = artifact.timedOut.includes(s) ? "⏳ Search timed out" : "❌ No listing found";
    lines.push(`| – | ${storeName(s)} | ${status} | – | – |`);
  }

  let verdict: string;
  if (!priced.length) {
    verdict = "🔎 No prices could be read for these listings. Open the links to compare.";
  } else {
    const best = priced[0];
    const rival = priced.find((r) => r.store !== best.store);
    if (artifact.stores.length === 1) verdict = `🏆 **Cheapest on ${storeName(best.store)}: ${rupees(best.price!)}**.`;
    else {
      verdict = `🏆 **Best deal: ${storeName(best.store)} at ${rupees(best.price!)}**`;
      if (!rival) verdict += ". It's the only store whose listing showed a price.";
      else if (rival.price === best.price) verdict += `, the same price as ${storeName(rival.store)}.`;
      else verdict += ` 💰 ${rupees(rival.price! - best.price!)} less than ${storeName(rival.store)} (${rupees(rival.price!)}).`;
    }
  }
  return `${productCard(rows, priced[0])}${lines.join("\n")}\n\n${verdict}${summary ? `\n\n💡 ${summary}` : ""}`;
}

/** One product image above the table: the best deal's, else the first listing that has one. */
function productCard(rows: Row[], best?: Row): string {
  const pick = best?.image ? best : rows.find((r) => r.image);
  if (!pick?.image) return "";
  const caption = [
    `${pick === best ? "🏆 " : ""}${cell(pick.product).replace(/[[\]]/g, "")}`,
    storeName(pick.store),
    pick.price === null ? "" : rupees(pick.price),
  ]
    .filter(Boolean)
    .join(" · ");
  const src = pick.image.replace(/ /g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29");
  return `![${caption}](${src})\n\n`;
}

export function historyNote(rows: Row[], artifact: SearchArtifact): string {
  const parts = rows.map((r) => `${storeName(r.store)}: ${r.product} at ${r.price === null ? "price not shown" : rupees(r.price)}`);
  for (const s of artifact.stores) if (!rows.some((r) => r.store === s)) parts.push(`${storeName(s)}: no listing found`);
  return `[Deal results shown to the user for "${artifact.product}": ${parts.join("; ")}]`;
}
