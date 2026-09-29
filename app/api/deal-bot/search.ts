// Store search, all stores in parallel. Each store's own search comes first (stores.ts: real products with
// price and image); "<product> price site:<store>" on free search engines is the fallback.
// Ported from WB/search.py. The Python version used the ddgs library (browser-impersonating);
// from Node, DuckDuckGo's HTML endpoint and Bing work, Yahoo rejects plain fetch with a 500.

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
};
const ALWAYS_SEARCH = ["amazon", "flipkart"];
const MAX_STORES = 6;
const MAX_HITS_PER_STORE = 3;
const SEARCH_DEADLINE_MS = 4000;

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
};

export interface Hit extends StoreHit {
  id: number;
  store: string;
}
type RawHit = StoreHit;

export interface SearchArtifact {
  product: string;
  stores: string[];
  hits: Hit[];
  timedOut: string[];
  maxPrice: number | null;
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
        title: cleanText((block.match(/>([\s\S]*?)<\/a>/) || [])[1] || ""),
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
        title: cleanText(h2),
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

async function searchStore(product: string, store: string, signal: AbortSignal, diag: StoreDiag): Promise<RawHit[]> {
  const direct = await searchStoreDirect(store, product, signal);
  diag.directError = direct.error;
  if (direct.hits.length) return direct.hits;
  if (signal.aborted) return [];

  const [domain] = STORES[store];
  const query = `${product} price site:${domain}`;
  // DuckDuckGo answers in ~0.7s; Bing is the fallback when it's rate-limited or finds no product pages.
  for (const engine of [duckduckgo, bing]) {
    try {
      const hits = (await engine(query, signal)).filter((h) => h.url.includes(domain) && PRODUCT_URL[store].test(h.url));
      if (hits.length) {
        diag.source = "engine";
        return hits.slice(0, MAX_HITS_PER_STORE);
      }
    } catch {
      if (signal.aborted) break;
    }
  }
  return [];
}

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
  const stores = pickStores(args.stores);
  const maxPrice = parseBudget(maxPriceRaw);

  // Don't wait on stragglers: after the deadline, slow stores are reported as timed out.
  const ctrl = new AbortController();
  const results = new Map<string, RawHit[]>();
  const started = Date.now();
  const diagnostics: StoreDiag[] = stores.map((store) => ({ store, ms: SEARCH_DEADLINE_MS, source: "none", count: 0 }));
  const all = Promise.all(
    stores.map((s, i) =>
      searchStore(product, s, ctrl.signal, diagnostics[i]).then((hits) => {
        results.set(s, hits);
        const d = diagnostics[i];
        Object.assign(d, { ms: Date.now() - started, count: hits.length, source: hits.length && d.source === "none" ? "direct" : d.source });
      }),
    ),
  );
  await Promise.race([all, new Promise((r) => setTimeout(r, SEARCH_DEADLINE_MS))]);
  ctrl.abort();

  // Hits are numbered so the model can refer to them by id instead of copying URLs.
  const hits: Hit[] = [];
  const timedOut: string[] = [];
  const lines: string[] = maxPrice ? [`(User budget: up to ₹${maxPrice.toLocaleString("en-IN")})`] : [];
  for (const store of stores) {
    lines.push(`## ${STORES[store][1]}`);
    const found = results.get(store);
    if (!found) {
      timedOut.push(store);
      lines.push("Search timed out.");
      continue;
    }
    if (!found.length) lines.push("No results found.");
    for (const h of found) {
      const hit = { id: hits.length + 1, store, ...h };
      hits.push(hit);
      lines.push(`[${hit.id}] ${hit.title}\n    ${hit.snippet}`);
    }
  }
  return { text: lines.join("\n"), artifact: { product, stores, hits, timedOut, maxPrice }, diagnostics };
}
