import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AdSenseLoader from "@/components/AdSenseLoader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import AuroraBackground from "@/components/effects/AuroraBackground";
import GrainOverlay from "@/components/effects/GrainOverlay";
import CursorGlow from "@/components/effects/CursorGlow";
import ScrollProgressBar from "@/components/effects/ScrollProgressBar";

export const metadata: Metadata = {
  title: "QuraLabz — Interactive Data Science",
  description:
    "Learn Python, Pandas, and Data Visualization interactively in your browser. Free, no sign-up required.",
  keywords: ["data science", "python", "pandas", "matplotlib", "learn", "interactive"],
  openGraph: {
    title: "QuraLabz",
    description: "Interactive Data Science Education Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress Pyodide-related errors that don't affect functionality
              const originalConsoleError = console.error;
              const originalConsoleWarn = console.warn;
              
              console.error = function(...args) {
                const msg = String(args[0] || '');
                // Suppress known Pyodide non-fatal errors
                if (
                  msg.includes("Node cannot be found") ||
                  msg.includes("Unexpected token '<'") ||
                  msg.includes("Unexpected token") ||
                  msg.includes("SyntaxError") ||
                  msg.includes("error-stack-parser") ||
                  msg.includes("CDN returned HTML")
                ) {
                  return; // Suppress
                }
                originalConsoleError.apply(console, args);
              };
              
              console.warn = function(...args) {
                const msg = String(args[0] || '');
                if (msg.includes("error-stack-parser") || msg.includes("Duplicate definition")) {
                  return; // Suppress
                }
                originalConsoleWarn.apply(console, args);
              };
              
              // Aggressive error suppression
              window.addEventListener('error', (e) => {
                const msg = e.message || '';
                const filename = e.filename || '';
                
                // Suppress Pyodide/CDN errors BEFORE they reach error boundary
                if (
                  msg.includes("Unexpected token '<'") ||
                  msg.includes("Unexpected token") ||
                  msg.includes("Node cannot be found") ||
                  msg.includes("SyntaxError") ||
                  filename.includes("pyodide") ||
                  filename.includes("cdn.jsdelivr") ||
                  filename.includes("unpkg.com")
                ) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                  return true;
                }
              }, { capture: true, passive: false });
              
              window.addEventListener('unhandledrejection', (e) => {
                const msg = String(e.reason || '');
                if (msg.includes("Node cannot be found") || msg.includes("Unexpected token") || msg.includes("CDN")) {
                  e.preventDefault();
                }
              }, { capture: true });
              
              // Override window.onerror to catch all errors
              window.onerror = function(msg, url, line, col, error) {
                if (
                  String(msg).includes("Unexpected token '<'") ||
                  String(msg).includes("Unexpected token") ||
                  String(msg).includes("Node cannot be found") ||
                  String(url).includes("pyodide") ||
                  String(url).includes("cdn.jsdelivr")
                ) {
                  return true; // Suppress
                }
                return false;
              };
            `,
          }}
        />
      </head>
      {/* relative: framer-motion useScroll(target) needs a positioned ancestor
          chain to compute scroll offsets (silences its console warning) */}
      <body className="relative bg-[#0a0a0f] text-white antialiased flex flex-col min-h-screen">
        <AuroraBackground />
        <GrainOverlay />
        <CursorGlow />
        <ScrollProgressBar />
        <ErrorBoundary>
          <Navbar />
          <main className="relative z-10 pt-16 flex-grow">{children}</main>
          <Footer />

          {/* ═══════════════════════════════════════════════════════
              ADSENSE PLACEMENT: Bottom Sticky Banner
              Replace this div with your AdSense <ins> tag.
              Dimensions: 728×90 (leaderboard) on desktop,
                          320×50 (mobile banner) on mobile.
          ═══════════════════════════════════════════════════════ */}
          <div
            id="adsense-bottom-sticky"
            role="region"
            aria-label="Advertisement"
            className="fixed bottom-0 left-0 right-0 z-40 flex justify-center
              bg-[#0a0a0f]/80 backdrop-blur-md border-t border-white/8 py-1
              md:hidden"
            style={{ minHeight: "52px" }}
          >
            {/* INSERT MOBILE ADSENSE TAG HERE */}
          </div>
        </ErrorBoundary>

        {/* AdSense loader — injected on browser idle (off the critical path).
            AdBanner polls window.adsbygoogle, so deferred loading is safe. */}
        <AdSenseLoader />
      </body>
    </html>
  );
}
