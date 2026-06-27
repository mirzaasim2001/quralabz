import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Code2, BookOpen, BarChart3, ChevronRight } from "lucide-react";
import { modules } from "@/data/lessons";
import ModuleIcon from "@/components/ModuleIcon";
import ParallaxOrbs from "@/components/effects/ParallaxOrbs";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import HeroSection from "@/components/home/HeroSection";
import ScrollMarquee from "@/components/home/ScrollMarquee";
import LessonStoryScroll from "@/components/home/LessonStoryScroll";
import CodeExperienceSection from "@/components/home/CodeExperienceSection";
import ArcadeTeaser from "@/components/home/ArcadeTeaser";
import CurriculumTimeline from "@/components/home/CurriculumTimeline";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ParticleNetworkWrapper = dynamic(() => import("@/components/effects/ParticleNetworkWrapper"), { ssr: false });
const ModuleLessonSearch = dynamic(() => import("@/components/ModuleLessonSearch"), { ssr: false });
const AdBanner = dynamic(() => import("@/components/AdBanner"), { ssr: false });

export default function HomePage() {
  const lessonCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  // Lightweight projection so the full lesson content never reaches the client bundle.
  const timelineModules = modules.map((m) => ({
    slug: m.slug,
    title: m.title,
    level: m.level,
    lessonCount: m.lessons.length,
    duration: m.totalDuration,
    sampleLessons: m.lessons.slice(0, 3).map((l) => l.title),
  }));

  // overflow-x-clip (NOT overflow-hidden) — hidden would break position:sticky
  // for the pinned story section; clip crops horizontal overflow without
  // creating a scroll container.
  return (
    <div className="min-h-screen overflow-x-clip relative">
      {/* ── Interactive Data Network Background ────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <ParticleNetworkWrapper />
      </div>

      {/* ── Floating Orbs (scroll parallax) ─────────────── */}
      <ParallaxOrbs />

      {/* ═══ ADSENSE: Top Banner (728×90 / 320×100) ═══
          min-h reserves the slot so the banner doesn't shift the hero (CLS). */}
      <div className="relative z-10">
        <div
          role="region"
          aria-label="Advertisement"
          className="w-full min-h-[90px] bg-[#0d0d14]/80 backdrop-blur-sm border-b border-white/5"
        >
          <AdBanner />
        </div>
      </div>

      {/* ── Hero: scroll-morphing text + live typing demo ── */}
      <HeroSection moduleCount={modules.length} lessonCount={lessonCount} />

      {/* ── Velocity marquee: text that moves as you scroll ── */}
      <ScrollMarquee />

      {/* ── Search Bar ─────────────────────────────────────── */}
      <div className="w-full flex justify-center mb-4 z-10 relative">
        <ModuleLessonSearch />
      </div>

      {/* ── Pinned storytelling: textbook → layman → code → output ── */}
      <LessonStoryScroll />

      {/* ── Sticky code experience: the core product ── */}
      <CodeExperienceSection />

      {/* ── Code Arcade teaser: the gamified USP ── */}
      <ArcadeTeaser />

      {/* ═══ ADSENSE: After lesson showcase (728×90) ═══ */}
      <div role="region" aria-label="Advertisement" className="w-full min-h-[90px] py-2 relative z-10">
        <AdBanner />
      </div>

      {/* ── Curriculum journey timeline ── */}
      <CurriculumTimeline modules={timelineModules} />

      {/* ═══ ADSENSE: Between modules (728×90) ═══ */}
      <div role="region" aria-label="Advertisement" className="w-full min-h-[90px] py-2 relative z-10">
        <AdBanner />
      </div>

      {/* ── Module Cards (full catalog) ────────────────────── */}
      <section className="relative z-10 px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Choose Your Path
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Structured modules with interactive exercises and instant feedback.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((mod, idx) => (
            <Reveal key={mod.id} delay={(idx % 3) * 0.1} className="h-full">
              <TiltCard className="rounded-3xl h-full">
                <Link
                  href={`/module/${mod.slug}`}
                  className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-[#0d0d14] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10 hover:border-white/10"
                >
                  {/* Animated Hover Border Gradient */}
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-violet-600/0 via-cyan-500/0 to-violet-600/0 group-hover:via-cyan-500/50 transition-all duration-500 -z-10 opacity-0 group-hover:opacity-100" />

                  {/* Hero image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={mod.heroImage}
                      alt={mod.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-70"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-40 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/50 to-transparent" />

                    {/* Hover Scan Line */}
                    <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />

                    <ModuleIcon
                      slug={mod.slug}
                      withGlow
                      className="absolute top-5 left-5 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-5 right-5 flex items-center gap-2">
                      <span className="hidden group-hover:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm animate-pulse">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                        LIVE ENV
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm
                        ${mod.level === "Beginner" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20" :
                          mod.level === "Intermediate" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/20" :
                          "bg-violet-500/20 text-violet-300 border border-violet-500/20"}`}>
                        {mod.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                      {mod.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                      {mod.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono border-b border-white/5 pb-6">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {mod.lessons.length} lessons
                      </span>
                      <span className="bg-white/5 px-2 py-1 rounded">{mod.totalDuration}</span>
                    </div>

                    {/* Lesson list preview */}
                    <ul className="space-y-2.5 mb-8">
                      {mod.lessons.slice(0, 3).map((lesson) => (
                        <li key={lesson.id} className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                          <ChevronRight className="w-4 h-4 text-violet-500 flex-shrink-0" />
                          {lesson.title}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-sm font-bold text-violet-400 group-hover:text-cyan-400 transition-colors duration-300">
                      Start Module
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Features Strip ─────────────────────────────────── */}
      <section className="relative z-10 px-4 sm:px-6 py-16 bg-[#0d0d14]/80 backdrop-blur-sm border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: <Code2 className="w-8 h-8 text-violet-400" />,
              title: "Zero Setup Execution",
              body: "Powered by Pyodide (WebAssembly). Your code runs 100% locally in your browser.",
            },
            {
              icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
              title: "Instant Visuals",
              body: "Matplotlib & Seaborn plots render inline as crisp images. No Jupyter needed.",
            },
            {
              icon: <BookOpen className="w-8 h-8 text-emerald-400" />,
              title: "Bite-Sized Mastery",
              body: "Complex concepts broken into interactive pages with ready-to-run examples.",
            },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group flex flex-col items-center gap-5 p-6 rounded-3xl transition-all duration-300 hover:bg-white/5">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-violet-500/30 group-hover:bg-violet-500/10 transition-all duration-300 shadow-lg shadow-black/20">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Articles / Blog Section ────────────────────────── */}
      <section className="relative z-10 px-4 sm:px-6 py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
                Learning Guides
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Start Here If You&apos;re New
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto text-base">
                Not sure where to begin? These guides give you the context to learn smarter — not harder.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                tag: "Python",
                tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
                title: "Beginner Python Guide: Your First Step into Data Science",
                body: "Python is the world's most popular language for data science — and for good reason. Unlike C++ or Java, Python reads almost like plain English, which means you spend less time fighting syntax and more time solving real problems.\n\nWhen you write x = 5 in Python, you've just created a variable. When you write for item in my_list, you're looping over data. The simplicity is intentional — Python was designed to be human-first.\n\nHere's what you actually learn in a Python data science journey: variables and data types (integers, strings, lists, dictionaries), control flow (if/else, for loops, while loops), functions to reuse logic, and then the powerful libraries — NumPy for numbers, Pandas for tables, and Matplotlib for charts.\n\nThe mistake most beginners make is learning Python in isolation — doing exercises that print 'Hello World' but never touching real data. The right approach is to learn Python and data manipulation together, which is exactly how QuraLabz is structured. Every concept is immediately applied to data problems, not toy examples.",
                icon: "🐍",
              },
              {
                tag: "Machine Learning",
                tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
                title: "What is Machine Learning? (Plain English, No Math Required)",
                body: "Machine learning is not magic — it is pattern recognition at scale. Here is the core idea: instead of a programmer writing rules like 'if the email contains the word FREE and has more than 3 exclamation marks, mark it as spam', you show the computer 10,000 examples of spam and 10,000 examples of normal emails, and it figures out the rules itself.\n\nThat process of figuring out the rules is called training. The result — the set of learned rules — is called a model. When you later give the model a new email it has never seen, it applies those rules to make a prediction. That is inference.\n\nThere are three main types of machine learning. Supervised learning is where you have labeled examples (spam / not spam, house price, patient diagnosis). Unsupervised learning is where you have data but no labels, and the model finds hidden structure — like grouping customers by buying behavior. Reinforcement learning is where an agent learns by trial and error, like a game-playing AI.\n\nThe reason ML has exploded is compute: the same algorithms that existed in the 1990s now run on GPUs that are 1000x faster, with internet-scale datasets. The math hasn't changed — the hardware has.",
                icon: "🤖",
              },
              {
                tag: "Career",
                tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                title: "Data Science Roadmap 2026: From Zero to Job-Ready",
                body: "The data science field looks overwhelming from the outside — there are dozens of tools, languages, and frameworks all competing for your attention. But hiring managers care about a surprisingly small core skill set, and if you master it, everything else follows.\n\nHere is the honest roadmap: Start with Python (2–4 weeks). Not all of Python — just enough to manipulate data: lists, dictionaries, loops, functions, and basic file I/O. Next, learn NumPy and Pandas (3–4 weeks). These two libraries are how 90% of real data work gets done. Then learn visualization with Matplotlib and Seaborn (1–2 weeks) — because a chart communicates what a table cannot.\n\nAfter that foundation, learn the statistics you actually need: mean, median, standard deviation, correlation, and basic probability. Then move into machine learning with scikit-learn — linear regression, decision trees, random forests, and cross-validation.\n\nThe most important step most people skip: build 2–3 projects on real datasets. Kaggle, UCI Machine Learning Repository, and government open data portals are free sources. A GitHub portfolio with 3 solid projects beats a certificate from any course platform.\n\nIn 2026, knowing how to prompt LLMs and integrate AI APIs is also a differentiator — which is why QuraLabz includes Generative AI and Agentic AI modules.",
                icon: "🗺️",
              },
            ].map((article, i) => (
              <Reveal key={i} delay={i * 0.12} className="h-full">
                <div className="group relative flex flex-col gap-5 p-7 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300 shadow-xl shadow-black/20 h-full">
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${article.tagColor}`}>
                      {article.tag}
                    </span>
                    <span className="text-2xl">{article.icon}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-violet-200 transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed flex-1 whitespace-pre-line">
                    {article.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADSENSE: Footer Leaderboard (970×90 / 728×90) ═══ */}
      <div
        role="region"
        aria-label="Advertisement"
        className="w-full py-6 bg-[#0a0a0f] relative z-10"
      >
        <AdBanner />
      </div>
    </div>
  );
}
