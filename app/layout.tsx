import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8931192509547294"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      <body className="bg-[#0a0a0f] text-white antialiased flex flex-col min-h-screen">
        <ErrorBoundary>
          <Navbar />
          <main className="pt-16 flex-grow">{children}</main>
          <Footer />

          {/* ═══════════════════════════════════════════════════════
              ADSENSE PLACEMENT: Bottom Sticky Banner
              Replace this div with your AdSense <ins> tag.
              Dimensions: 728×90 (leaderboard) on desktop,
                          320×50 (mobile banner) on mobile.
          ═══════════════════════════════════════════════════════ */}
          <div
            id="adsense-bottom-sticky"
            aria-label="Advertisement"
            className="fixed bottom-0 left-0 right-0 z-40 flex justify-center
              bg-[#0a0a0f]/80 backdrop-blur-md border-t border-white/8 py-1
              md:hidden"
            style={{ minHeight: "52px" }}
          >
            {/* INSERT MOBILE ADSENSE TAG HERE */}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
