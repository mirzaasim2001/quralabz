"use client";

import { useState, useRef, useEffect } from "react";

// Hidden test route - not linked from nav, excluded from sitemap, noindex
// below. See metadata export at the bottom of this file.

interface Citation {
  cnr: string;
  verified: boolean;
  title: string | null;
  court: string | null;
  decision_date: string | null;
  disposal: string | null;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  reasoning?: string | null;
  citations?: Citation[];
  error?: boolean;
}

const EXAMPLE_QUESTIONS = [
  "What factors do courts weigh for anticipatory bail in dowry death cases?",
  "How do courts treat prior criminal antecedents in bail applications?",
  "What role does the postmortem report play in bail decisions?",
];

export default function LawFirmTestPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [expandedReasoning, setExpandedReasoning] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(question: string) {
    if (!question.trim() || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/law-bail-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, thinking }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error || "Something went wrong.", error: true },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.answer,
            reasoning: data.reasoning,
            citations: data.citations,
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error — please try again.", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <header className="border-b border-white/8 px-6 py-4">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Bail Jurisprudence Assistant
        </h1>
        <p className="text-sm text-white/50 mt-0.5">
          Demo corpus — 864 bail judgments, Allahabad &amp; Bombay High Courts, 2024. Internal test only.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 max-w-3xl w-full mx-auto">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-white/40 text-sm">Try asking:</p>
            {EXAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="block w-full text-left rounded-xl bg-white/[0.03] border border-white/8 px-4 py-3 text-sm text-white/70 hover:bg-white/[0.06] hover:border-white/15 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[80%] rounded-2xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-white/10 px-4 py-3 text-sm"
                  : `max-w-[85%] rounded-2xl border px-4 py-3 text-sm space-y-3 ${
                      m.error
                        ? "bg-red-500/10 border-red-500/20 text-red-300"
                        : "bg-white/[0.03] border-white/8"
                    }`
              }
            >
              {m.role === "assistant" && m.reasoning && (
                <div className="border-b border-white/8 pb-2">
                  <button
                    onClick={() => setExpandedReasoning(expandedReasoning === i ? null : i)}
                    className="text-xs text-white/40 hover:text-white/60 flex items-center gap-1"
                  >
                    {expandedReasoning === i ? "▾" : "▸"} reasoning trace
                  </button>
                  {expandedReasoning === i && (
                    <p className="mt-2 text-xs text-white/40 whitespace-pre-wrap leading-relaxed">
                      {m.reasoning}
                    </p>
                  )}
                </div>
              )}

              <p className="whitespace-pre-wrap leading-relaxed text-white/90">{m.content}</p>

              {m.citations && m.citations.length > 0 && (
                <div className="pt-2 border-t border-white/8 space-y-1.5">
                  <p className="text-xs text-white/40">Sources</p>
                  {m.citations.map((c) => (
                    <div
                      key={c.cnr}
                      className={`text-xs rounded-lg px-3 py-2 ${
                        c.verified
                          ? "bg-white/[0.02] border border-white/8"
                          : "bg-amber-500/10 border border-amber-500/30"
                      }`}
                    >
                      {c.verified ? (
                        <>
                          <span className="text-white/80">{c.title}</span>
                          {c.disposal && (
                            <span className="text-white/40"> — {c.disposal}</span>
                          )}
                        </>
                      ) : (
                        <span className="text-amber-400">
                          ⚠ unverified citation ({c.cnr}) — not found in corpus, do not rely on this
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 px-4 py-3 text-sm text-white/40">
              Searching corpus and reasoning…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/8 px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <label className="flex items-center gap-2 text-xs text-white/50 select-none w-fit cursor-pointer">
            <input
              type="checkbox"
              checked={thinking}
              onChange={(e) => setThinking(e.target.checked)}
              className="accent-violet-500"
            />
            Show model reasoning (thinking mode)
          </label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about bail jurisprudence…"
              disabled={loading}
              className="flex-1 rounded-xl bg-white/[0.03] border border-white/8 px-4 py-3 text-sm focus:outline-none focus:border-violet-400/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl px-5 py-3 text-sm font-medium bg-gradient-to-r from-violet-500 to-cyan-500 disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
