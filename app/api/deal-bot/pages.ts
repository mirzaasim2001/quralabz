// Reads each search result's own product page for one image and the current price.
// Runs while the picker model is choosing listings, capped at PAGE_TIMEOUT_MS, so it adds ~0-1s at most.
// What stores expose to a server (tested 2026-09-29):
//   Flipkart, Myntra, Tata CLiQ: schema.org Product block (exact price + image)
//   Reliance Digital: og:image only · Amazon: main photo in page data, price hidden · AJIO, Croma: blocked (403)

import { UA, type Hit } from "./search";

const PAGE_TIMEOUT_MS = 2500;
const MAX_PAGES = 12;
// Images are shown straight from the stores' own CDNs; anything else is ignored.
const IMAGE_HOST = /(^|\.)(media-amazon\.com|ssl-images-amazon\.com|flixcart\.com|myntassets\.com|tatacliq\.com|jiostore\.online|ajio\.com|croma\.com|tatacroma\.com|nykaa\.com|nykaafashion\.com)$/i;

export interface PageInfo {
  image?: string;
  price?: number;
}

function toNumber(value: unknown): number | undefined {
  const n = parseFloat(String(value ?? "").replace(/[,₹\s]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
}

/** The schema.org Product block stores publish for search engines: exact selling price and main image. */
function productBlock(html: string): PageInfo {
  for (const m of Array.from(html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi))) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const items = [data].flat().flatMap((d) => d?.["@graph"] ?? [d]);
    for (const item of items) {
      if (!/Product/.test([item?.["@type"]].flat().join(" "))) continue;
      const offer = [item.offers].flat()[0] ?? {};
      const image = [item.image].flat().map((i) => (typeof i === "string" ? i : i?.url)).find(Boolean);
      return { price: toNumber(offer.price ?? offer.lowPrice), image };
    }
  }
  return {};
}

function metaImage(html: string): string | undefined {
  return (html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["']/i))?.[1];
}

function amazonImage(html: string): string | undefined {
  return (html.match(/"hiRes"\s*:\s*"(https:[^"]+)"/) || html.match(/data-old-hires="(https:[^"]+)"/) || html.match(/"large"\s*:\s*"(https:[^"]+)"/))?.[1];
}

/** HTTPS store-CDN images only, resized down to thumbnail size where the CDN supports it (faster on phones). */
export function cleanImage(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url.trim().replace(/&amp;/g, "&").replace(/^\/\//, "https://"));
    if (u.protocol !== "https:" || !IMAGE_HOST.test(u.hostname)) return undefined;
    return u
      .toString()
      .replace(/\._[A-Z]{2}\d+_\./, "._SL400_.") // Amazon ._SL1500_. -> 400px
      .replace(/\/image\/\d+\/\d+\//, "/image/416/416/") // Flipkart
      .replace(/h_\d+,q_\d+,w_\d+/, "h_400,q_80,w_300"); // Myntra
  } catch {
    return undefined;
  }
}

async function readPage(hit: Hit): Promise<PageInfo> {
  const res = await fetch(hit.url, {
    headers: { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" },
    signal: AbortSignal.timeout(PAGE_TIMEOUT_MS),
  });
  if (!res.ok) return {};
  const html = await res.text();
  const block = productBlock(html);
  return {
    price: block.price,
    image: cleanImage(block.image) ?? (hit.store === "amazon" ? cleanImage(amazonImage(html)) : undefined) ?? cleanImage(metaImage(html)),
  };
}

/**
 * Page details by hit id, only for hits still missing a price or image (store-search hits usually have both).
 * Pages that fail or miss the deadline are simply absent.
 */
export async function readProductPages(hits: Hit[]): Promise<Map<number, PageInfo>> {
  const pages = new Map<number, PageInfo>();
  const needed = hits.filter((h) => !h.price || !h.image);
  await Promise.all(
    needed.slice(0, MAX_PAGES).map((hit) =>
      readPage(hit)
        .then((info) => pages.set(hit.id, info))
        .catch(() => undefined),
    ),
  );
  return pages;
}
