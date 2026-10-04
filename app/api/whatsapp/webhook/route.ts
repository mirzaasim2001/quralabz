// Server-side only. WhatsApp Cloud API webhook for the Deal Finder bot.
//   GET  : Meta's one-time check when you press "Verify and save" (echoes hub.challenge if the verify token matches).
//   POST : an incoming WhatsApp message. The same Deal Finder brain as the website (../deal-bot/engine.ts) answers
//          it, formatted for WhatsApp, and the reply goes back through the Graph API.
// Environment variables (Vercel > Settings > Environment Variables), none of them ever sent to a browser:
//   WHATSAPP_VERIFY_TOKEN     any secret string you choose; the same string goes in Meta's "Verify token" field
//   WHATSAPP_APP_SECRET       Meta app > App settings > Basic > App secret; used to check that POSTs really come from Meta
//   WHATSAPP_ACCESS_TOKEN     Meta app > WhatsApp > API Setup > access token (use a permanent system-user token)
//   WHATSAPP_PHONE_NUMBER_ID  the "Phone number ID" shown on the same page
//   NVIDIA_API_KEY            already set for the website chat

import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";
import { cleanHistory, respond } from "../../deal-bot/engine";
import type { Turn } from "../../deal-bot/deals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const preferredRegion = "sin1";

const GRAPH = process.env.WHATSAPP_API_BASE || "https://graph.facebook.com/v21.0";
const MAX_WHATSAPP_CHARS = 3800; // WhatsApp allows 4096 per message
const HISTORY_TTL_MS = 60 * 60 * 1000;

// Serverless has no database here, so each person's recent chat is kept in this server instance's memory. Another
// instance, or a restart, simply starts that person's chat fresh (the bot asks its questions again). Good enough
// for testing; a database (e.g. Vercel KV) is the upgrade if people chat in long sessions.
const chats = new Map<string, { turns: Turn[]; at: number }>();
const seen = new Map<string, number>(); // message ids already handled: Meta re-sends when a reply is slow

function tidyMemory() {
  const now = Date.now();
  chats.forEach((c, k) => now - c.at > HISTORY_TTL_MS && chats.delete(k));
  seen.forEach((t, k) => now - t > 10 * 60 * 1000 && seen.delete(k));
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (expected && p.get("hub.mode") === "subscribe" && p.get("hub.verify_token") === expected) {
    return new Response(p.get("hub.challenge") ?? "", { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

function signatureOk(raw: string, header: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret || !header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(raw).digest();
  const given = Buffer.from(header.slice(7), "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

async function sendText(to: string, body: string) {
  const res = await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: body.slice(0, MAX_WHATSAPP_CHARS), preview_url: false },
    }),
  });
  if (!res.ok) console.error("WhatsApp send failed", res.status, (await res.text()).slice(0, 300));
}

async function answer(from: string, text: string): Promise<string> {
  const history = cleanHistory(chats.get(from)?.turns);
  let final: Turn | null = null;
  let failure = "";
  try {
    await respond(
      history,
      text,
      (event, data) => {
        if (event === "final") final = data as Turn;
      },
      false,
      true,
    );
  } catch (e) {
    const msg = String(e instanceof Error ? e.message : e);
    failure = /overload|timed? ?out|no time left|empty reply|5\d\d/i.test(msg)
      ? "😓 My servers are a bit busy right now. Please send that again in a moment."
      : "😓 Something went wrong on my side. Please try again.";
  }
  if (!final) return failure || "😓 Something went wrong on my side. Please try again.";
  const turn = final as Turn;
  const userTurn: Turn = { role: "user", content: text };
  chats.set(from, { turns: [...history, userTurn, turn].slice(-40), at: Date.now() });
  return turn.content;
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!signatureOk(raw, req.headers.get("x-hub-signature-256"))) return new Response("Forbidden", { status: 403 });
  if (!process.env.NVIDIA_API_KEY || !process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    console.error("WhatsApp webhook is missing environment variables");
    return new Response("OK", { status: 200 }); // 200 so Meta doesn't keep retrying a setup problem
  }
  tidyMemory();

  let payload: any;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const jobs: Promise<void>[] = [];
  for (const entry of payload?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      for (const m of change?.value?.messages ?? []) {
        if (!m?.id || !m?.from || seen.has(m.id)) continue;
        seen.set(m.id, Date.now());
        jobs.push(
          (async () => {
            const text = m.type === "text" ? String(m.text?.body ?? "").trim().slice(0, 1000) : "";
            const reply = text
              ? await answer(m.from, text)
              : "I can only read text messages for now 🙂 Tell me what you'd like to buy and I'll find the best deals.";
            await sendText(m.from, reply);
          })().catch((e) => console.error("WhatsApp reply failed", e)),
        );
      }
    }
  }
  // Replies are sent before answering Meta: the serverless function stops once it responds, so there is no
  // "answer now, work later". A reply takes a few seconds, well inside Meta's wait.
  await Promise.all(jobs);
  return new Response("OK", { status: 200 });
}
