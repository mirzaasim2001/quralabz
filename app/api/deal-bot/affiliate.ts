// Affiliate tagging for store links shown to users. Tracking IDs are public (they appear in every link),
// so they live in code rather than secrets.
// Amazon Associates India: the tracking ID from associates.amazon.in (looks like "yourname-21").
const AMAZON_TAG = "dealmaker07-21";

/** The link to show for a listing: Amazon product links become clean /dp/ links carrying our tag. */
export function affiliateUrl(store: string, url: string): string {
  if (store === "amazon" && AMAZON_TAG) {
    const asin = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/)?.[1];
    if (asin) return `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  return url;
}
