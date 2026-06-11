"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slot?: string;
  className?: string;
  compact?: boolean;
}

export default function AdBanner({ slot = "5653311187", className = "" }: AdBannerProps) {
  const [visible, setVisible] = useState(false);
  const pushed = useRef(false);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (pushed.current) return;
    let cancelled = false;

    const initAd = () => {
      if (cancelled) return;
      try {
        const w = window as any;
        if (typeof window !== "undefined" && w.adsbygoogle) {
          // Skip if AdSense already filled this <ins> (remounts / fast refresh)
          // — pushing again throws "all ins elements already have ads".
          if (insRef.current?.getAttribute("data-adsbygoogle-status")) {
            pushed.current = true;
            setVisible(true);
            return;
          }
          (w.adsbygoogle = w.adsbygoogle || []).push({});
          pushed.current = true;
          setVisible(true);
        } else {
          setTimeout(initAd, 500);
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    };

    initAd();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: visible ? "90px" : "0px",
        overflow: "hidden",
        transition: "height 0.2s ease",
      }}
      className={className}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "90px" }}
        data-ad-client="ca-pub-8931192509547294"
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}
