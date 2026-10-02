// Store search, all stores in parallel. Each store's own search comes first (stores.ts: real products with
// price and image); "<product> price site:<store>" on free search engines is the fallback.
// Ported from WB/search.py. The Python version used the ddgs library (browser-impersonating);
// from Node, DuckDuckGo's HTML endpoint and Bing work, Yahoo rejects plain fetch with a 500.

import { relevantHits, splitBudget } from "./relevance";
import { searchStoreDirect, UA, type StoreHit } from "./stores";

export { UA };

export const STORES: Record<string, [domain: string, name: string]> = {
  amazon: ["amazon.in", "Amazon"],
  flipkart: ["flipkart.com", "Flipkart"],
  myntra: ["myntra.com", "Myntra"],
  ajio: ["ajio.com", "AJIO"],
  croma: ["croma.com", "Croma"],
  reliancedigital: ["reliancedigital.in", "Reliance Digital"],
  tatacliq: ["tatacliq.com", "Tata CLiQ"],
  nykaa: ["nykaa.com", "Nykaa"],
  snapdeal: ["snapdeal.com", "Snapdeal"],
  decathlon: ["decathlon.in", "Decathlon"],
};
// Snapdeal too: it carries almost everything and still answers server requests when Amazon/Flipkart block them.
const ALWAYS_SEARCH = ["amazon", "flipkart", "snapdeal"];
const MAX_STORES = 7;
const MAX_HITS_PER_STORE = 3;
const SEARCH_DEADLINE_MS = 3000;

// URL shapes of single-product pages. Search/category pages ("Jackets for Men") are dropped: they have
// no single product or price and just send the user off to browse.
const PRODUCT_URL: Record<string, RegExp> = {
  amazon: /\/(dp|gp\/product)\//,
  flipkart: /\/p\/itm/,
  myntra: /\/\d{5,}\/buy/,
  ajio: /\/p\/\d/,
  croma: /\/p\/\d/,
  reliancedigital: /\/(p|product)\//,
  tatacliq: /\/p-mp\d/,
  nykaa: /\/p\/\d/,
  snapdeal: /\/product\//,
  decathlon: /\/p\/\d/,
};

export interface Hit extends StoreHit {
  id: number;
  store: string;
}
type RawHit = StoreHit;

export interface SearchArtifact {
  product: string;
  /** Stores named in the reply: the ones the model asked for, plus any other store that had the product. */
  stores: string[];
  /** Named stores worth a link to their own search: they couldn't be read (blocked, too slow) or only had
   * similar items. Stores that answered without the product (Croma for kurtas) aren't linked. */
  unread: string[];
  hits: Hit[];
  timedOut: string[];
  maxPrice: number | null;
}

/** Search-engine titles carry store boilerplate: "Buy Saint G Men Jacket Online at Best Price | Tata CLiQ". */
function engineTitle(title: string): string {
  return title.replace(/^buy\s+/i, "").replace(/\s+online\b.*$/i, "").replace(/\s+[|]\s+.*$/, "").trim() || title;
}

function cleanText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;|&ensp;|&#0?160;/g, " ")
    .replace(/&#8377;|&#x20b9;/gi, "₹")
    .replace(/\s+/g, " ")
    .trim();
}

async function duckduckgo(query: string, signal: AbortSignal): Promise<RawHit[]> {
  const res = await fetch("https://html.duckduckgo.com/html/", {
    method: "POST",
    headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ q: query, b: "", l: "in-en" }),
    signal,
  });
  const html = await res.text();
  return html
    .split('class="result__a"')
    .slice(1)
    .map((block) => {
      let url = (block.match(/href="([^"]+)"/) || [])[1] || "";
      const redirect = url.match(/[?&]uddg=([^&]+)/);
      if (redirect) url = decodeURIComponent(redirect[1]);
      return {
        url: url.replace(/&amp;/g, "&"),
        title: engineTitle(cleanText((block.match(/>([\s\S]*?)<\/a>/) || [])[1] || "")),
        snippet: cleanText((block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/) || [])[1] || ""),
      };
    })
    .filter((h) => h.url.startsWith("http") && !h.url.startsWith("https://duckduckgo.com/y.js"));
}

