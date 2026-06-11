import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/data/lessons";
import { ChevronRight, CheckCircle2, Lock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import LessonList from "./LessonList";
import ModuleHero from "./ModuleHero";
import Reveal from "@/components/motion/Reveal";
import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("@/components/AdBanner"), { ssr: false });

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
    <div className="min-h-screen relative">

      {/* ═══════════════════════════════════════════════════════
          ADSENSE PLACEMENT: Module Hero Banner (below nav)
          Size: 728×90 leaderboard / 320×100 mobile
      ═══════════════════════════════════════════════════════ */}
      <div
        aria-label="Advertisement"
        className="w-full bg-[#0d0d14] border-b border-white/5"
      >
        <AdBanner />
      </div>

      {/* ── Module Hero ───────────────────────────────────── */}
      <ModuleHero mod={mod} totalPages={totalPages} />

      {/* ── Curriculum ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Module Introduction */}
        {mod.introduction && (
          <Reveal>
          <div className="mb-10 pb-8 border-b border-white/10">
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
          </Reveal>
        )}

        <div className="flex gap-8">

          {/* Lesson list */}
          <div className="flex-1">
            <Reveal>
              <h2 className="text-2xl font-bold text-white mb-6">Curriculum</h2>
            </Reveal>
            <LessonList mod={mod} />
          </div>

          {/* ═══════════════════════════════════════════════════════
              ADSENSE PLACEMENT: Module Sidebar
              Size: 300×250 medium rectangle (desktop only)
              Position: Right sidebar on the module overview page.
          ═══════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <Reveal delay={0.1}>
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
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-slate-200 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            </Reveal>
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
