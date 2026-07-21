import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { guides } from "./guides";

export const metadata: Metadata = {
  title: "Data Science Guides — Long-Form Tutorials | QuraLabz",
  description:
    "In-depth, original guides on Pandas, NumPy, machine learning, and learning data science itself. Written to be understood, paired with interactive lessons.",
  keywords: [
    "data science guide",
    "pandas groupby tutorial",
    "numpy broadcasting explained",
    "first machine learning model",
    "learn data science roadmap",
  ],
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "QuraLabz Guides — Deep Dives in Data Science",
    description: "Long-form tutorials on Pandas, NumPy, ML, and learning the field itself.",
    type: "website",
  },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Guides
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Deep dives, written to be <span className="gradient-text">understood</span>
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Long-form guides on the ideas that trip people up — each one pairs
            with an interactive module where you run the code yourself.
          </p>
        </div>

        <div className="space-y-6">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group block p-7 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-violet-400" /> Guide
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {g.readTime} read
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                {g.title}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">{g.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400">
                Read the guide
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
