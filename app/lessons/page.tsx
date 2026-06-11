import type { Metadata } from "next";
import Link from "next/link";
import { modules } from "@/data/lessons";
import { BookOpen, ChevronRight, Clock, ArrowRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import ModuleIcon from "@/components/ModuleIcon";

export const metadata: Metadata = {
  title: "All Lessons — Complete Data Science Curriculum | QuraLabz",
  description:
    "Browse all 126+ interactive lessons across 11 modules: Python, Pandas, NumPy, Data Visualization, Machine Learning, Deep Learning, Generative AI, and more. Free, no sign-up required.",
  keywords: [
    "data science lessons",
    "python tutorial",
    "machine learning course",
    "pandas tutorial",
    "numpy tutorial",
    "deep learning lessons",
    "free data science course",
    "interactive python",
  ],
};

export default function AllLessonsPage() {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalPages = modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.pages.length, 0),
    0
  );

  return (
    <div className="min-h-screen relative px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <Reveal>
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Complete Curriculum
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            All Lessons
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            <AnimatedCounter value={totalLessons} className="text-white font-semibold" /> lessons ·{" "}
            <AnimatedCounter value={totalPages} className="text-white font-semibold" /> interactive pages across{" "}
            <AnimatedCounter value={modules.length} className="text-white font-semibold" /> modules.
            Everything is free — no account required.
          </p>
        </div>
        </Reveal>

        {/* Module + Lesson Directory */}
        <div className="space-y-10">
          {modules.map((mod, idx) => (
            <Reveal key={mod.id} delay={(idx % 3) * 0.1}>
            <div
              className="rounded-3xl bg-[#0d0d14] border border-white/8 overflow-hidden"
            >
              {/* Module Header */}
              <div className={`px-6 py-5 bg-gradient-to-r ${mod.color} bg-opacity-10 border-b border-white/8`}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <ModuleIcon slug={mod.slug} size="w-11 h-11" iconSize="w-5 h-5" className="flex-shrink-0" />
                    <div>
                      <Link
                        href={`/module/${mod.slug}`}
                        className="text-xl font-bold text-white hover:text-violet-300 transition-colors"
                      >
                        {mod.title}
                      </Link>
                      <p className="text-slate-400 text-sm mt-0.5">{mod.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {mod.lessons.length} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.totalDuration}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                      ${mod.level === "Beginner" ? "bg-emerald-500/20 text-emerald-300" :
                        mod.level === "Intermediate" ? "bg-cyan-500/20 text-cyan-300" :
                        "bg-violet-500/20 text-violet-300"}`}>
                      {mod.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lesson List */}
              <div className="divide-y divide-white/5">
                {mod.lessons.map((lesson) => (
                  <div key={lesson.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-xs text-slate-400 font-mono mt-1 flex-shrink-0 w-6">
                          {lesson.lessonNumber}.
                        </span>
                        <div className="min-w-0">
                          <Link
                            href={`/module/${mod.slug}/${lesson.id}/1`}
                            className="text-sm font-semibold text-slate-200 hover:text-violet-300 transition-colors"
                          >
                            {lesson.title}
                          </Link>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                            {lesson.description}
                          </p>
                          {/* Page links */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {lesson.pages.map((page) => (
                              <Link
                                key={page.pageNumber}
                                href={`/module/${mod.slug}/${lesson.id}/${page.pageNumber}`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs
                                  bg-white/5 border border-white/10 text-slate-400
                                  hover:bg-violet-500/20 hover:text-violet-300 hover:border-violet-500/30
                                  transition-all duration-150"
                                title={page.title}
                              >
                                <ChevronRight className="w-2.5 h-2.5" />
                                {page.title.length > 30
                                  ? page.title.slice(0, 30) + "…"
                                  : page.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-slate-400">{lesson.duration}</span>
                        <Link
                          href={`/module/${mod.slug}/${lesson.id}/1`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
                            bg-violet-600/20 text-violet-300 border border-violet-500/20
                            hover:bg-violet-600/40 transition-all"
                        >
                          Start
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Module footer CTA */}
              <div className="px-6 py-4 border-t border-white/8 bg-white/[0.01]">
                <Link
                  href={`/module/${mod.slug}`}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                >
                  View full {mod.title} module overview
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal>
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">
            All lessons are free. No account needed. Run Python directly in your browser.
          </p>
          <Link
            href="/module/python"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white
              bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500
              transition-all duration-300 shadow-lg shadow-violet-500/20"
          >
            Start with Python Basics
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        </Reveal>
      </div>
    </div>
  );
}
