import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { guides, getGuide } from "../guides";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return { title: "Guide Not Found | QuraLabz" };

  return {
    title: `${guide.title} | QuraLabz Guides`,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.published,
    },
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All guides
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">{guide.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-violet-400" /> QuraLabz Guide
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {guide.readTime} read
            </span>
            <time dateTime={guide.published}>
              {new Date(guide.published).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="mt-6 h-0.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
        </header>

        {/* Body */}
        <div className="guide-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: (props) => (
                <h2 className="text-2xl font-bold text-white mt-10 mb-4" {...props} />
              ),
              h3: (props) => (
                <h3 className="text-xl font-semibold text-white mt-8 mb-3" {...props} />
              ),
              p: (props) => (
                <p className="text-slate-300 leading-relaxed mb-4" {...props} />
              ),
              ul: (props) => (
                <ul className="list-disc list-outside pl-5 text-slate-300 mb-4 space-y-1.5" {...props} />
              ),
              ol: (props) => (
                <ol className="list-decimal list-outside pl-5 text-slate-300 mb-4 space-y-1.5" {...props} />
              ),
              li: (props) => <li className="leading-relaxed" {...props} />,
              strong: (props) => <strong className="font-bold text-white" {...props} />,
              em: (props) => <em className="italic" {...props} />,
              a: ({ href, ...props }) => (
                <Link
                  href={href ?? "#"}
                  className="text-cyan-400 underline hover:text-cyan-300"
                  {...props}
                />
              ),
              blockquote: (props) => (
                <blockquote
                  className="border-l-2 border-violet-500/60 pl-4 my-5 text-slate-300 [&_p]:mb-2"
                  {...props}
                />
              ),
              code: ({ className, children, ...props }) => {
                const isBlock = /language-/.test(className ?? "");
                return isBlock ? (
                  <code className={`${className} text-[13px]`} {...props}>
                    {children}
                  </code>
                ) : (
                  <code
                    className="bg-slate-800/80 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[13px]"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: (props) => (
                <pre
                  className="bg-[#0d0d14] border border-white/8 p-4 rounded-xl mb-5 overflow-x-auto font-mono leading-relaxed text-slate-200"
                  {...props}
                />
              ),
            }}
          >
            {guide.content}
          </ReactMarkdown>
        </div>

        {/* Footer nav */}
        <footer className="mt-14 pt-8 border-t border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">Keep reading</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {guides
              .filter((g) => g.slug !== guide.slug)
              .slice(0, 2)
              .map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="block p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-violet-500/30 transition-colors"
                >
                  <h3 className="font-semibold text-white mb-1 leading-snug">{g.title}</h3>
                  <span className="text-xs text-slate-400">{g.readTime} read</span>
                </Link>
              ))}
          </div>
        </footer>
      </article>
    </div>
  );
}
