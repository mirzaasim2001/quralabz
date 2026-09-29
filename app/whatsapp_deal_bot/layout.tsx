import type { Metadata, Viewport } from "next";

// Hidden test route: no nav link, excluded from app/sitemap.ts, and noindex
// here so it stays out of Google/AdSense crawls while the site is under
// review. Keep this metadata block if this route is ever extended.
export const metadata: Metadata = {
  title: "Internal Test",
  robots: { index: false, follow: false },
};

// Phone-first chat: safe-area insets for notched screens, and on Android the keyboard resizes the page
// instead of covering the input bar.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#0a0a0f",
};

export default function WhatsappDealBotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
