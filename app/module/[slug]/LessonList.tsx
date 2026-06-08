"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Play, ChevronLeft } from "lucide-react";
import type { Module } from "@/data/lessons";

interface LessonListProps {
  mod: Module;
}

const LESSONS_PER_PAGE = 4;

export default function LessonList({ mod }: LessonListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalLessonPages = Math.ceil(mod.lessons.length / LESSONS_PER_PAGE);
  const startIdx = (currentPage - 1) * LESSONS_PER_PAGE;
  const endIdx = startIdx + LESSONS_PER_PAGE;
  const paginatedLessons = mod.lessons.slice(startIdx, endIdx);

  return (
    <>
      <div className="space-y-4">
        {paginatedLessons.map((lesson) => (
          <div key={lesson.id} className="glass rounded-xl overflow-hidden">
            {/* Lesson header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/30
                  flex items-center justify-center text-violet-400 font-bold text-sm flex-shrink-0">
                  {lesson.lessonNumber}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{lesson.title}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{lesson.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className="text-xs text-slate-400 hidden sm:block">{lesson.duration}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium
                  ${lesson.difficulty === "Beginner" ? "text-emerald-400 bg-emerald-400/10" :
                    lesson.difficulty === "Intermediate" ? "text-cyan-400 bg-cyan-400/10" :
                    "text-violet-400 bg-violet-400/10"}`}>
                  {lesson.difficulty}
                </span>
              </div>
            </div>

            {/* Pages list */}
            <div className="divide-y divide-white/5">
              {lesson.pages.map((page) => (
                <Link
                  key={page.pageNumber}
                  href={`/module/${mod.slug}/${lesson.id}/${page.pageNumber}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center
                    justify-center text-xs text-slate-400 flex-shrink-0 group-hover:border-violet-500/40">
                    {page.pageNumber}
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-1">
                    {page.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-400 transition-colors" />
                </Link>
              ))}
            </div>

            {/* Start lesson CTA */}
            <div className="px-5 py-3 bg-white/2">
              <Link
                href={`/module/${mod.slug}/${lesson.id}/1`}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors
                  flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current" />
                Start Lesson {lesson.lessonNumber}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalLessonPages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
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
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150 ${
                  currentPage === page
                    ? "bg-violet-600 text-white"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/40"
                }`}
              >
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
