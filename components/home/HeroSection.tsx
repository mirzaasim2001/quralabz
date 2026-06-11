"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap, BookOpen, Star, Terminal } from "lucide-react";
import MagneticButton from "@/components/motion/MagneticButton";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import TypingCodeDemo from "@/components/home/TypingCodeDemo";

interface HeroSectionProps {
  moduleCount: number;
  lessonCount: number;
}

/**
 * Scroll-morphing hero. Each layer (badge, headline, subtext, CTAs, demo)
 * translates/fades at a different rate as the user scrolls, creating the
 * Apple-style parallax "text moves with you" effect.
 */
export default function HeroSection({ moduleCount, lessonCount }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layered parallax: deeper layers leave faster, demo lingers.
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const ySub = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yCta = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yDemo = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const scaleTitle = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const opacityText = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const opacityDemo = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const motionStyle = (y: any, extra: object = {}) =>
    prefersReducedMotion ? {} : { y, opacity: opacityText, ...extra };

  return (
    <section
      ref={ref}
      className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center px-4 py-10 sm:py-14 overflow-hidden"
    >
      {/* Glow core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-10 items-center w-full">
        {/* ── Left: copy ── */}
        <div className="text-center lg:text-left">
          <motion.div style={motionStyle(yBadge)}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium mb-8 shadow-lg shadow-violet-500/5 hover:border-violet-500/30 transition-all">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-white">
                100% Free · Runs in Your Browser · No Sign-Up
              </span>
            </div>
          </motion.div>

          <motion.h1
            style={motionStyle(yTitle, { scale: scaleTitle })}
            className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.95] mb-7"
          >
            <span className="text-white">Learn Python, Data Science &amp; ML —</span>{" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#8b5cf6,45%,#06b6d4,55%,#8b5cf6)] bg-[length:200%_100%] animate-shimmer">
              by actually coding
            </span>
          </motion.h1>

          <motion.div style={motionStyle(ySub)}>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mb-7 text-slate-400 font-mono text-sm">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="border-r border-slate-700 pr-4">No signup</span>
              <span className="border-r border-slate-700 pr-4">Instant feedback</span>
              <span>Browser-based coding</span>
            </div>
            <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Write real Python, run it instantly via WebAssembly — no installs, no
              accounts. From variables to machine learning, every lesson is hands-on.
            </p>
          </motion.div>

          <motion.div style={motionStyle(yCta)}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
              <MagneticButton className="relative group p-[1px] rounded-2xl bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 bg-[length:200%_100%] animate-shimmer">
                <Link
                  href="/module/python"
                  className="relative flex items-center gap-3 px-9 py-4 sm:px-10 sm:py-5 rounded-2xl text-base font-bold bg-[#0a0a0f] hover:bg-[#0f0f18] text-white transition-all duration-300"
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 sm:py-5 rounded-2xl text-base font-semibold bg-white/5 border border-white/10 backdrop-blur-sm text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Book Consultation
                </Link>
              </MagneticButton>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <BookOpen className="w-4 h-4 text-violet-400" />
                <AnimatedCounter value={moduleCount} className="text-white font-semibold" /> Modules ·{" "}
                <AnimatedCounter value={lessonCount} className="text-white font-semibold" /> Lessons
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 text-slate-200">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                4.9 / 5 satisfaction
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Right: live playground preview ── */}
        <motion.div
          style={prefersReducedMotion ? {} : { y: yDemo, opacity: opacityDemo }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative [perspective:1200px]"
        >
          {/* Floating glow behind the demo */}
          <div className="absolute -inset-8 bg-gradient-to-tr from-violet-600/15 via-transparent to-cyan-500/15 blur-2xl rounded-[3rem]" />
          <TypingCodeDemo />
          <div className="mt-4 text-center text-xs font-mono text-slate-500">
            ▲ Live preview — the real playground awaits inside every lesson
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={prefersReducedMotion ? {} : { opacity: opacityText }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-slate-600 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
