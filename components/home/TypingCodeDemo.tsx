"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Loader2, Check } from "lucide-react";

/* ── Demo script ───────────────────────────────────────────── */
const DEMO_CODE = `import pandas as pd

scores = {"Alice": 91, "Bob": 84, "Cara": 78}
df = pd.DataFrame(scores.items(),
                  columns=["name", "score"])

print(df)
print("Top student:", df.loc[df.score.idxmax(), "name"])`;

const DEMO_OUTPUT = [
  "    name  score",
  "0  Alice     91",
  "1    Bob     84",
  "2   Cara     78",
  "Top student: Alice",
];

/* ── Tiny syntax highlighter (keywords / strings / numbers) ── */
const TOKEN_RE =
  /("[^"]*"?)|(\b\d+\.?\d*\b)|(\b(?:import|from|print|def|return|for|in|if|else|as)\b)/g;

function highlight(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line)) !== null) {
    if (m.index > last) nodes.push(line.slice(last, m.index));
    if (m[1]) nodes.push(<span key={m.index} className="text-emerald-300">{m[1]}</span>);
    else if (m[2]) nodes.push(<span key={m.index} className="text-cyan-300">{m[2]}</span>);
    else nodes.push(<span key={m.index} className="text-violet-400">{m[3]}</span>);
    last = m.index + m[0].length;
  }
  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

type Phase = "typing" | "running" | "output" | "hold";

/**
 * Self-playing CodePlayground preview for the hero: types real Python,
 * "runs" it, prints output, then loops. Purely cosmetic — zero Pyodide cost.
 */
export default function TypingCodeDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (phase === "typing") {
      if (chars >= DEMO_CODE.length) {
        timerRef.current = setTimeout(() => setPhase("running"), 600);
      } else {
        timerRef.current = setTimeout(
          () => setChars((c) => Math.min(c + (Math.random() > 0.7 ? 3 : 1), DEMO_CODE.length)),
          24
        );
      }
    } else if (phase === "running") {
      timerRef.current = setTimeout(() => setPhase("output"), 900);
    } else if (phase === "output") {
      timerRef.current = setTimeout(() => setPhase("hold"), 1200);
    } else {
      timerRef.current = setTimeout(() => {
        setChars(0);
        setPhase("typing");
      }, 4200);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, chars, prefersReducedMotion]);

  const typed = prefersReducedMotion ? DEMO_CODE : DEMO_CODE.slice(0, chars);
  const showOutput = prefersReducedMotion || phase === "output" || phase === "hold";
  const isRunning = phase === "running";
  const lines = typed.split("\n");

  return (
    <div className="code-frame-glow rounded-2xl bg-[#0d0d14]/90 backdrop-blur-md shadow-2xl shadow-violet-500/10 overflow-hidden text-left">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs font-mono text-slate-400">playground.py</span>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors duration-300
            ${isRunning ? "bg-cyan-500/20 text-cyan-300" : showOutput ? "bg-emerald-500/15 text-emerald-300" : "bg-violet-500/15 text-violet-300"}`}
        >
          {isRunning ? (
            <><Loader2 className="w-3 h-3 animate-spin" /> Running…</>
          ) : showOutput ? (
            <><Check className="w-3 h-3" /> Done</>
          ) : (
            <><Play className="w-3 h-3" /> Run</>
          )}
        </div>
      </div>

      {/* Code area */}
      <div className="px-5 py-4 font-mono text-[13px] leading-6 min-h-[12.5rem]" aria-hidden="true">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-6 mr-4 select-none text-right text-slate-600">{i + 1}</span>
            <span className="text-slate-200 whitespace-pre">{highlight(line)}</span>
            {i === lines.length - 1 && !prefersReducedMotion && phase === "typing" && (
              <span className="w-[7px] h-[18px] mt-[3px] bg-cyan-400 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {/* Output terminal */}
      <div className="border-t border-white/5 bg-black/40 px-5 py-3 min-h-[9rem]">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-semibold">
          Output
        </div>
        <AnimatePresence>
          {showOutput && (
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              animate="show"
              exit={{ opacity: 0 }}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              className="font-mono text-[13px] leading-6 text-emerald-300/90"
            >
              {DEMO_OUTPUT.map((line, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                  className="whitespace-pre"
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {isRunning && (
          <div className="font-mono text-[13px] text-cyan-400 animate-pulse">
            ⠧ executing in WebAssembly…
          </div>
        )}
      </div>
    </div>
  );
}
