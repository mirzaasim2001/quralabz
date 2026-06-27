"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Terminal, Bug, Flame, Zap, ArrowRight } from "lucide-react";
import Mascot, { type Mood } from "@/app/arcade/Mascot";

const FEATURES = [
  { icon: <Terminal className="w-4 h-4 text-cyan-300" />, text: "Guess the Output" },
  { icon: <Bug className="w-4 h-4 text-violet-300" />, text: "Bug Hunt" },
  { icon: <Flame className="w-4 h-4 text-orange-400" />, text: "Streaks & XP" },
  { icon: <Zap className="w-4 h-4 text-emerald-400" />, text: "Level up as you play" },
];

export default function ArcadeTeaser() {
  // Qubit occasionally cheers to feel alive
  const [mood, setMood] = useState<Mood>("idle");
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setMood("happy");
      setPulse((p) => p + 1);
      setTimeout(() => setMood("idle"), 900);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-white/[0.02] to-cyan-500/10 p-8 sm:p-12">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          {/* ── Left: pitch ── */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-200 text-xs font-semibold uppercase tracking-widest mb-5">
              <Gamepad2 className="w-3.5 h-3.5" /> New · Code Arcade
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Learning Python should feel like a <span className="gradient-text">game</span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-lg">
              Meet Qubit. Race the clock guessing what code prints, hunt down bugs,
              build streaks, and level up — bite-sized rounds that make your Python
              instincts razor-sharp. Free, no sign-up, plays in your browser.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
              {FEATURES.map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200"
                >
                  {f.icon}
                  {f.text}
                </div>
              ))}
            </div>

            <Link
              href="/arcade"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white
                bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-shimmer
                hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] transition-shadow"
            >
              Enter the Arcade
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── Right: Qubit + floating stat chips ── */}
          <div className="relative flex items-center justify-center min-h-[260px]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl bg-[#0d0d14]/80 border border-white/10 backdrop-blur-md p-8 shadow-2xl shadow-violet-500/10"
            >
              <Mascot mood={mood} pulse={pulse} size={180} />
              <p className="text-center text-sm font-mono text-slate-400 mt-2">Qubit</p>
            </motion.div>

            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 right-2 sm:right-6 flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-200 text-sm font-bold backdrop-blur-sm"
            >
              <Flame className="w-4 h-4" /> 12 streak
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-2 left-2 sm:left-6 flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-sm font-bold backdrop-blur-sm"
            >
              <Zap className="w-4 h-4" /> +240 XP
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
