import { notFound } from "next/navigation";
import Link from "next/link";
import { getModuleBySlug } from "@/data/lessons";
import { BookOpen, Clock, ChevronRight, ArrowLeft, Play, CheckCircle2, Lock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import LessonList from "./LessonList";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return [
    { slug: "python" },
    { slug: "pandas" },
    { slug: "visualization" },
    { slug: "numpy" },
    { slug: "ml-basics" },
    { slug: "advanced-ml" },
    { slug: "deep-learning" },
    { slug: "generative-ai" },
    { slug: "agentic-ai" },
    { slug: "model-context-protocol" },
    { slug: "sliding-window-algorithms" },
    // Add more slugs here as you add modules
  ];
}

export default function ModulePage({ params }: Props) {
  const mod = getModuleBySlug(params.slug);
  if (!mod) notFound();

  const totalPages = mod.lessons.reduce((acc, l) => acc + l.pages.length, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* ═══════════════════════════════════════════════════════
          ADSENSE PLACEMENT: Module Hero Banner (below nav)
          Size: 728×90 leaderboard / 320×100 mobile
      ═══════════════════════════════════════════════════════ */}
      <div
        id={`adsense-module-${mod.slug}-top`}
        aria-label="Advertisement"
        className="w-full flex justify-center bg-[#0d0d14] border-b border-white/5"
        style={{ minHeight: "90px" }}
      >
        {/* INSERT ADSENSE TAG HERE */}
      </div>

      {/* ── Module Hero ───────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mod.heroImage}
          alt={mod.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0f]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Modules
          </Link>

          <div className="flex items-start gap-6">
            <div className="text-6xl hidden sm:block">{mod.icon}</div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                  ${mod.level === "Beginner" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20" :
                    mod.level === "Intermediate" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/20" :
                    "bg-violet-500/20 text-violet-300 border border-violet-500/20"}`}>
                  {mod.level}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {mod.totalDuration}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {mod.lessons.length} lessons · {totalPages} pages
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                {mod.title}
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                {mod.description}
              </p>

              <Link
                href={`/module/${mod.slug}/${mod.lessons[0].id}/1`}
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold
                  bg-violet-600 hover:bg-violet-500 text-white transition-all duration-150 shadow-lg glow-violet"
              >
                <Play className="w-5 h-5 fill-white" />
                Start Module
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Curriculum ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Module Introduction */}
        {mod.introduction && (
          <div className="mb-16 pb-12 border-b border-white/10">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: (props) => <h1 className="text-3xl font-bold text-white mb-4 mt-0" {...props} />,
                  h2: (props) => <h2 className="text-2xl font-bold text-white mb-3 mt-6" {...props} />,
                  h3: (props) => <h3 className="text-xl font-semibold text-white mb-2 mt-4" {...props} />,
                  p: (props) => <p className="text-slate-300 mb-3 leading-relaxed" {...props} />,
                  ul: (props) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1" {...props} />,
                  ol: (props) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1" {...props} />,
                  li: (props) => <li className="text-slate-300" {...props} />,
                  strong: (props) => <strong className="font-bold text-white" {...props} />,
                  em: (props) => <em className="italic text-slate-300" {...props} />,
                  code: (props) => <code className="bg-slate-900 px-2 py-1 rounded text-amber-300 font-mono text-sm" {...props} />,
                  pre: (props) => <pre className="bg-slate-900 p-4 rounded-lg mb-4 overflow-x-auto" {...props} />,
                  table: (props) => <table className="w-full border-collapse mb-4" {...props} />,
                  th: (props) => <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left font-semibold text-white" {...props} />,
                  td: (props) => <td className="border border-slate-700 px-4 py-2 text-slate-300" {...props} />,
                }}
              >
                {mod.introduction}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div className="flex gap-8">

          {/* Lesson list */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-6">Curriculum</h2>
            <LessonList mod={mod} />
          </div>

          {/* ═══════════════════════════════════════════════════════
              ADSENSE PLACEMENT: Module Sidebar
              Size: 300×250 medium rectangle (desktop only)
              Position: Right sidebar on the module overview page.
          ═══════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div
              id={`adsense-module-${mod.slug}-sidebar`}
              aria-label="Advertisement"
              className="glass rounded-xl flex items-center justify-center"
              style={{ minHeight: "250px", width: "300px" }}
            >
              {/* INSERT 300×250 ADSENSE TAG HERE */}
            </div>

            {/* Module stats */}
            <div className="glass rounded-xl p-5 mt-4 space-y-4">
              <h4 className="text-white font-semibold text-sm">Module Details</h4>
              {[
                { label: "Level", value: mod.level },
                { label: "Duration", value: mod.totalDuration },
                { label: "Lessons", value: `${mod.lessons.length}` },
                { label: "Interactive Pages", value: `${totalPages}` },
                { label: "Prerequisites", value: mod.id === "python-basics" ? "None" : "Python Basics" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-slate-200 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ADSENSE PLACEMENT: Module Page Footer Banner
          Size: 728×90 or 970×90
      ═══════════════════════════════════════════════════════ */}
      <div
        id={`adsense-module-${mod.slug}-footer`}
        aria-label="Advertisement"
        className="w-full flex justify-center py-4"
        style={{ minHeight: "90px" }}
      >
        {/* INSERT FOOTER ADSENSE TAG HERE */}
      </div>
    </div>
  );
}
