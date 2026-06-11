"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronRight, Play, ChevronLeft, ChevronDown, Clock, FileText } from "lucide-react";
import type { Module } from "@/data/lessons";
import Reveal from "@/components/motion/Reveal";
import { getModuleTheme } from "@/components/ModuleIcon";

interface LessonListProps {
  mod: Module;
}

const LESSONS_PER_PAGE = 4;

export default function LessonList({ mod }: LessonListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openLesson, setOpenLesson] = useState<string | null>(mod.lessons[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();
  const theme = getModuleTheme(mod.slug);

  // Pagination logic
  const totalLessonPages = Math.ceil(mod.lessons.length / LESSONS_PER_PAGE);
  const startIdx = (currentPage - 1) * LESSONS_PER_PAGE;
  const endIdx = startIdx + LESSONS_PER_PAGE;
  const paginatedLessons = mod.lessons.slice(startIdx, endIdx);

  return (
    <>
      <div className="space-y-3">
        {paginatedLessons.map((lesson, i) => {
          const isOpen = openLesson === lesson.id;
          return (
            <Reveal key={lesson.id} delay={i * 0.06}>
              <div
                className={`relative glass rounded-2xl overflow-hidden transition-all duration-300
                  ${isOpen ? "border-violet-500/30 shadow-xl shadow-violet-500/10" : "hover:border-violet-500/20 hover:-translate-y-0.5"}`}
              >
                {/* Left accent bar when open */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 to-cyan-400 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                />

                {/* Lesson header — click to expand */}
                <button
                  onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300
                        ${isOpen ? `${theme.chip} ${theme.text} ${theme.glow}` : "bg-white/5 border-white/10 text-slate-400 group-hover:border-violet-500/30"}`}
                    >
                      {String(lesson.lessonNumber).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold truncate">{lesson.title}</h3>
                      <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className="text-xs text-slate-400 hidden sm:flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.duration}
                    </span>
                    <span className={`hidden sm:block px-2 py-0.5 rounded text-xs font-medium
                      ${lesson.difficulty === "Beginner" ? "text-emerald-400 bg-emerald-400/10" :
                        lesson.difficulty === "Intermediate" ? "text-cyan-400 bg-cyan-400/10" :
                        "text-violet-400 bg-violet-400/10"}`}>
                      {lesson.difficulty}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-400" : ""}`}
                    />
                  </div>
                </button>

                {/* Pages list — animated accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/5 divide-y divide-white/5">
                        {lesson.pages.map((page) => (
                          <Link
                            key={page.pageNumber}
                            href={`/module/${mod.slug}/${lesson.id}/${page.pageNumber}`}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-all group/page hover:pl-7"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-500 group-hover/page:text-violet-400 transition-colors flex-shrink-0" />
                            <span className="text-sm text-slate-300 group-hover/page:text-white transition-colors flex-1 truncate">
                              {page.title}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover/page:text-violet-400 group-hover/page:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>

                      {/* Start lesson CTA */}
                      <div className="px-5 py-3 border-t border-white/5 bg-white/[0.02]">
                        <Link
                          href={`/module/${mod.slug}/${lesson.id}/1`}
                          className={`text-xs font-bold transition-colors flex items-center gap-1.5 ${theme.text} hover:text-white`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          Start Lesson {lesson.lessonNumber}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalLessonPages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10
              text-slate-400 hover:text-white hover:border-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalLessonPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  currentPage === page
                    ? "text-white"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/40"
                }`}
              >
                {currentPage === page && (
                  <motion.span
                    layoutId="lessonListPageIndicator"
                    className="absolute inset-0 -z-10 rounded-lg bg-violet-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalLessonPages))}
            disabled={currentPage === totalLessonPages}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10
              text-slate-400 hover:text-white hover:border-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150"
          >
            <span className="text-sm font-medium">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
