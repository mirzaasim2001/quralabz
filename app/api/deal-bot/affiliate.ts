// Affiliate tagging for store links shown to users. Tracking IDs are public (they appear in every link),
// so they live in code rather than secrets.
// Amazon Associates India: the tracking ID from associates.amazon.in (looks like "yourname-21").
const AMAZON_TAG = "dealmaker07-21";

const SEARCH_URL: Record<string, (q: string) => string> = {
  amazon: (q) => `https://www.amazon.in/s?k=${q}${AMAZON_TAG ? `&tag=${AMAZON_TAG}` : ""}`,
  flipkart: (q) => `https://www.flipkart.com/search?q=${q}`,
  snapdeal: (q) => `https://www.snapdeal.com/search?keyword=${q}`,
  myntra: (q) => `https://www.myntra.com/search?rawQuery=${q}`,
  ajio: (q) => `https://www.ajio.com/search/?text=${q}`,
  croma: (q) => `https://www.croma.com/searchB?q=${q}`,
  reliancedigital: (q) => `https://www.reliancedigital.in/products?q=${q}`,
  tatacliq: (q) => `https://www.tatacliq.com/search/?searchCategory=all&text=${q}`,
  nykaa: (q) => `https://www.nykaa.com/search/result/?q=${q}`,
  decathlon: (q) => `https://www.decathlon.in/search?query=${q}`,
};

/** A store's own search page for a product (tagged for Amazon), for when no listings could be read. */
export function storeSearchUrl(store: string, product: string): string | undefined {
  return SEARCH_URL[store]?.(encodeURIComponent(product));
}

/** The link to show for a listing: Amazon product links become clean /dp/ links carrying our tag. */
export function affiliateUrl(store: string, url: string): string {
  if (store === "amazon" && AMAZON_TAG) {
    const asin = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/)?.[1];
    if (asin) return `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  return url;
}
