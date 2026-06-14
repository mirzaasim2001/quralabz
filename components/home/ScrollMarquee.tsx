"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

const PHRASE = "PYTHON · PANDAS · NUMPY · VISUALIZATION · MACHINE LEARNING · DEEP LEARNING · ";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Giant outline text that drifts sideways continuously and accelerates /
 * reverses with scroll velocity — the page literally moves with you.
 */
export default function ScrollMarquee({ baseVelocity = -1.2 }: { baseVelocity?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const baseX = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], {
    clamp: false,
  });

  const directionRef = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || !inView) return;
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      className="relative z-10 py-4 sm:py-6 overflow-hidden select-none"
    >
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="text-5xl sm:text-7xl font-black tracking-tight pr-6
              text-transparent [-webkit-text-stroke:1px_rgba(139,92,246,0.35)]"
          >
            {PHRASE}
          </span>
        ))}
      </motion.div>
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent" />
    </div>
  );
}
