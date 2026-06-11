"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Play, Loader2, Pencil, Zap, CheckCircle2 } from "lucide-react";

/* ── Steps that the sticky editor reacts to ────────────────── */
const STEPS = [
  {
    icon: Pencil,
    title: "Start with real starter code",
    body: "Every exercise opens with editable, working Python — not a blank screen. Tweak it, break it, make it yours. The editor is a full Monaco instance (the same engine as VS Code).",
  },
  {
    icon: Play,
    title: "Hit Run — no setup, ever",
    body: "Your code executes inside your browser via Pyodide (Python compiled to WebAssembly). Nothing is installed, nothing leaves your machine, and it works offline once loaded.",
  },
  {
    icon: Zap,
    title: "Instant, auto-graded feedback",
    body: "Output appears in milliseconds and is compared against the expected result. Plots from Matplotlib render inline as crisp images — like a Jupyter notebook, minus the Jupyter.",
  },
] as const;

const CODE = [
  { ln: "1", parts: [{ t: "tip = [", c: "text-slate-200" }, { t: "12, 18, 25, 9, 31", c: "text-cyan-300" }, { t: "]", c: "text-slate-200" }] },
  { ln: "2", parts: [{ t: "avg = ", c: "text-slate-200" }, { t: "sum", c: "text-violet-400" }, { t: "(tip) / ", c: "text-slate-200" }, { t: "len", c: "text-violet-400" }, { t: "(tip)", c: "text-slate-200" }] },
  { ln: "3", parts: [{ t: "print", c: "text-violet-400" }, { t: "(", c: "text-slate-200" }, { t: "f\"Average tip: ${avg:.2f}\"", c: "text-emerald-300" }, { t: ")", c: "text-slate-200" }] },
];

/**
 * Sticky split section: the editor on the left stays pinned and reacts
 * (idle → running → output) as the explanation steps scroll past on the right.
 */
export default function CodeExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.7"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length))));
  });

  const showRunning = step === 1;
  const showOutput = step >= 2 || prefersReducedMotion;

  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
          The Core Product
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          A real IDE, living in every lesson
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Keep scrolling — the editor follows along.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* ── Sticky editor ── */}
        <div className="lg:sticky lg:top-24 order-1">
          <div className="code-frame-glow rounded-2xl bg-[#0d0d14]/95 backdrop-blur-md overflow-hidden shadow-2xl shadow-cyan-500/5">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-xs font-mono text-slate-400">lesson_03.py</span>
              </div>
              {/* Decorative "Run" chip — a div, not a button, so it can never
                  take focus while aria-hidden (a11y violation). */}
              <motion.div
                aria-hidden="true"
                animate={
                  showRunning && !prefersReducedMotion
                    ? { scale: [1, 0.92, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.4 }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold select-none transition-colors duration-300
                  ${showRunning ? "bg-cyan-500 text-black" : "bg-violet-600 text-white"}`}
              >
                {showRunning ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running</>
                ) : (
                  <><Play className="w-3.5 h-3.5" /> Run</>
                )}
              </motion.div>
            </div>

            {/* Code */}
            <div className="px-5 py-5 font-mono text-sm leading-7">
              {CODE.map((line) => (
                <div key={line.ln} className="flex">
                  <span className="w-6 mr-4 text-right select-none text-slate-600">{line.ln}</span>
                  <span className="whitespace-pre">
                    {line.parts.map((p, i) => (
                      <span key={i} className={p.c}>{p.t}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            {/* Output */}
            <div className="border-t border-white/5 bg-black/40 px-5 py-4 min-h-[7rem]">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                Output
              </div>
              <AnimatePresence mode="wait">
                {showRunning && (
                  <motion.div
                    key="running"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-sm text-cyan-400 animate-pulse"
                  >
                    ⠧ executing…
                  </motion.div>
                )}
                {showOutput && (
                  <motion.div
                    key="output"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="font-mono text-sm text-emerald-300">Average tip: $19.00</div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Matches expected output
                    </div>
                  </motion.div>
                )}
                {!showRunning && !showOutput && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-sm text-slate-600"
                  >
                    — press Run to execute —
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Scrolling steps ── */}
        <div className="order-2 flex flex-col gap-[14vh] py-[6vh]">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step || prefersReducedMotion;
            return (
              <motion.div
                key={s.title}
                animate={{ opacity: isActive ? 1 : 0.35, x: isActive ? 0 : 12 }}
                transition={{ duration: 0.4 }}
                className="flex gap-5"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300
                    ${isActive ? "bg-violet-500/15 border-violet-500/40 text-violet-300 shadow-glow" : "bg-white/5 border-white/10 text-slate-500"}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1">0{i + 1}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-md">{s.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
