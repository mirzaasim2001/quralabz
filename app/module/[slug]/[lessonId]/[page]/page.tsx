import type { Metadata } from "next";
import Link from "next/link";
import { modules, getModuleBySlug, getLessonById } from "@/data/lessons";
import LessonPageClient from "./LessonPageClient";

interface Props {
  params: {
    slug: string;
    lessonId: string;
    page: string;
  };
}

// ── Pre-render every lesson page at build time (SSG) ──────────
export function generateStaticParams() {
  return modules.flatMap((mod) =>
    mod.lessons.flatMap((lesson) =>
      lesson.pages.map((page) => ({
        slug: mod.slug,
        lessonId: lesson.id,
        page: page.pageNumber.toString(),
      }))
    )
  );
}

// ── Per-page SEO metadata ──────────────────────────────────────
export function generateMetadata({ params }: Props): Metadata {
  const mod = getModuleBySlug(params.slug);
  if (!mod) return { title: "Lesson Not Found | QuraLabz" };

  const lesson = getLessonById(mod.id, params.lessonId);
  if (!lesson) return { title: "Lesson Not Found | QuraLabz" };

  const pageNumber = parseInt(params.page, 10);
  const currentPage = lesson.pages.find((p) => p.pageNumber === pageNumber);

  const pageTitle = currentPage?.title ?? lesson.title;

  return {
    title: `${pageTitle} — ${lesson.title} | ${mod.title} | QuraLabz`,
    description: lesson.description,
    keywords: [
      mod.title,
      lesson.title,
      "data science",
      "python",
      "interactive coding",
      "learn python online",
      "free data science course",
    ],
    openGraph: {
      title: `${pageTitle} | QuraLabz`,
      description: lesson.description,
      type: "article",
    },
  };
}

// ── Server Component: fetches data, renders content ───────────
export default function LessonPage({ params }: Props) {
  const mod = getModuleBySlug(params.slug);
  if (!mod) return <NotFound />;

  const lesson = getLessonById(mod.id, params.lessonId);
  if (!lesson) return <NotFound />;

  const pageNumber = parseInt(params.page, 10);
  const currentPage = lesson.pages.find((p) => p.pageNumber === pageNumber);
  if (!currentPage) return <NotFound />;

  return (
    <LessonPageClient
      mod={mod}
      lesson={lesson}
      currentPage={currentPage}
      params={params}
    />
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-white mb-2">Lesson Not Found</h1>
        <Link href="/" className="text-violet-400 hover:text-violet-300 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
