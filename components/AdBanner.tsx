"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  className?: string;
}

export default function AdBanner({ slot = "5653311187", className = "" }: AdBannerProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const w = window as any;
        if (w.adsbygoogle) {
          (w.adsbygoogle = w.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: "250px", width: "100%", textAlign: "center" }} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8931192509547294"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
