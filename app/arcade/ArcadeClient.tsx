"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Trophy, Zap, RotateCcw, Share2, Check, ChevronRight } from "lucide-react";
import Mascot, { type Mood } from "./Mascot";
import { QUESTIONS, type Question } from "./questions";

const LEVELS = [
  { min: 0, name: "Byte Novice" },
  { min: 100, name: "Loop Apprentice" },
  { min: 250, name: "Function Adept" },
  { min: 500, name: "Algorithm Hacker" },
  { min: 1000, name: "Code Wizard" },
  { min: 2000, name: "Data Legend" },
];

const XP_KEY = "ql_arcade_xp";
const STREAK_KEY = "ql_arcade_best_streak";

const HAPPY = ["Nice! 🎉", "You got it!", "Sharp eyes!", "Boom — correct!", "Clean run!"];
const SAD = ["Oof, not quite.", "Tricky one!", "Close — check why.", "Bug spotted in your guess 🐛"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function levelFor(xp: number) {
  let current = LEVELS[0];
  let next: (typeof LEVELS)[number] | null = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? null;
    }
  }
  return { current, next };
}

export default function ArcadeClient() {
  const [deck, setDeck] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [mood, setMood] = useState<Mood>("idle");
  const [pulse, setPulse] = useState(0);
  const [bubble, setBubble] = useState("Ready? Guess what this code prints!");
  const [copied, setCopied] = useState(false);
  const startedRef = useRef(false);

  // Init from localStorage + shuffle deck (client only)
  useEffect(() => {
    setDeck(shuffle(QUESTIONS));
    setTotalXp(Number(localStorage.getItem(XP_KEY) || 0));
    setBestStreak(Number(localStorage.getItem(STREAK_KEY) || 0));
  }, []);

  const q = deck[idx];
  const finished = deck.length > 0 && idx >= deck.length;
  const { current, next } = useMemo(() => levelFor(totalXp), [totalXp]);
  const progressToNext = next
    ? Math.round(((totalXp - current.min) / (next.min - current.min)) * 100)
    : 100;

  const answer = (choice: number) => {
    if (selected !== null || !q) return;
    setSelected(choice);
    startedRef.current = true;
    const correct = choice === q.answer;

    if (correct) {
      const gain = 10 + Math.min(streak, 5) * 2; // streak bonus, capped
      const newStreak = streak + 1;
      const newTotal = totalXp + gain;
      setSessionXp((x) => x + gain);
      setCorrectCount((c) => c + 1);
      setStreak(newStreak);
      setTotalXp(newTotal);
      localStorage.setItem(XP_KEY, String(newTotal));
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem(STREAK_KEY, String(newStreak));
      }
      setMood("happy");
      setBubble(HAPPY[Math.floor(Math.random() * HAPPY.length)] + ` +${gain} XP`);
    } else {
      setStreak(0);
      setMood("wrong");
      setBubble(SAD[Math.floor(Math.random() * SAD.length)]);
    }
    setPulse((p) => p + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    setMood("idle");
    setBubble("Next one — what prints?");
    setIdx((i) => i + 1);
  };

  const restart = () => {
    setDeck(shuffle(QUESTIONS));
    setIdx(0);
    setSelected(null);
    setStreak(0);
    setSessionXp(0);
    setCorrectCount(0);
    setMood("idle");
    setBubble("Fresh deck! Let's go.");
  };

  const share = async () => {
    const text = `I scored ${sessionXp} XP (${correctCount}/${deck.length}) on the QuraLabz Code Arcade 🎮 Can you beat me? https://www.quralabz.com/arcade`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "QuraLabz Code Arcade", text, url: "https://www.quralabz.com/arcade" });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user dismissed share sheet */
    }
  };

  if (deck.length === 0) {
    return <div className="text-center text-slate-400 py-20">Loading arcade…</div>;
  }

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
      {/* ── Stats rail ── */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/8 p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-violet-300" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Level</p>
            <p className="text-lg font-bold text-white leading-tight">{current.name}</p>
          </div>
        </div>

        {/* XP progress to next level */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>{totalXp} XP</span>
            {next && <span>{next.min} XP</span>}
          </div>
          <div className="h-2 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {next ? (
            <p className="text-xs text-slate-400 mt-1.5">
              {next.min - totalXp} XP to {next.name}
            </p>
          ) : (
            <p className="text-xs text-cyan-300 mt-1.5">Max level reached 🏆</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat icon={<Flame className="w-4 h-4 text-orange-400" />} label="Streak" value={streak} />
          <Stat icon={<Zap className="w-4 h-4 text-cyan-400" />} label="Best" value={bestStreak} />
        </div>

        <p className="mt-6 text-xs text-slate-400 leading-relaxed">
          Progress saves on this device. Want cloud sync, leaderboards & more games?{" "}
          <Link href="/pricing" className="text-cyan-400 underline hover:text-cyan-300">
            Go Pro
          </Link>
          .
        </p>
      </div>

      {/* ── Game ── */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/8 p-6 sm:p-8 relative overflow-hidden">
        {/* Mascot + speech bubble */}
        <div className="flex items-center gap-4 mb-6 min-h-[80px]">
          <div className="flex-shrink-0 -my-4">
            <Mascot mood={mood} pulse={pulse} size={96} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={bubble}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white/8 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 font-medium"
            >
              {bubble}
            </motion.div>
          </AnimatePresence>
        </div>

        {!finished ? (
          <>
            {/* Question counter */}
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span>
                Question {idx + 1} / {deck.length}
              </span>
              <span className="font-mono text-violet-300">+{sessionXp} XP this round</span>
            </div>

            {/* Code card */}
            <div className="rounded-xl bg-[#0d0d14] border border-white/8 px-5 py-4 mb-5 font-mono text-sm leading-7 overflow-x-auto">
              <pre className="text-slate-100 whitespace-pre">
                <span className="select-none text-slate-600 mr-3">{">>>"}</span>
                {q.code.split("\n").join("\n    ")}
              </pre>
            </div>

            {/* Options */}
            <div className="grid sm:grid-cols-2 gap-3">
              {q.options.map((opt, i) => {
                const isAnswer = i === q.answer;
                const isPicked = i === selected;
                let style = "bg-white/5 border-white/10 hover:border-violet-500/40 hover:bg-white/10 text-slate-100";
                if (selected !== null) {
                  if (isAnswer) style = "bg-emerald-500/15 border-emerald-500/50 text-emerald-200";
                  else if (isPicked) style = "bg-red-500/15 border-red-500/50 text-red-200";
                  else style = "bg-white/5 border-white/10 text-slate-500";
                }
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={selected !== null}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left font-mono text-sm transition-all ${style}`}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation + next */}
            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-5"
                >
                  <div className="rounded-xl bg-violet-500/8 border border-violet-500/20 px-4 py-3 text-sm text-slate-200 leading-relaxed">
                    <strong className="text-violet-300">Why:</strong> {q.explain}
                  </div>
                  <button
                    onClick={nextQuestion}
                    className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white
                      bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-shimmer
                      hover:shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-shadow"
                  >
                    {idx + 1 >= deck.length ? "See results" : "Next question"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* ── Results ── */
          <div className="text-center py-6">
            <h2 className="text-3xl font-black text-white mb-2">Round complete! 🎮</h2>
            <p className="text-slate-300 mb-6">
              You scored{" "}
              <span className="text-cyan-300 font-bold">{sessionXp} XP</span> —{" "}
              {correctCount}/{deck.length} correct.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={restart}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white
                  bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-shimmer
                  hover:shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-shadow"
              >
                <RotateCcw className="w-4 h-4" /> Play again
              </button>
              <button
                onClick={share}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Copied!" : "Share score"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
        {icon} {label}
      </div>
      <p className="text-xl font-black text-white">{value}</p>
    </div>
  );
}
