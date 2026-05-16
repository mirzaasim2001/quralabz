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

  useEffect(() => {
    if (pushed.current) return;

    const initAd = () => {
      try {
        const w = window as any;
        if (typeof window !== "undefined" && w.adsbygoogle) {
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
