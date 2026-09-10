// Server-side only. Holds NVIDIA_API_KEY, never sent to the browser.
// Retrieval-grounded Q&A over a demo subset of Indian High Court bail
// judgments (864 cases, Allahabad + Bombay HC, 2024). Mirrors the Python
// prototype in pipeline/ask.py — same grounding rules, same citation
// verification, ported to TS for a static-site-friendly serverless route.

import { NextRequest, NextResponse } from "next/server";
import corpus from "@/data/bail_demo_corpus.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Paragraph {
  para_no: number | null;
  role: string;
  text: string;
}
interface Judgment {
  cnr: string;
  title: string;
  court: string;
  case_no: string;
  decision_date: string | null;
  judge: string;
  disposal: string;
  paragraphs: Paragraph[];
}

const CORPUS = corpus as Judgment[];
const CNR_SET = new Set(CORPUS.map((j) => j.cnr));
const CNR_RE = /\b([A-Z]{2,6}\d{9,18})\b/g;

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "of", "for", "in", "on", "to",
  "and", "or", "what", "how", "does", "do", "did", "court", "case", "with",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .match(/[a-z]+/g)
    ?.filter((w) => w.length > 2 && !STOPWORDS.has(w)) ?? [];
}

interface Hit extends Paragraph {
  cnr: string;
  title: string;
  court: string;
  decision_date: string | null;
  judge: string;
  score: number;
}

// Plain TF scoring over the flat corpus - no BM25/DuckDB dependency needed
// for a ~5k paragraph demo set. Swap for the DuckDB FTS backend if this ever
// points at the full 20k-judgment corpus instead of the demo subset.
function search(query: string, k = 8): Hit[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  const hits: Hit[] = [];
  for (const j of CORPUS) {
    for (const p of j.paragraphs) {
      const pTokens = tokenize(p.text);
      const pSet = new Set(pTokens);
      let score = 0;
      for (const qt of qTokens) if (pSet.has(qt)) score += 1;
      if (score === 0) continue;
      // light length-normalization so short, dense matches don't lose to long paragraphs
      score = score / Math.sqrt(pTokens.length);
      hits.push({ ...p, cnr: j.cnr, title: j.title, court: j.court, decision_date: j.decision_date, judge: j.judge, score });
    }
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, k);
}

const SYSTEM_PROMPT = `You are a legal research assistant for Indian bail law, working only
from the case excerpts provided in the user message - you have no other
knowledge of these cases and must not use general legal knowledge to fill gaps.

Rules:
- Every factual claim about what a court held or reasoned MUST be immediately
  followed by the CNR of the source case in square brackets, e.g. [HCBM010134472024].
- Only cite a CNR that appears in the provided excerpts. Never invent, guess,
  or recall a citation from outside the given context.
- If the excerpts do not contain enough information to answer the question,
  say so plainly instead of guessing.
- Be concise. This is for a working lawyer, not a general audience.`;

function buildContext(hits: Hit[]): string {
  return hits
    .map(
      (h) =>
        `[${h.cnr}] ${h.title} (paragraph role: ${h.role})\n${h.text}`
    )
    .join("\n\n---\n\n");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "server not configured" }, { status: 500 });
  }

  const { question, thinking } = await req.json();
  if (!question || typeof question !== "string" || question.length > 1000) {
    return NextResponse.json({ error: "invalid question" }, { status: 400 });
  }

  const hits = search(question, 8);
  if (hits.length === 0) {
    return NextResponse.json({
      answer: "No relevant judgments found in the demo corpus for this query.",
      citations: [],
      reasoning: null,
    });
  }

  const context = buildContext(hits);

  const upstream = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3.5-lightning-30b-a3b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Case excerpts:\n\n${context}\n\nQuestion: ${question}` },
      ],
      temperature: 0.2,
      top_p: 0.95,
      max_tokens: 4096,
      chat_template_kwargs: { enable_thinking: !!thinking },
      reasoning_budget: thinking ? 2048 : 0,
      stream: false,
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return NextResponse.json({ error: `upstream error: ${upstream.status} ${errText}` }, { status: 502 });
  }

  const data = await upstream.json();
  const choice = data.choices?.[0]?.message;
  const answer: string = choice?.content ?? "";
  const reasoning: string | null = choice?.reasoning_content ?? null;

  // citation verification: every CNR the model cited must exist in the
  // corpus we actually gave it. This is the anti-hallucination gate - a
  // fabricated citation is worse than none, so it gets flagged, not trusted.
  const citedCnrs = Array.from(new Set(answer.match(CNR_RE) ?? []));
  const citations = citedCnrs.map((cnr) => {
    const j = CORPUS.find((c) => c.cnr === cnr);
    return {
      cnr,
      verified: CNR_SET.has(cnr),
      title: j?.title ?? null,
      court: j?.court ?? null,
      decision_date: j?.decision_date ?? null,
      disposal: j?.disposal ?? null,
    };
  });

  return NextResponse.json({ answer, reasoning, citations });
}
