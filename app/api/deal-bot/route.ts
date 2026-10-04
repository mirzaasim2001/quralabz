// Server-side only. Holds NVIDIA_API_KEY, never sent to the browser.
// Website chat endpoint. Streams Server-Sent Events: token, status, discard (clear streamed text), final (turn to
// store), error, done. The Deal Finder logic itself lives in engine.ts (shared with the WhatsApp webhook).

import { NextRequest } from "next/server";
import { cleanHistory, MAX_MESSAGE_CHARS, respond, type Send } from "./engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
// Singapore: Mumbai (bom1) was being blocked by Flipkart (529), Amazon (503), AJIO/Reliance (403); sin1 is
// the nearest region with different server addresses.
export const preferredRegion = "sin1";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const message = String(body?.message ?? "").trim().slice(0, MAX_MESSAGE_CHARS);
  if (!message) return Response.json({ error: "Empty message" }, { status: 400 });
  if (!process.env.NVIDIA_API_KEY) return Response.json({ error: "Server is missing its API key" }, { status: 500 });
  const history = cleanHistory(body?.history);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send: Send = (event, data) => controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      try {
        await respond(history, message, send, body?.debug === true);
      } catch (e) {
        const msg = String(e instanceof Error ? e.message : e);
        send("error", /overload|timed? ?out|no time left|empty reply|5\d\d/i.test(msg) ? "NVIDIA's servers are busy right now 😓 please send that again in a moment." : "Something went wrong. Please try again.");
      }
      send("done", "");
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", "X-Accel-Buffering": "no" },
  });
}
