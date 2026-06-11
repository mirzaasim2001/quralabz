"use client";

import { useEffect } from "react";

const SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8931192509547294";

/**
 * Injects the AdSense loader on browser idle — keeps it off the critical
 * path (like next/script lazyOnload) but produces a clean <script> tag
 * without the data-nscript attribute AdSense warns about.
 */
export default function AdSenseLoader() {
  useEffect(() => {
    if (document.querySelector(`script[src^="${SRC.split("?")[0]}"]`)) return;

    const inject = () => {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    };

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(inject, { timeout: 4000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = setTimeout(inject, 2500);
    return () => clearTimeout(t);
  }, []);

  return null;
}
