"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  suffix?: string;
}

/**
 * Counts up from 0 to `value` once it scrolls into view.
 */
export default function AnimatedCounter({ value, className, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.floor(latest)}${suffix}`;
    });
  }, [springValue, prefersReducedMotion, value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
