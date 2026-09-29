// Direct store search: each store's own search results, with name, price, image and product link.
// This is the primary source; search engines (DuckDuckGo/Bing, see search.ts) are only the fallback,
// because they started challenging server requests and returning category pages instead of products.
// Tested 2026-09-29: Amazon, Flipkart, Myntra, AJIO, Croma and Reliance Digital return server-rendered results
// in ~0.4-2.4s. Tata CLiQ and Nykaa render results only in a browser, so they stay on the search-engine path.
// Store markup changes over time: each reader fails soft (returns []), and search.ts falls back.

export const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

export interface StoreHit {
  title: string;
  url: string;
  snippet: string;
  price?: number;
  image?: string;
}

const HEADERS = { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" };
const MAX_PER_STORE = 5;

const enc = encodeURIComponent;
const num = (v: unknown) => {
  const n = parseFloat(String(v ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
};
const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
const https = (u?: string) => (u ? u.replace(/^http:\/\//, "https://").replace(/^\/\//, "https://") : undefined);
const priceText = (p?: number) => (p ? `Price: ₹${p.toLocaleString("en-IN")}` : "");

async function get(url: string, signal: AbortSignal, accept = "text/html"): Promise<string> {
  const res = await fetch(url, { headers: { ...HEADERS, Accept: accept }, signal });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.text();
}

async function amazon(q: string, signal: AbortSignal): Promise<StoreHit[]> {
  const html = await get(`https://www.amazon.in/s?k=${enc(q)}`, signal);
  const hits: StoreHit[] = [];
  for (const block of html.split('data-component-type="s-search-result"').slice(1)) {
    const title = decode((block.match(/<h2[^>]*aria-label="([^"]+)"/) || block.match(/<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/) || [])[1] ?? "");
    const asin = (block.match(/\/dp\/([A-Z0-9]{10})/) || [])[1];
    if (!title || !asin || /^Sponsored/i.test(title) || block.includes("puis-sponsored-label")) continue;
    const price = num((block.match(/a-price-whole">([\d,]+)/) || [])[1]);
    const image = (block.match(/class="s-image"[^>]*src="([^"]+)"/) || block.match(/src="([^"]+)"[^>]*class="s-image"/) || [])[1];
    hits.push({ title, url: `https://www.amazon.in/dp/${asin}`, snippet: priceText(price), price, image });
  }
  return hits;
}

async function flipkart(q: string, signal: AbortSignal): Promise<StoreHit[]> {
  const html = await get(`https://www.flipkart.com/search?q=${enc(q)}`, signal);
  const hits: StoreHit[] = [];
  for (const block of html.split('<div data-id="').slice(1)) {
    const path = (block.match(/href="(\/[^"?]*\/p\/itm[a-z0-9]+)/i) || [])[1];
    const img = block.match(/<img[^>]*>/g)?.find((t) => t.includes("rukminim")) ?? "";
    const title = decode((img.match(/alt="([^"]+)"/) || [])[1] ?? "");
    if (!path || !title) continue;
    const price = num((block.match(/₹([\d,]+)/) || [])[1]);
    hits.push({ title, url: `https://www.flipkart.com${path}`, snippet: priceText(price), price, image: (img.match(/src="([^"]+)"/) || [])[1] });
  }
  return hits;
}

async function myntra(q: string, signal: AbortSignal): Promise<StoreHit[]> {
  const slug = q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const html = await get(`https://www.myntra.com/${slug}?rawQuery=${enc(q)}`, signal);
  const start = html.indexOf("window.__myx = ");
  if (start < 0) return [];
  const json = html.slice(start + 15, html.indexOf("</script>", start)).trim().replace(/;$/, "");
  const products = JSON.parse(json)?.searchData?.results?.products ?? [];
  return products.map((p: Record<string, unknown>) => {
    const price = num(p.price);
    return {
      title: String(p.productName ?? ""),
      url: `https://www.myntra.com/${p.landingPageUrl}`,
      snippet: priceText(price),
      price,
      image: https(p.searchImage as string),
    };
  });
}

async function ajio(q: string, signal: AbortSignal): Promise<StoreHit[]> {
  const url = `https://www.ajio.com/api/search?fields=SITE&currentPage=0&pageSize=20&format=json&query=${enc(q)}%3Arelevance&text=${enc(q)}`;
  const data = JSON.parse(await get(url, signal, "application/json"));
  return (data?.products ?? []).map((p: Record<string, any>) => {
    const price = num(p.price?.value);
    const brand = p.fnlColorVariantData?.brandName;
    return {
      title: `${brand ? `${brand} ` : ""}${p.name ?? ""}`,
      url: `https://www.ajio.com${p.url}`,
      snippet: priceText(price),
      price,
      image: https(p.images?.[0]?.url),
    };
  });
}

async function croma(q: string, signal: AbortSignal): Promise<StoreHit[]> {
  const url = `https://api.croma.com/searchservices/v1/search?currentPage=0&query=${enc(q)}%3Arelevance&fields=FULL&channel=WEB`;
  const data = JSON.parse(await get(url, signal, "application/json"));
  return (data?.products ?? []).map((p: Record<string, any>) => {
    const price = num(p.price?.value);
    return { title: String(p.name ?? ""), url: `https://www.croma.com${p.url}`, snippet: priceText(price), price, image: https(p.plpImage) };
  });
}

async function reliancedigital(q: string, signal: AbortSignal): Promise<StoreHit[]> {
  const html = await get(`https://www.reliancedigital.in/products?q=${enc(q)}`, signal);
  const hits: StoreHit[] = [];
  const card = /<a href="(\/product\/[^"?]+)[^"]*"[^>]*class="details-container"[\s\S]*?product-card-title[^>]*>([^<]+)<[\s\S]*?class="price"[^>]*>([^<]+)</g;
  for (const m of Array.from(html.matchAll(card))) {
    // The card's image sits just before its details block.
    const before = html.slice(Math.max(0, (m.index ?? 0) - 3000), m.index);
    const images = before.match(/src="(https:\/\/cdn\.jiostore\.online\/[^"]+\/products\/pictures\/[^"]+)"/g) ?? [];
    const image = images.length ? images[images.length - 1].slice(5, -1) : undefined;
    const price = num(m[3]);
    hits.push({ title: decode(m[2]), url: `https://www.reliancedigital.in${m[1]}`, snippet: priceText(price), price, image });
  }
  return hits;
}

const READERS: Record<string, (q: string, signal: AbortSignal) => Promise<StoreHit[]>> = {
  amazon,
  flipkart,
  myntra,
  ajio,
  croma,
  reliancedigital,
};

/**
 * The store's own top results; empty when the store has no reader, blocks us, or its markup changed.
 * `error` says why (HTTP status, parse failure) for the diagnostics in search.ts.
 */
export async function searchStoreDirect(store: string, q: string, signal: AbortSignal): Promise<{ hits: StoreHit[]; error?: string }> {
  const read = READERS[store];
  if (!read) return { hits: [], error: "no reader" };
  try {
    return { hits: (await read(q, signal)).filter((h) => h.title && h.url).slice(0, MAX_PER_STORE) };
  } catch (e) {
    return { hits: [], error: e instanceof Error ? e.message.slice(0, 60) : "failed" };
  }
}
