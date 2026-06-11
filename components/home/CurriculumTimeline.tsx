"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Clock, BookOpen } from "lucide-react";
import ModuleIcon from "@/components/ModuleIcon";

export interface TimelineModule {
  slug: string;
  title: string;
  level: string;
  lessonCount: number;
  duration: string;
  sampleLessons: string[];
}

const LEVEL_STYLE: Record<string, string> = {
  Beginner: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
  Intermediate: "bg-cyan-500/20 text-cyan-300 border-cyan-500/20",
  Advanced: "bg-violet-500/20 text-violet-300 border-violet-500/20",
};

/**
 * Vertical curriculum journey. A gradient progress line fills as the user
 * scrolls; each module node activates and slides in from alternating sides.
 */
export default function CurriculumTimeline({ modules }: { modules: TimelineModule[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.7"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 max-w-5xl mx-auto" aria-label="Curriculum path">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Your Path
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          One journey. Zero gaps.
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Each module unlocks the next — from your first variable to training real models.
        </p>
      </div>

      <div ref={ref} className="relative">
        {/* Spine */}
        <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
        <motion.div
          style={prefersReducedMotion ? {} : { scaleY: lineScale }}
          className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-violet-500 via-cyan-400 to-emerald-400"
        />

        <div className="space-y-8 sm:space-y-10">
          {modules.map((mod, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={mod.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative flex sm:w-1/2 pl-10 sm:pl-0 ${
                  isLeft ? "sm:pr-10" : "sm:ml-auto sm:pl-10"
                }`}
              >
                {/* Spine node: small glowing dot, never overlaps the card */}
                <motion.span
                  initial={prefersReducedMotion ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                  className={`absolute top-9 left-3 -translate-x-1/2 z-10 w-3.5 h-3.5 rounded-full
                    bg-violet-500 ring-4 ring-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.8)]
                    ${isLeft ? "sm:left-auto sm:right-0 sm:translate-x-1/2" : "sm:left-0 sm:-translate-x-1/2"}`}
                />

                {/* Card */}
                <Link
                  href={`/module/${mod.slug}`}
                  className="group block w-full glass rounded-3xl p-6 hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10"
                >
                  {/* Header row: themed icon + meta, no overlap */}
                  <div className="flex items-center gap-4 mb-4">
                    <ModuleIcon slug={mod.slug} withGlow size="w-12 h-12" iconSize="w-6 h-6" className="flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          Module {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${LEVEL_STYLE[mod.level] ?? LEVEL_STYLE.Beginner}`}>
                          {mod.level}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-violet-200 transition-colors truncate">
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4 text-sm text-slate-400">
                    {mod.sampleLessons.map((l) => (
                      <li key={l} className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                        <span className="truncate">{l}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500 border-t border-white/5 pt-3.5">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> {mod.lessonCount} lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {mod.duration}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-violet-400 font-bold group-hover:text-cyan-400 transition-colors">
                      Open <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
