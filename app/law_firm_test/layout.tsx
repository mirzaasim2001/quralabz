import type { Metadata } from "next";

// Hidden test route: no nav link, excluded from app/sitemap.ts, and noindex
// here so it stays out of Google/AdSense crawls while the site is under
// review. Keep this metadata block if this route is ever extended.
export const metadata: Metadata = {
  title: "Internal Test",
  robots: { index: false, follow: false },
};

export default function LawFirmTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
