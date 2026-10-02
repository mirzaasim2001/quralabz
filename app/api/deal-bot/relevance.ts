// Keeps listings for the product asked about: not accessories ("case for iPhone 16"), other variants
// ("iPhone 16 Plus" for "iPhone 16"), other brands, or items that merely mention it ("bike with iphone holder").
// Ported from WB/search.py, where it is covered by test titles (README history 15).

const GENERIC = new Set(
  ("buy best good cheap deal deals offer offers online price prices shop shopping find show search any some range " +
    "budget under below around upto within for with and or the of to in on at from me please want need looking get " +
    "available option options new latest sale pair pack set college work office student students study school daily " +
    "use home everyday").split(" "),
);
const MEN = new Set(["men", "man", "male", "boy", "gent", "gents", "gentlemen"]);
const WOMEN = new Set(["women", "woman", "female", "girl", "lady", "ladies", "ladie"]); // "ladie": plural-trimmed "ladies"
const VARIANTS = new Set(["pro", "max", "plus", "ultra", "mini", "lite", "fe", "neo", "refurbished", "renewed"]);
const ACCESSORIES = new Set(
  ("case cover covers protector guard tempered glass skin strap charger cable adapter stand holder pouch sticker lens " +
    "mount replacement tips bag backpack sleeve tote briefcase handbag wallet tripod selfie stick table desk").split(" "),
);
// Specs rather than model numbers: "8gb", "i5", "r5" (Ryzen 5), "13th".
const SPEC = /^(\d+(gb|tb|mah|hz|mm|cm|inch|in|w|kg|ml|l|th|st|nd|rd|k)|[ir][3579])$/;
const UNIT = /(\d+)\s*(gb|tb|mah|hz|mm|cm|inch|in|w|kg|ml|l)\b/g;

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, " ").trim();

export function tokens(text: string): string[] {
  const t = decode(text)
    .toLowerCase()
    .replace(/’/g, "'")
    .replace(/'s/g, "")
    .replace(UNIT, "$1$2")
    .replace(/\bryzen\s*([3579])\b/g, "ryzen r$1");
  return (t.match(/[a-z0-9]+/g) ?? []).map((w) =>
    w.length > 3 && w.endsWith("s") && !/(ss|us|is|ns)$/.test(w) ? w.slice(0, -1) : w,
  );
}

export function queryWords(query: string): string[] {
  return tokens(query).filter((t) => !GENERIC.has(t) && !MEN.has(t) && !WOMEN.has(t) && t.length > 1);
}

const hasModelNumber = (words: string[]) => words.some((t) => /\d/.test(t) && !SPEC.test(t));

/** A long list of features ("laptop Ryzen 5 i5 8GB RAM") rather than one named model: gets a looser second pass. */
export function isSpecList(query: string): boolean {
  return queryWords(query).length >= 4 && !hasModelNumber(tokens(query));
}

/** 0 if the listing isn't the product asked about, else a score (higher = closer match). */
export function relevance(query: string, title: string, strict = true): number {
  const q = tokens(query);
  const qset = new Set(q);
  const all = tokens(title);
  const have = new Set(all);
  const words = queryWords(query);
  if (!words.length) return 0;

  // Short queries need their key words: both of a 2-word query; the first (brand/material: "Nike", "leather")
  // and last (product type) of a 3-word one, so a model-added word like "winter" in "leather winter jacket"
  // can't knock out real leather jackets. All need model numbers, sizes and every part of a model code.
  const codeParts = new Set(
    (decode(query).toLowerCase().match(/[a-z0-9]+(?:-[a-z0-9]+)+/g) ?? []).filter((c) => /\d/.test(c)).flatMap(tokens),
  );
  const keyWords = words.length <= 2 ? words : words.length === 3 ? [words[0], words[2]] : [];
  let hard = [...keyWords, ...words.filter((t) => /\d/.test(t) || codeParts.has(t))];
  if (!strict) hard = words.slice(0, 1);
  if (hard.some((t) => !have.has(t))) return 0;

  // The product is named at the start of its title, or its type ends it ("... Thin and Light Laptop").
  if (![...all.slice(0, 10), ...all.slice(-1)].some((t) => words.includes(t))) return 0;
  // "iPhone 16 Pro" isn't "iPhone 16" (checked in the name part only: long titles say "Windows 11 Pro" later).
  if (hasModelNumber(words) && all.slice(0, 8).some((t) => VARIANTS.has(t) && !qset.has(t))) return 0;
  // Accessories say so in their name; a phone only mentions one as included ("with charging case").
  const name = all.slice(0, 15);
  const accessory =
    name.some((t, i) => ACCESSORIES.has(t) && !["with", "charging", "free"].includes(name[i - 1])) ||
    new RegExp(`\\b(?:compatible with|for (?:apple |samsung )?${words[0]})\\b`).test(decode(title).toLowerCase());
  if (accessory && !q.some((t) => ACCESSORIES.has(t))) return 0;

  const gender = q.filter((t) => MEN.has(t) || WOMEN.has(t));
  const titleMen = all.some((t) => MEN.has(t));
  const titleWomen = all.some((t) => WOMEN.has(t));
  if (gender.some((t) => MEN.has(t)) && titleWomen && !titleMen) return 0;
  if (gender.some((t) => WOMEN.has(t)) && titleMen && !titleWomen) return 0;

  const share = words.filter((t) => have.has(t)).length / words.length;
  if (share < (strict ? 0.6 : 0.4)) return 0;
  return share + (all.join(" ").includes(words.join(" ")) ? 0.3 : 0);
}

const BUDGET_IN_TEXT =
  /\b(?:under|below|within|upto|up to|around|less than|max|budget(?: of)?)\s*(?:rs\.?|₹|inr)?\s*(\d[\d,]*\s*k?)\b/i;

/** "laptop under 50000" -> ["laptop", "50000"]: a typed-in budget would otherwise be searched as a model number. */
export function splitBudget(product: string): [string, string | undefined] {
  const m = product.match(BUDGET_IN_TEXT);
  return m ? [product.replace(BUDGET_IN_TEXT, " ").replace(/\s+/g, " ").trim(), m[1]] : [product, undefined];
}

/** Same type of product as asked, for when nothing matches exactly: "men's leather jacket" -> other men's jackets.
 * The product type is the query's last word; listings must still pass the accessory, gender and position checks.
 * Not for named models: a different phone than "iPhone 16" isn't a similar deal, it's a wrong answer. */
function similar(query: string, title: string): number {
  const words = queryWords(query);
  if (words.length < 2 || hasModelNumber(tokens(query))) return 0;
  return relevance(words[words.length - 1] + " " + tokens(query).filter((t) => MEN.has(t) || WOMEN.has(t)).join(" "), title);
}

/** The relevant listings, most relevant first. If nothing matches exactly: a looser pass for spec lists, then
 * similar products of the same type. */
export function relevantHits<T extends { title: string; price?: number }>(
  hits: T[],
  query: string,
  limit: number,
): { hits: T[]; similar: boolean } {
  const rank = (score: (title: string) => number) =>
    hits
      .map((h) => ({ h, score: score(h.title) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || (a.h.price ?? Infinity) - (b.h.price ?? Infinity))
      .map((x) => x.h);
  let kept = rank((t) => relevance(query, t));
  if (!kept.length && isSpecList(query)) kept = rank((t) => relevance(query, t, false));
  if (kept.length) return { hits: kept.slice(0, limit), similar: false };
  return { hits: rank((t) => similar(query, t)).slice(0, limit), similar: true };
}
