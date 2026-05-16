"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  className?: string;
  compact?: boolean;
}

export default function AdBanner({ slot = "5653311187", className = "", compact = false }: AdBannerProps) {
  useEffect(() => {
    const initAd = () => {
      try {
        const w = window as any;
        if (typeof window !== "undefined" && w.adsbygoogle) {
          (w.adsbygoogle = w.adsbygoogle || []).push({});
        } else {
          setTimeout(initAd, 500);
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    };

    initAd();
  }, []);

  return (
    <div
      style={{ width: "100%", height: "90px", overflow: "hidden" }}
      className={className}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "90px",
        }}
        data-ad-client="ca-pub-8931192509547294"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
