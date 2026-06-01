import type { MetadataRoute } from "next";
import { modules } from "@/data/lessons";

const BASE_URL = "https://quralabz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ──────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          changeFrequency: "weekly",  priority: 1.0, lastModified: now },
    { url: `${BASE_URL}/about`,               changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/contact`,             changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/privacy-policy`,      changeFrequency: "yearly",  priority: 0.5, lastModified: now },
    { url: `${BASE_URL}/terms`,               changeFrequency: "yearly",  priority: 0.5, lastModified: now },
  ];

  // ── Module overview pages ─────────────────────────────────
  const modulePages: MetadataRoute.Sitemap = modules.map((mod) => ({
    url: `${BASE_URL}/module/${mod.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: now,
  }));

  // ── Individual lesson pages ───────────────────────────────
  // Each lesson has multiple pages — all pre-rendered via generateStaticParams
  const lessonPages: MetadataRoute.Sitemap = modules.flatMap((mod) =>
    mod.lessons.flatMap((lesson) =>
      lesson.pages.map((page) => ({
        url: `${BASE_URL}/module/${mod.slug}/${lesson.id}/${page.pageNumber}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        lastModified: now,
      }))
    )
  );

  return [...staticPages, ...modulePages, ...lessonPages];
}
