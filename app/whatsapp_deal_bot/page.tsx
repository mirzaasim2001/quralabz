"use client";

// Hidden test route - not linked from nav, excluded from sitemap, noindex (see layout.tsx).
// Deal Finder: a shopping chat that compares prices across Indian stores. The conversation lives only in
// this page's state and is sent with every message; reloading the page starts a fresh chat.
// Built phone-first: the chat fills the screen below the site navbar, only the message list scrolls, and the
// input bar stays above the on-screen keyboard.

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Turn {
  role: "user" | "assistant";
  content: string;
  note?: string;
  kind?: "chat" | "question" | "deals";
}

interface Bubble {
  role: "user" | "assistant";
  content: string;
  status?: string;
  error?: boolean;
  pending?: boolean;
}

const NAVBAR_PX = 64; // the site's fixed navbar (h-16)
const MAX_ATTEMPTS = 3;
const EXAMPLES = ["Any good jackets? 🧥", "iPhone 16 128GB price", "Suggest some earbuds 🎧", "Nike Air Max for men 👟"];

// Rewrites any table-looking block into strict GFM so it always renders as a table
// (models emit em-dash separator rows, wrong column counts, blank lines between rows, fenced tables...).
function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|") && !s.endsWith("\\|")) s = s.slice(0, -1);
  return s.split(/(?<!\\)\|/).map((c) => c.trim());
}
const isRow = (l: string) => {
  const t = l.trim();
  return t.startsWith("|") || (t.match(/(?<!\\)\|/g) || []).length >= 2;
};
const isSep = (cells: string[]) => cells.every((c) => /^:?[-—–‒―]+:?$/.test(c));

function fixTables(md: string): string {
  md = md.replace(/[│┃]/g, "|").replace(/```[^\n]*\n([\s\S]*?)\n?```/g, (m, body: string) => {
    const ls = body.split("\n").filter((l) => l.trim());
    return ls.length >= 2 && ls.every(isRow) ? `\n${body}\n` : m;
  });
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  let inFence = false;
  while (i < lines.length) {
    if (lines[i].trim().startsWith("```")) inFence = !inFence;
    if (inFence || !isRow(lines[i])) {
      out.push(lines[i++]);
      continue;
    }
    const group: string[] = [];
    let j = i;
    while (j < lines.length) {
      if (isRow(lines[j])) {
        group.push(lines[j++]);
        continue;
      }
      let k = j;
      while (k < lines.length && !lines[k].trim()) k++;
      if (k > j && k < lines.length && isRow(lines[k])) {
        j = k;
        continue;
      }
      break;
    }
    i = j;
    const rows = group.map(splitRow).filter((r) => !isSep(r));
    if (group.length < 2 || !rows.length) {
      out.push(...group);
      continue;
    }
    const n = Math.max(...rows.map((r) => r.length));
    const fmt = (r: string[]) => `| ${r.concat(Array(n - r.length).fill("")).join(" | ")} |`;
    out.push("", fmt(rows[0]), `|${" --- |".repeat(n)}`, ...rows.slice(1).map(fmt), "");
  }
  return out.join("\n");
}

// The product photo above a deals table: a fixed-size white tile (store photos are shot on white) with the
// caption beside it, so a large image never takes over the chat. Hidden if the store's CDN refuses it.
function ProductCard({ src, alt }: { src?: string; alt?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <span className="my-1 flex max-w-sm items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2">
      <span className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- external store CDN images, sized by the tile */}
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain"
        />
      </span>
      {alt && <span className="text-xs sm:text-sm leading-snug text-white/80">{alt}</span>}
    </span>
  );
}

function Markdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 whitespace-nowrap"
          />
        ),
        table: ({ node, ...props }) => (
          <div className="my-2 -mx-1 overflow-x-auto overscroll-x-contain rounded-xl border border-white/10">
            <table {...props} className="w-full text-[12px] sm:text-sm border-collapse" />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th {...props} className="bg-white/[0.05] px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-white/70 whitespace-nowrap" />
        ),
        td: ({ node, ...props }) => (
          <td {...props} className="border-t border-white/8 px-2 sm:px-3 py-1.5 sm:py-2 align-top text-white/85 break-words" />
        ),
        img: ({ src, alt }) => <ProductCard src={typeof src === "string" ? src : undefined} alt={alt} />,
        p: ({ node, ...props }) => <p {...props} className="leading-relaxed [&:not(:first-child)]:mt-2" />,
        ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 space-y-1 mt-2" />,
        ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 space-y-1 mt-2" />,
      }}
    >
      {fixTables(text)}
    </ReactMarkdown>
  );
}

export default function WhatsappDealBotPage() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [frame, setFrame] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const history = useRef<Turn[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const followBottom = useRef(true);

  // Size the chat to the *visible* screen, so the input bar stays above the on-screen keyboard (iOS Safari
  // shrinks the visual viewport rather than the page), and lock the page behind it so only messages scroll.
  useEffect(() => {
    const vv = window.visualViewport;
    // Width comes from the visible screen too: elsewhere the site makes the page wider than a phone screen,
    // and a plain full-width panel would stretch to that and push the Send button off-screen.
    const update = () =>
      setFrame({
        top: (vv?.offsetTop ?? 0) + NAVBAR_PX,
        left: vv?.offsetLeft ?? 0,
        width: vv?.width ?? window.innerWidth,
        height: (vv?.height ?? window.innerHeight) - NAVBAR_PX,
      });
    update();
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    const { documentElement: html, body } = document;
    const previous = [html.style.overflow, body.style.overflow];
    html.style.overflow = body.style.overflow = "hidden";
    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      [html.style.overflow, body.style.overflow] = previous;
    };
  }, []);

  // Follow new text only while the reader is at the bottom; don't yank them down if they scrolled up to read.
  useEffect(() => {
    const list = listRef.current;
    if (list && followBottom.current) list.scrollTop = list.scrollHeight;
  }, [bubbles, frame]);

  const onScroll = () => {
    const list = listRef.current;
    if (list) followBottom.current = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
  };

  const growInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const updateLast = (patch: (b: Bubble) => Bubble) =>
    setBubbles((all) => all.map((b, i) => (i === all.length - 1 ? patch(b) : b)));

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    setInput("");
    requestAnimationFrame(growInput);
    setBusy(true);
    followBottom.current = true;
    setBubbles((all) => [...all, { role: "user", content: message }, { role: "assistant", content: "", pending: true }]);

    let final: Turn | null = null;
    let failure = "";
    // Up to 3 attempts. A request that fails (network, cold start, 5xx), or a reply that gets cut off before
    // any text was shown, is retried silently. The server already falls back across 3 models, so an error it
    // reports itself is shown rather than retried (a retry would mean another long wait).
    for (let attempt = 0; attempt < MAX_ATTEMPTS && !final; attempt++) {
      if (attempt) {
        await new Promise((r) => setTimeout(r, 700 * attempt));
        updateLast((b) => ({ ...b, content: "", status: undefined }));
      }
      let shown = false;
      let serverError = "";
      try {
        const res = await fetch("/api/deal-bot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history: history.current }),
        });
        if (!res.ok || !res.body) {
          failure = (await res.json().catch(() => null))?.error || `The server had a problem (error ${res.status}). Please try again.`;
          if (res.status < 500 && res.status !== 429) break; // a bad request won't fix itself on retry
          continue;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";
          for (const raw of events) {
            const event = raw.match(/^event: (.*)$/m)?.[1];
            const dataLine = raw.match(/^data: (.*)$/m)?.[1];
            if (!event || dataLine === undefined) continue;
            const data = JSON.parse(dataLine);
            if (event === "token") {
              shown = true;
              updateLast((b) => ({ ...b, content: b.content + data, status: undefined }));
            } else if (event === "discard") updateLast((b) => ({ ...b, content: "" }));
            else if (event === "status") updateLast((b) => ({ ...b, status: data }));
            else if (event === "final") final = data;
            else if (event === "error") serverError = data;
          }
        }
      } catch {
        failure = "Couldn't reach the server. Check your connection and try again.";
      }
      if (final) break;
      if (serverError) {
        failure = serverError;
        break;
      }
      if (shown) {
        failure = "The reply got cut off. Please send that again.";
        break;
      }
      failure ||= "The reply didn't come through. Please try again.";
    }

    if (final) history.current = [...history.current, { role: "user", content: message }, final];
    else updateLast((b) => ({ ...b, content: failure, error: true }));
    updateLast((b) => ({ ...b, pending: false, status: undefined }));
    setBusy(false);
  }

  // Portal into <body>: the site layout wraps pages in a `relative z-10` <main>, which would trap this
  // fixed panel under the footer and background-effect layers. z-[45] keeps it just below the navbar (z-50).
  if (!frame) return null;
  return createPortal(
    <div
      className="fixed z-[45] flex flex-col overflow-hidden bg-[#0a0a0f] text-white"
      style={{ top: frame.top, left: frame.left, width: frame.width, height: frame.height }}
    >
      <header className="shrink-0 border-b border-white/8 px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Deal Finder 🛍️
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5">Best prices across Amazon, Flipkart, Myntra, AJIO, Croma & more</p>
        </div>
      </header>

      <div ref={listRef} onScroll={onScroll} className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
          {bubbles.length === 0 && (
            <div className="pt-6 sm:pt-14 text-center space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white/90">What are you shopping for?</h2>
                <p className="text-sm text-white/45 mt-1">Ask about any product and I&apos;ll find the best deal.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-left">
                {EXAMPLES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-xl bg-white/[0.03] border border-white/8 px-4 py-3 text-sm text-white/70 active:bg-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {bubbles.map((b, i) => (
            <div key={i} className={b.role === "user" ? "flex justify-end" : "flex justify-start"}>
              {b.role === "user" ? (
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-white/10 px-3.5 py-2.5 text-sm whitespace-pre-wrap break-words">
                  {b.content}
                </div>
              ) : (
                <div
                  className={`w-fit max-w-full sm:max-w-[88%] min-w-0 rounded-2xl rounded-bl-md border px-3.5 py-2.5 text-sm ${
                    b.error ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-white/[0.03] border-white/8 text-white/90"
                  }`}
                >
                  {b.status && <p className="text-xs italic text-white/45 mb-1">{b.status}</p>}
                  {b.content ? (
                    b.error ? <p>{b.content}</p> : <Markdown text={b.content} />
                  ) : (
                    b.pending &&
                    !b.status && (
                      <span className="inline-flex gap-1 py-1" aria-label="Typing">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-white/8 bg-[#0a0a0f] px-3 sm:px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-3xl mx-auto space-y-1.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 items-end"
          >
            {/* 16px text on phones: iOS zooms the page when focusing inputs smaller than that */}
            <textarea
              ref={inputRef}
              value={input}
              rows={1}
              enterKeyHint="send"
              onChange={(e) => {
                setInput(e.target.value);
                growInput();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Message Deal Finder…"
              className="flex-1 resize-none rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-base sm:text-sm leading-6 focus:outline-none focus:border-violet-400/50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="h-11 shrink-0 rounded-xl px-4 sm:px-5 text-sm font-medium bg-gradient-to-r from-violet-500 to-cyan-500 disabled:opacity-40 active:opacity-80 hover:opacity-90 transition-opacity"
            >
              Send
            </button>
          </form>
          <p className="text-center text-[10px] sm:text-[11px] leading-snug text-white/35">
            Prices come from search results and can be out of date. Confirm on the store page. Chat resets on reload.
            <br />
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
