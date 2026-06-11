"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type Module, type Lesson, type LessonPage } from "@/data/lessons";
import CodePlayground from "@/components/CodePlayground";
import ModuleIcon from "@/components/ModuleIcon";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Menu,
  X,
  Home,
  Clock,
  BarChart3,
} from "lucide-react";

type NavItem = { lessonId: string; lessonTitle: string; page: LessonPage };

interface Props {
  mod: Module;
  lesson: Lesson;
  currentPage: LessonPage;
  params: {
    slug: string;
    lessonId: string;
    page: string;
  };
}

export default function LessonPageClient({ mod, lesson, currentPage, params }: Props) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const readingProgress = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    readingProgress.set(max > 0 ? el.scrollTop / max : 0);
  };

  const pageNumber = parseInt(params.page, 10);

  // Reset scroll position & reading progress on every page change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    readingProgress.set(0);
  }, [params.lessonId, pageNumber, readingProgress]);

  // Build flat navigation across all lessons & pages
  const allPages: NavItem[] = mod.lessons.flatMap((l) =>
    l.pages.map((p) => ({ lessonId: l.id, lessonTitle: l.title, page: p }))
  );

  const currentFlatIdx = allPages.findIndex(
    (n) => n.lessonId === params.lessonId && n.page.pageNumber === pageNumber
  );
  const prevItem = currentFlatIdx > 0 ? allPages[currentFlatIdx - 1] : null;
  const nextItem =
    currentFlatIdx < allPages.length - 1 ? allPages[currentFlatIdx + 1] : null;

  const progressPct = Math.round(((currentFlatIdx + 1) / allPages.length) * 100);

  const navigate = (item: NavItem) => {
    router.push(`/module/${params.slug}/${item.lessonId}/${item.page.pageNumber}`);
    setSidebarOpen(false);
  };

  // Alt+←/→ page navigation (Alt modifier avoids clashing with the code editor)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      if (e.key === "ArrowRight" && nextItem) {
        e.preventDefault();
        navigate(nextItem);
      } else if (e.key === "ArrowLeft" && prevItem) {
        e.preventDefault();
        navigate(prevItem);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFlatIdx]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]" style={{ paddingTop: "64px" }}>

      {/* ─── Left Sidebar: Lesson Nav ──────────────────────── */}
      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative top-16 md:top-0 left-0 bottom-0 z-40
          w-72 bg-[#0d0d14] border-r border-white/8 flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ height: "calc(100vh - 64px)" }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ModuleIcon slug={mod.slug} size="w-9 h-9" iconSize="w-4 h-4" className="rounded-xl flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Module</p>
              <p className="text-sm font-semibold text-white leading-tight">{mod.title}</p>
            </div>
          </div>
          <button
            className="md:hidden p-1.5 text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-4 py-3 border-b border-white/8 flex-shrink-0">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Progress</span>
            <span className="text-violet-400 font-medium">{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full progress-bar-inner rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            {currentFlatIdx + 1} / {allPages.length} pages
          </p>
        </div>

        {/* Lesson list */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {mod.lessons.map((l) => {
            const isCurrentLesson = l.id === params.lessonId;
            return (
              <div key={l.id}>
                {/* Lesson group header */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-1
                  ${isCurrentLesson ? "bg-violet-600/10" : ""}`}>
                  <BookOpen className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrentLesson ? "text-violet-400" : "text-slate-400"}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wide
                    ${isCurrentLesson ? "text-violet-400" : "text-slate-400"}`}>
                    Lesson {l.lessonNumber}: {l.title}
                  </span>
                </div>

                {/* Pages */}
                {l.pages.map((pg) => {
                  const isActive =
                    l.id === params.lessonId && pg.pageNumber === pageNumber;
                  const isBefore =
                    allPages.findIndex(
                      (n) => n.lessonId === l.id && n.page.pageNumber === pg.pageNumber
                    ) < currentFlatIdx;

                  return (
                    <button
                      key={pg.pageNumber}
                      onClick={() => navigate({ lessonId: l.id, lessonTitle: l.title, page: pg })}
                      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                        transition-colors duration-150 mb-0.5 border
                        ${isActive
                          ? "border-violet-500/30"
                          : "border-transparent hover:bg-white/5"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="lessonActiveIndicator"
                          className="absolute inset-0 -z-10 rounded-lg bg-violet-600/20"
                          transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {isBefore ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : isActive ? (
                        <div className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                      <span
                        className={`text-xs leading-tight ${
                          isActive
                            ? "text-white font-semibold"
                            : isBefore
                            ? "text-slate-400"
                            : "text-slate-400"
                        }`}
                      >
                        {pg.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-white/8 flex-shrink-0">
          <Link
            href={`/module/${params.slug}`}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Module Overview
          </Link>
        </div>
      </aside>

      {/* ─── Main Content: Split View ──────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d14] border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              className="md:hidden p-1.5 text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                <Home className="w-3.5 h-3.5" />
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/module/${params.slug}`} className="hover:text-white transition-colors">
                {mod.title}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-300 font-medium truncate max-w-32 sm:max-w-none">
                {currentPage.title}
              </span>
            </nav>
          </div>

          {/* Page indicator + keyboard hint + progress ring */}
          <div className="flex items-center gap-3 text-xs text-slate-400 flex-shrink-0">
            <span className="hidden lg:flex items-center gap-1 text-[10px] text-slate-500">
              <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono">Alt</kbd>
              +
              <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono">←/→</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">Page</span>
              <span className="text-white font-semibold">{currentFlatIdx + 1}</span>
              <span>/</span>
              <span>{allPages.length}</span>
            </span>
            {/* Module progress ring */}
            <span className="relative w-7 h-7" title={`${progressPct}% of module complete`}>
              <svg viewBox="0 0 28 28" className="w-7 h-7 -rotate-90">
                <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                <motion.circle
                  cx="14"
                  cy="14"
                  r="11"
                  fill="none"
                  stroke="url(#lessonRingGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 11}
                  initial={false}
                  animate={{ strokeDashoffset: 2 * Math.PI * 11 * (1 - progressPct / 100) }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="lessonRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-violet-300">
                {progressPct}
              </span>
            </span>
          </div>
        </div>

        {/* Split pane */}
        <div className="relative flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

          {/* ── Ambient accent layer ── */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.05]">
            <div className="absolute -top-1/3 -left-1/4 w-[600px] h-[600px] bg-violet-500 rounded-full blur-[150px] animate-blob" />
            <div className="absolute -bottom-1/3 -right-1/4 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[150px] animate-blob" style={{ animationDelay: "9s" }} />
          </div>

          {/* ── Left: Lesson Content ── */}
          <div className="relative z-10 lg:w-1/2 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-white/8">

            {/* Reading progress bar */}
            <div className="h-[3px] w-full bg-white/5 flex-shrink-0 overflow-hidden">
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 shadow-[0_0_10px_rgba(139,92,246,0.7)]"
                style={{ scaleX: readingProgress }}
              />
            </div>

            <div ref={contentRef} className="flex-1 overflow-y-auto p-5 sm:p-8" onScroll={handleContentScroll}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${params.lessonId}-${pageNumber}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  {/* Lesson / page heading */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-xs text-violet-400 font-semibold uppercase tracking-wide mb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      {lesson.title} · Page {pageNumber} of {lesson.pages.length}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {currentPage.title}
                    </h1>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-slate-400">
                        <Clock className="w-3 h-3" /> {lesson.duration}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-medium
                        ${lesson.difficulty === "Beginner" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" :
                          lesson.difficulty === "Intermediate" ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" :
                          "text-violet-400 bg-violet-400/10 border-violet-400/20"}`}>
                        <BarChart3 className="w-3 h-3" /> {lesson.difficulty}
                      </span>
                    </div>
                    <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
                  </div>

                  {/* Markdown content */}
                  <div className="lesson-prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {currentPage.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Prev / Next navigation ── */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-t border-white/8 bg-[#0d0d14]">
              {prevItem ? (
                <button
                  onClick={() => navigate(prevItem)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                    glass text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline max-w-32 truncate">{prevItem.page.title}</span>
                  <span className="sm:hidden">Prev</span>
                </button>
              ) : (
                <Link
                  href={`/module/${params.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                    glass text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Overview
                </Link>
              )}

              {/* Page dots */}
              <div className="flex items-center gap-1.5">
                {lesson.pages.map((pg) => (
                  <button
                    key={pg.pageNumber}
                    onClick={() =>
                      navigate({ lessonId: lesson.id, lessonTitle: lesson.title, page: pg })
                    }
                    className={`rounded-full transition-all duration-200 ${
                      pg.pageNumber === pageNumber
                        ? "w-6 h-2.5 bg-violet-500"
                        : "w-2.5 h-2.5 bg-white/15 hover:bg-white/30"
                    }`}
                    title={pg.title}
                  />
                ))}
              </div>

              {nextItem ? (
                <button
                  onClick={() => navigate(nextItem)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white
                    bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-shimmer
                    hover:shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-shadow glow-violet"
                >
                  <span className="hidden sm:inline max-w-32 truncate">{nextItem.page.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={`/module/${params.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold
                    bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Module Done!</span>
                  <span className="sm:hidden">Done</span>
                </Link>
              )}
            </div>
          </div>

          {/* ── Right: Code Editor ── */}
          <div className="relative z-10 lg:w-1/2 flex flex-col min-h-0 p-2" style={{ minHeight: "50vh" }}>
            <div className="code-frame-glow flex-1 min-h-0 rounded-xl">
              <CodePlayground
                key={`${params.lessonId}-${pageNumber}`}
                starterCode={currentPage.starterCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