async function bing(query: string, signal: AbortSignal): Promise<RawHit[]> {
  const res = await fetch("https://www.bing.com/search?" + new URLSearchParams({ q: query, cc: "IN", setlang: "en" }), {
    headers: { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" },
    signal,
  });
  const html = await res.text();
  return html
    .split('<li class="b_algo"')
    .slice(1)
    .map((block) => {
      const h2 = (block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || "";
      const href = ((h2.match(/href="([^"]+)"/) || [])[1] || "").replace(/&amp;/g, "&");
      // Bing wraps links as bing.com/ck/a?...&u=a1<base64url of the real URL>
      const encoded = href.match(/[?&]u=a1([^&]+)/);
      const url = encoded ? Buffer.from(encoded[1], "base64url").toString("utf8") : href;
      const caption = block.split(/class="b_caption[^"]*"/)[1] || "";
      return {
        url,
        title: engineTitle(cleanText(h2)),
        snippet: cleanText((caption.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1] || ""),
      };
    })
    .filter((h) => h.url.startsWith("http"));
}

/** Per-store outcome, reported by the API only when a request asks for diagnostics. */
export interface StoreDiag {
  store: string;
  ms: number;
  source: "direct" | "engine" | "none";
  count: number;
  directError?: string;
}

interface StoreResult {
  hits: RawHit[];
  similar: boolean; // no exact match: same type of product instead
  answered: boolean; // the store returned a results page (so an empty result means it doesn't sell this)
}

async function searchStore(
  product: string,
  store: string,
  maxPrice: number | null,
  signal: AbortSignal,
  diag: StoreDiag,
): Promise<StoreResult> {
  // Over-budget listings go before picking each store's best few, or they can crowd out in-budget ones.
  const affordable = <T extends { price?: number }>(hits: T[]) => (maxPrice ? hits.filter((h) => !h.price || h.price <= maxPrice) : hits);
  const direct = await searchStoreDirect(store, product, signal);
  diag.directError = direct.error;
  const relevant = relevantHits(affordable(direct.hits), product, MAX_HITS_PER_STORE);
  if (relevant.hits.length && !relevant.similar) return { ...relevant, answered: true };
  if (direct.hits.length) {
    diag.directError = `no exact match in ${direct.hits.length}`;
    return { ...relevant, answered: true }; // the store's own results beat a search engine's guess
  }
  if (signal.aborted) return { hits: [], similar: false, answered: false };

  const [domain] = STORES[store];
  const query = `${product} price site:${domain}`;
  // DuckDuckGo answers in ~0.7s; Bing is the fallback when it's rate-limited or finds no product pages.
  for (const engine of [duckduckgo, bing]) {
    try {
      const hits = (await engine(query, signal)).filter((h) => h.url.includes(domain) && PRODUCT_URL[store].test(h.url));
      const found = relevantHits(affordable(hits), product, MAX_HITS_PER_STORE);
      if (found.hits.length) {
        diag.source = "engine";
        return { ...found, answered: false };
      }
    } catch {
      if (signal.aborted) break;
    }
  }
  return { hits: [], similar: false, answered: false };
}

// Stores whose own search we can read. All of them are searched every time (in parallel, so it costs no time):
// the model sometimes leaves out a store that has the product. Tata CLiQ and Nykaa need a browser, so they're
// only searched (through search engines) when the model names them.
const READABLE = ["amazon", "flipkart", "snapdeal", "myntra", "ajio", "croma", "reliancedigital", "decathlon"];

export function pickStores(stores: unknown): string[] {
  const list = typeof stores === "string" ? stores.split(/[,/&]| and /) : Array.isArray(stores) ? stores : [];
  const picked = Array.from(new Set(list.map((s) => String(s).trim().toLowerCase().replace(/\s+/g, "")))).filter(
    (s) => s in STORES,
  );
  if (picked.length === 1) return picked;
  return Array.from(new Set([...ALWAYS_SEARCH, ...picked])).slice(0, MAX_STORES);
}

/** Accepts 3000, "3000", "₹3,000", "3k", "under 3k". */
export function parseBudget(value: unknown): number | null {
  const m = String(value ?? "").match(/(\d[\d,.]*)\s*(k)?/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ""));
  return Math.round(m[2] ? n * 1000 : n) || null;
}

export async function searchDeals(
  args: Record<string, unknown>,
): Promise<{ text: string; artifact: SearchArtifact; diagnostics: StoreDiag[] }> {
  let product = String(args.product ?? "").trim();
  let maxPriceRaw = args.max_price;
  if (/[<>]/.test(product)) {
    // Nemotron sometimes leaks its tool-call XML into the argument: "men's jacket>\n<parameter=max_price>\n3000"
    const leaked = product.match(/max_price>\s*([\d.,]+\s*k?)/i);
    product = product.split(/[<>]/)[0].trim();
    maxPriceRaw = maxPriceRaw ?? leaked?.[1];
  }
  const [withoutBudget, typedBudget] = splitBudget(product);
  product = withoutBudget;
  const named = pickStores(args.stores);
  const stores = named.length === 1 ? named : Array.from(new Set([...named, ...READABLE]));
  const maxPrice = parseBudget(maxPriceRaw ?? typedBudget);

  // Don't wait on stragglers: after the deadline, slow stores are reported as timed out.
  const ctrl = new AbortController();
  const results = new Map<string, StoreResult>();
  const started = Date.now();
  const diagnostics: StoreDiag[] = stores.map((store) => ({ store, ms: SEARCH_DEADLINE_MS, source: "none", count: 0 }));
  const all = Promise.all(
    stores.map((s, i) =>
      searchStore(product, s, maxPrice, ctrl.signal, diagnostics[i]).then((result) => {
        results.set(s, result);
        const d = diagnostics[i];
        const count = result.hits.length;
        Object.assign(d, { ms: Date.now() - started, count, source: count && d.source === "none" ? "direct" : d.source });
      }),
    ),
  );
  await Promise.race([all, new Promise((r) => setTimeout(r, SEARCH_DEADLINE_MS))]);
  ctrl.abort();

  // Similar products only fill in when no store has the exact one: a down jacket shouldn't sit next to real
  // leather jackets just because one store had no leather ones.
  const anyExact = Array.from(results.values()).some((r) => r.hits.length && !r.similar);
  const usable = (store: string) => {
    const r = results.get(store);
    return r && r.hits.length && (!anyExact || !r.similar) ? r.hits : [];
  };

  const hits: Hit[] = [];
  const timedOut = stores.filter((s) => !results.has(s));
  const shown = [...named, ...stores.filter((s) => !named.includes(s) && usable(s).length)];
  const unread = named.filter((s) => {
    const r = results.get(s);
    return !usable(s).length && (!r || !r.answered || r.similar);
  });
  const lines: string[] = maxPrice ? [`(User budget: up to ₹${maxPrice.toLocaleString("en-IN")})`] : [];
  for (const store of shown) {
    lines.push(`## ${STORES[store][1]}`);
    const found = usable(store);
    if (!found.length) lines.push("No results.");
    for (const h of found) {
      const hit = { id: hits.length + 1, store, ...h };
      hits.push(hit);
      lines.push(`[${hit.id}] ${hit.title}\n    ${hit.snippet}`);
    }
  }
  return { text: lines.join("\n"), artifact: { product, stores: shown, unread, hits, timedOut, maxPrice }, diagnostics };
}
