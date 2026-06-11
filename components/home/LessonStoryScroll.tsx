"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { GraduationCap, MessageCircle, Code2, Terminal, Check } from "lucide-react";

/* ── The 4 stages of every QuraLabz lesson ─────────────────── */
const STAGES = [
  {
    icon: GraduationCap,
    label: "Textbook",
    accent: "violet",
    title: "The formal definition",
    body: (
      <p className="text-slate-300 leading-relaxed text-lg">
        A <strong className="text-white">variable</strong> is a named storage location in
        memory that holds a value. Python variables are{" "}
        <em className="text-violet-300 not-italic font-semibold">dynamically typed</em> —
        the interpreter infers the type at runtime, so no declaration is needed.
      </p>
    ),
  },
  {
    icon: MessageCircle,
    label: "Plain English",
    accent: "cyan",
    title: "…now in plain English",
    body: (
      <p className="text-slate-300 leading-relaxed text-lg">
        Think of a variable as a <strong className="text-white">labeled box</strong> 📦.
        You put something inside — a number, some text — and stick a label on it. Later,
        you just ask for the box by its label. That&apos;s it. No ceremony.
      </p>
    ),
  },
  {
    icon: Code2,
    label: "You Code",
    accent: "violet",
    title: "Then you write it yourself",
    body: (
      <div className="font-mono text-[15px] leading-7 text-left bg-black/40 rounded-xl p-5 border border-white/5">
        <div><span className="text-slate-500"># your labeled boxes</span></div>
        <div>name = <span className="text-emerald-300">&quot;Alice&quot;</span></div>
        <div>age = <span className="text-cyan-300">28</span></div>
        <div>
          <span className="text-violet-400">print</span>(f
          <span className="text-emerald-300">&quot;{"{name}"} is {"{age}"}&quot;</span>)
        </div>
      </div>
    ),
  },
  {
    icon: Terminal,
    label: "Instant Output",
    accent: "emerald",
    title: "…and see it run. Instantly.",
    body: (
      <div className="text-left">
        <div className="font-mono text-[15px] bg-black/60 rounded-xl p-5 border border-emerald-500/20">
          <span className="text-emerald-300">Alice is 28</span>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold">
          <Check className="w-4 h-4" /> Exercise passed — auto-graded in your browser
        </div>
      </div>
    ),
  },
] as const;

const ACCENT = {
  violet: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
} as const;

/**
 * Pinned scroll-storytelling section (Apple style). The outer wrapper is
 * 400vh tall; the inner screen stays pinned while scrollYProgress walks
 * through the 4 lesson stages.
 */
export default function LessonStoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(STAGES.length - 1, Math.floor(v * STAGES.length)));
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* Reduced motion / no-JS fallback: render all stages stacked */
  if (prefersReducedMotion) {
    return (
      <section className="relative z-10 px-4 py-24 max-w-4xl mx-auto space-y-10">
        <h2 className="text-3xl sm:text-5xl font-bold text-white text-center mb-12">
          Anatomy of a Lesson
        </h2>
        {STAGES.map((s) => (
          <div key={s.label} className="glass rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
            {s.body}
          </div>
        ))}
      </section>
    );
  }

  const active = STAGES[stage];
  const ActiveIcon = active.icon;

  return (
    <section ref={containerRef} className="relative z-10 h-[340vh]" aria-label="How lessons work">
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
            How it works
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Anatomy of a Lesson
          </h2>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-center max-w-5xl w-full">
          {/* ── Stage rail ── */}
          <div className="hidden lg:flex flex-col gap-1 relative">
            <div className="absolute left-[18px] top-4 bottom-4 w-px bg-white/10" />
            <motion.div
              style={{ scaleY: railScale }}
              className="absolute left-[18px] top-4 bottom-4 w-px origin-top bg-gradient-to-b from-violet-500 to-cyan-400"
            />
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === stage;
              const isDone = i < stage;
              return (
                <div key={s.label} className="relative flex items-center gap-4 py-4">
                  <div
                    className={`relative z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300
                      ${isActive ? ACCENT[s.accent] + " scale-110" : isDone ? "bg-white/10 border-white/20 text-white" : "bg-[#0d0d14] border-white/10 text-slate-600"}`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-sm font-semibold transition-colors duration-300
                      ${isActive ? "text-white" : "text-slate-500"}`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ── Morphing stage card ── */}
          <div className="relative min-h-[340px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 36, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -36, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="glass-strong rounded-3xl p-8 sm:p-10 w-full shadow-2xl shadow-violet-500/5"
              >
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 ${ACCENT[active.accent]}`}
                >
                  <ActiveIcon className="w-3.5 h-3.5" />
                  Step {stage + 1} / {STAGES.length} — {active.label}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">{active.title}</h3>
                {active.body}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile stage dots */}
        <div className="flex lg:hidden gap-2 mt-8">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === stage ? "w-8 bg-violet-400" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
