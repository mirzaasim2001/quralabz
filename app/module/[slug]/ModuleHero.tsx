"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BookOpen, Clock, ArrowLeft, Play, FileText, BarChart3 } from "lucide-react";
import type { Module } from "@/data/lessons";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";
import ModuleIcon, { getModuleTheme } from "@/components/ModuleIcon";

interface ModuleHeroProps {
  mod: Module;
  totalPages: number;
}

/**
 * Module hero with a "Ken Burns" scroll-parallax drift on the
 * background image and a soft parallax/fade on the text content.
 */
export default function ModuleHero({ mod, totalPages }: ModuleHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const theme = getModuleTheme(mod.slug);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  const stats = [
    { icon: Clock, label: mod.totalDuration },
    { icon: BookOpen, label: `${mod.lessons.length} lessons` },
    { icon: FileText, label: `${totalPages} interactive pages` },
    { icon: BarChart3, label: mod.level },
  ];

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Parallax background image (LCP — priority load) */}
      <motion.div
        className="absolute inset-0"
        style={prefersReducedMotion ? undefined : { y: imgY, scale: imgScale }}
      >
        <Image
          src={mod.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-30`} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0f]" />
      {/* Subtle grid for texture */}
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      <motion.div
        className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-14"
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Modules
        </Link>

        <div className="flex items-start gap-5">
          <Reveal className="hidden sm:block flex-shrink-0">
            <ModuleIcon slug={mod.slug} withGlow size="w-20 h-20" iconSize="w-10 h-10" className="rounded-3xl" />
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
                {mod.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-5">
                {mod.description}
              </p>
            </Reveal>

            {/* Stat chips */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-2.5 mb-7">
                {stats.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${theme.chip} ${theme.text}`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <MagneticButton>
                <Link
                  href={`/module/${mod.slug}/${mod.lessons[0].id}/1`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold
                    bg-violet-600 hover:bg-violet-500 text-white transition-all duration-150 shadow-lg glow-violet"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Start Module
                </Link>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
