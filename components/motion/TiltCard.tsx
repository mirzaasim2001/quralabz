"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Wraps a card with a subtle cursor-tracking 3D tilt + moving glare.
 * Pass the same border-radius classes via `className` so the glare
 * (rounded-[inherit]) clips correctly.
 */
export default function TiltCard({ children, className = "", maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 200, damping: 22 });
  const springY = useSpring(py, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(springX, [0, 1], ["-20%", "120%"]);
  const glareY = useTransform(springY, [0, 1], ["-20%", "120%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-20">
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-white/[0.08] blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ left: glareX, top: glareY }}
        />
      </div>
      {children}
    </motion.div>
  );
}
