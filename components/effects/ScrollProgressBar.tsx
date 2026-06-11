"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar pinned to the very top of the viewport, tracking
 * how far the user has scrolled down the current page.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left
        bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
