"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export type Mood = "idle" | "happy" | "wrong" | "thinking";

/**
 * Qubit — the QuraLabz arcade mascot. A small robot whose eyes and mouth
 * change with mood, and who bobs (idle), hops (happy), or shakes (wrong).
 * `pulse` lets the parent replay a reaction even when the mood is unchanged.
 */
export default function Mascot({
  mood = "idle",
  pulse = 0,
  size = 150,
}: {
  mood?: Mood;
  pulse?: number;
  size?: number;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (mood === "happy") {
      controls.start({
        y: [0, -20, 0],
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.6, ease: "easeOut" },
      });
    } else if (mood === "wrong") {
      controls.start({
        x: [0, -9, 9, -7, 7, 0],
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({
        y: [0, -6, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      });
    }
  }, [mood, pulse, controls]);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      animate={controls}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="qubitBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="qubitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Antenna */}
      <line x1="60" y1="26" x2="60" y2="14" stroke="url(#qubitBody)" strokeWidth="3" strokeLinecap="round" />
      <motion.circle
        cx="60"
        cy="11"
        r="6"
        fill="url(#qubitGlow)"
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="60" cy="11" r="3.5" fill="#22d3ee" />

      {/* Head */}
      <rect
        x="26"
        y="26"
        width="68"
        height="56"
        rx="18"
        fill="#12121a"
        stroke="url(#qubitBody)"
        strokeWidth="3"
      />

      {/* Cheeks when happy */}
      {mood === "happy" && (
        <>
          <circle cx="38" cy="62" r="5" fill="#f472b6" opacity="0.5" />
          <circle cx="82" cy="62" r="5" fill="#f472b6" opacity="0.5" />
        </>
      )}

      {/* Eyes */}
      <Eyes mood={mood} />

      {/* Mouth */}
      <Mouth mood={mood} />

      {/* Body */}
      <rect x="36" y="84" width="48" height="22" rx="10" fill="#12121a" stroke="url(#qubitBody)" strokeWidth="3" />
      <circle cx="50" cy="95" r="2.5" fill="#a78bfa" />
      <circle cx="60" cy="95" r="2.5" fill="#818cf8" />
      <circle cx="70" cy="95" r="2.5" fill="#22d3ee" />
    </motion.svg>
  );
}

function Eyes({ mood }: { mood: Mood }) {
  const eye = "#22d3ee";
  if (mood === "happy") {
    // ^ ^ happy arcs
    return (
      <g stroke={eye} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M38 52 Q45 45 52 52" />
        <path d="M68 52 Q75 45 82 52" />
      </g>
    );
  }
  if (mood === "wrong") {
    // x x
    return (
      <g stroke={eye} strokeWidth="3.5" strokeLinecap="round">
        <line x1="41" y1="48" x2="49" y2="56" />
        <line x1="49" y1="48" x2="41" y2="56" />
        <line x1="71" y1="48" x2="79" y2="56" />
        <line x1="79" y1="48" x2="71" y2="56" />
      </g>
    );
  }
  if (mood === "thinking") {
    // looking up
    return (
      <g fill={eye}>
        <circle cx="45" cy="50" r="4.5" />
        <circle cx="75" cy="50" r="4.5" />
      </g>
    );
  }
  // idle
  return (
    <g fill={eye}>
      <circle cx="45" cy="52" r="5" />
      <circle cx="75" cy="52" r="5" />
    </g>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  const c = "#94a3b8";
  if (mood === "happy")
    return <path d="M46 66 Q60 80 74 66" stroke="#22d3ee" strokeWidth="3.5" fill="none" strokeLinecap="round" />;
  if (mood === "wrong")
    return <path d="M48 74 Q60 64 72 74" stroke="#f87171" strokeWidth="3.5" fill="none" strokeLinecap="round" />;
  if (mood === "thinking")
    return <circle cx="60" cy="70" r="4" fill="none" stroke={c} strokeWidth="3" />;
  return <path d="M50 70 Q60 75 70 70" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />;
}
