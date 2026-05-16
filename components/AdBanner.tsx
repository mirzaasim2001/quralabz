"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  className?: string;
}

export default function AdBanner({ className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      const w = window as any;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch (e) {
      // silently ignore — ad blocker or not yet loaded
    }
  }, []);

  return (
    <div className={`w-full flex justify-center overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8931192509547294"
        data-ad-slot="5653311187"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
