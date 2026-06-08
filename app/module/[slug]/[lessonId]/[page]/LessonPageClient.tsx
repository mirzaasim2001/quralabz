"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type Module, type Lesson, type LessonPage } from "@/data/lessons";
import CodePlayground from "@/components/CodePlayground";
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

  const pageNumber = parseInt(params.page, 10);

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
          <div className="flex items-center gap-2">
            <span className="text-xl">{mod.icon}</span>
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                        transition-all duration-150 mb-0.5
                        ${isActive
                          ? "bg-violet-600/20 border border-violet-500/30"
                          : "hover:bg-white/5"
                        }`}
                    >
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

          {/* Page indicator */}
          <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
            <span className="hidden sm:inline">Page</span>
            <span className="text-white font-semibold">{currentFlatIdx + 1}</span>
            <span>/</span>
            <span>{allPages.length}</span>
          </div>
        </div>

        {/* Split pane */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

          {/* ── Left: Lesson Content ── */}
          <div className="lg:w-1/2 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-white/8">

            <div className="flex-1 overflow-y-auto p-5 sm:p-8">
              {/* Lesson / page heading */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-violet-400 font-semibold uppercase tracking-wide mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  {lesson.title} · Page {pageNumber} of {lesson.pages.length}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {currentPage.title}
                </h1>
                <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
              </div>

              {/* Markdown content */}
              <div className="lesson-prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentPage.content}
                </ReactMarkdown>
              </div>
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
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold
                    bg-violet-600 hover:bg-violet-500 text-white transition-all glow-violet"
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
          <div className="lg:w-1/2 flex flex-col min-h-0" style={{ minHeight: "50vh" }}>
            <CodePlayground
              key={`${params.lessonId}-${pageNumber}`}
              starterCode={currentPage.starterCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
