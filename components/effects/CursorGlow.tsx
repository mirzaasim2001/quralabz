"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Desktop-only spotlight that trails the cursor with a soft spring.
 * Purely decorative — pointer-events disabled so it never intercepts clicks.
 */
export default function CursorGlow() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { damping: 28, stiffness: 180, mass: 0.6 });
  const springY = useSpring(y, { damping: 28, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion, x, y]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="hidden md:block fixed z-[2] pointer-events-none w-[520px] h-[520px] rounded-full"
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(139,92,246,0.16) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
