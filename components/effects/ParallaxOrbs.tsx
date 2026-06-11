"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * The two hero "floating orb" glows, made scroll-reactive: they drift
 * at different speeds/directions as the page scrolls, creating depth.
 */
export default function ParallaxOrbs() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const yOrb1 = useTransform(scrollY, [0, 1200], [0, 320]);
  const yOrb2 = useTransform(scrollY, [0, 1200], [0, -260]);
  const rotateOrb1 = useTransform(scrollY, [0, 1200], [0, 60]);
  const xOrb2 = useTransform(scrollY, [0, 1200], [0, -80]);

  if (prefersReducedMotion) {
    return (
      <>
        <div className="pointer-events-none absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="pointer-events-none absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      </>
    );
  }

  return (
    <>
      <motion.div
        style={{ y: yOrb1, rotate: rotateOrb1 }}
        className="pointer-events-none absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[128px]"
      />
      <motion.div
        style={{ y: yOrb2, x: xOrb2 }}
        className="pointer-events-none absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]"
      />
    </>
  );
}
