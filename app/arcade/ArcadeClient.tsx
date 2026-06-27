"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Trophy,
  Zap,
  RotateCcw,
  Share2,
  Check,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Mascot, { type Mood } from "./Mascot";
import { GAMES, type GameDef, type Round } from "./games";

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
  // Persistent profile
  const [totalXp, setTotalXp] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [ready, setReady] = useState(false);

  // Active game session
  const [game, setGame] = useState<GameDef | null>(null);
  const [deck, setDeck] = useState<Round[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Mascot
  const [mood, setMood] = useState<Mood>("idle");
  const [pulse, setPulse] = useState(0);
  const [bubble, setBubble] = useState("Pick a game and let's play!");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTotalXp(Number(localStorage.getItem(XP_KEY) || 0));
    setBestStreak(Number(localStorage.getItem(STREAK_KEY) || 0));
    setReady(true);
  }, []);

  const { current, next } = useMemo(() => levelFor(totalXp), [totalXp]);
  const progressToNext = next
    ? Math.round(((totalXp - current.min) / (next.min - current.min)) * 100)
    : 100;

  const round = deck[idx];
  const finished = game !== null && deck.length > 0 && idx >= deck.length;

  const startGame = (g: GameDef) => {
    setGame(g);
    setDeck(g.build());
    setIdx(0);
    setSelected(null);
    setStreak(0);
    setSessionXp(0);
    setCorrectCount(0);
    setMood("idle");
    setBubble(`${g.name} — let's go!`);
  };

  const backToMenu = () => {
    setGame(null);
    setDeck([]);
    setMood("idle");
    setBubble("Pick a game and let's play!");
  };

  const answer = (choice: number) => {
    if (selected !== null || !round) return;
    setSelected(choice);
    const correct = round.choices[choice].correct;

    if (correct) {
      const gain = 10 + Math.min(streak, 5) * 2;
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

  const nextRound = () => {
    setSelected(null);
    setMood("idle");
    setBubble("Next one!");
    setIdx((i) => i + 1);
  };

  const share = async () => {
    const text = `I scored ${sessionXp} XP (${correctCount}/${deck.length}) playing ${game?.name} on the QuraLabz Code Arcade 🎮 Beat me? https://www.quralabz.com/arcade`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "QuraLabz Code Arcade", text, url: "https://www.quralabz.com/arcade" });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* dismissed */
    }
  };

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
            <p className="text-lg font-bold text-white leading-tight">
              {ready ? current.name : "—"}
            </p>
          </div>
        </div>

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
          Progress saves on this device. Want cloud sync & leaderboards?{" "}
          <Link href="/pricing" className="text-cyan-400 underline hover:text-cyan-300">
            Go Pro
          </Link>
          .
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/8 p-6 sm:p-8 relative">
        {/* Mascot + bubble */}
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
              className="bg-white/8 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 font-medium"
            >
              {bubble}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Menu ── */}
        {!game && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Choose a game</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {GAMES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => startGame(g)}
                  className="group text-left p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-violet-500/40 hover:bg-white/[0.06] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:border-violet-500/30 transition-colors">
                    {g.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 flex items-center gap-1">
                    {g.name}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-violet-300 transition-all" />
                  </h3>
                  <p className="text-sm text-slate-400">{g.tagline}</p>
                </button>
              ))}
              <div className="p-5 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-sm text-slate-500">
                More games coming soon…
              </div>
            </div>
          </div>
        )}

        {/* ── Playing ── */}
        {game && !finished && round && (
          <>
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <button
                onClick={backToMenu}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> {game.name}
              </button>
              <span>
                {idx + 1} / {deck.length} · <span className="font-mono text-violet-300">+{sessionXp} XP</span>
              </span>
            </div>

            <div className="mb-5">{round.prompt}</div>

            <div className={`grid gap-3 ${round.cols === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
              {round.choices.map((c, i) => {
                let style =
                  "bg-white/5 border-white/10 hover:border-violet-500/40 hover:bg-white/10 text-slate-100";
                if (selected !== null) {
                  if (c.correct) style = "bg-emerald-500/15 border-emerald-500/50 text-emerald-200";
                  else if (i === selected) style = "bg-red-500/15 border-red-500/50 text-red-200";
                  else style = "bg-white/5 border-white/10 text-slate-500";
                }
                const badge =
                  round.badge === "number" ? i + 1 : String.fromCharCode(65 + i);
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={selected !== null}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all overflow-x-auto ${style}`}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs font-bold font-mono">
                      {badge}
                    </span>
                    {c.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-5"
                >
                  <div className="rounded-xl bg-violet-500/8 border border-violet-500/20 px-4 py-3 text-sm text-slate-200 leading-relaxed">
                    <strong className="text-violet-300">Why:</strong> {round.explain}
                  </div>
                  <button
                    onClick={nextRound}
                    className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white
                      bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-shimmer
                      hover:shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-shadow"
                  >
                    {idx + 1 >= deck.length ? "See results" : "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* ── Results ── */}
        {game && finished && (
          <div className="text-center py-6">
            <h2 className="text-3xl font-black text-white mb-2">Round complete! 🎮</h2>
            <p className="text-slate-300 mb-6">
              You scored <span className="text-cyan-300 font-bold">{sessionXp} XP</span> —{" "}
              {correctCount}/{deck.length} correct.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => startGame(game)}
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
              <button
                onClick={backToMenu}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" /> All games
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
