"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Search, BookOpen, Zap } from "lucide-react";
import { modules } from "../data/lessons";

export default function ModuleLessonSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const inputWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const allLessons = useMemo(() =>
    modules.flatMap((mod) =>
      mod.lessons.map((lesson) => ({
        moduleTitle: mod.title,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        slug: mod.slug,
      }))
    ), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return [
      ...modules
        .filter((mod) => mod.title.toLowerCase().includes(q))
        .slice(0, 3)
        .map((mod) => ({ type: "module" as const, id: mod.id, title: mod.title, slug: mod.slug, sub: "" })),
      ...allLessons
        .filter((l) => l.lessonTitle.toLowerCase().includes(q))
        .slice(0, 5)
        .map((l) => ({ type: "lesson" as const, id: l.lessonId, title: l.lessonTitle, slug: l.slug, sub: l.moduleTitle })),
    ];
  }, [query, allLessons]);

  const updateRect = useCallback(() => {
    if (inputWrapRef.current) setRect(inputWrapRef.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (!open) return;
    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [open, updateRect]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const target = e.target as Node;
      const dropdown = document.getElementById("mls-dropdown");
      if (
        inputWrapRef.current && !inputWrapRef.current.contains(target) &&
        (!dropdown || !dropdown.contains(target))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const showDropdown = open && results.length > 0 && !!rect;
  const showEmpty = open && !!query.trim() && results.length === 0 && !!rect;

  const dropdown = mounted && rect && (showDropdown || showEmpty) ? createPortal(
    <div
      id="mls-dropdown"
      style={{
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
        zIndex: 99999,
        maxHeight: 240,
        overflowY: "auto",
      }}
      className="bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl shadow-violet-500/10"
    >
      {showDropdown && (
        <div>
          {results.filter((r) => r.type === "module").map((item) => (
            <a
              key={`m-${item.id}`}
              href={`/module/${item.slug}`}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
                window.location.href = `/module/${item.slug}`;
              }}
              className="flex items-start gap-3 px-5 py-3 hover:bg-cyan-500/10 border-b border-white/5 last:border-b-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-cyan-300 font-semibold text-sm truncate">{item.title}</p>
                <p className="text-xs text-slate-500">Module</p>
              </div>
            </a>
          ))}
          {results.filter((r) => r.type === "lesson").map((item) => (
            <a
              key={`l-${item.id}`}
              href={`/module/${item.slug}/${item.id}/1`}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
                window.location.href = `/module/${item.slug}/${item.id}/1`;
              }}
              className="flex items-start gap-3 px-5 py-3 hover:bg-violet-500/10 border-b border-white/5 last:border-b-0 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-violet-400 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-violet-300 font-semibold text-sm truncate">{item.title}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            </a>
          ))}
        </div>
      )}
      {showEmpty && (
        <div className="px-5 py-6 text-center">
          <p className="text-slate-400 text-sm">No results for <span className="text-white font-semibold">"{query}"</span></p>
          <p className="text-slate-500 text-xs mt-1">Try a module name or lesson topic</p>
        </div>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div ref={inputWrapRef} className="relative w-full max-w-2xl mx-auto px-4">
        {open && (
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 via-violet-500/50 to-cyan-500/50 rounded-2xl blur opacity-75 animate-pulse pointer-events-none" />
        )}
        <div className="relative flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/25 focus-within:border-white/40 focus-within:bg-white/20">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0 pointer-events-none" />
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-base font-medium"
            placeholder="Find modules, lessons, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { setOpen(true); updateRect(); }}
            aria-label="Search modules or lessons"
          />
          {query && (
            <button
              onMouseDown={(e) => { e.preventDefault(); setQuery(""); }}
              className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
            >
              ?
            </button>
          )}
        </div>
      </div>
      {dropdown}
    </>
  );
}
