import type { Metadata } from "next";
import ArcadeClient from "./ArcadeClient";

export const metadata: Metadata = {
  title: "Code Arcade — Learn Python by Playing | QuraLabz",
  description:
    "Guess the output, build streaks, and level up. The QuraLabz Code Arcade turns Python practice into a fast, addictive game — free, no sign-up, plays in your browser.",
  keywords: [
    "python game",
    "learn python by playing",
    "guess the output",
    "coding game",
    "gamified python",
    "interactive python quiz",
  ],
  alternates: { canonical: "/arcade" },
  openGraph: {
    title: "QuraLabz Code Arcade — Learn Python by Playing",
    description:
      "Guess the output, build streaks, level up. Python practice as a game.",
    type: "website",
  },
};

export default function ArcadePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute -top-1/4 left-1/3 w-[600px] h-[600px] bg-violet-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Code Arcade · Beta
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Learn Python by <span className="gradient-text">playing</span>
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Meet Qubit. Guess what each snippet prints, build a streak, and level
            up. Bite-sized, addictive, and the fastest way to sharpen your
            Python instincts.
          </p>
        </div>

        <ArcadeClient />
      </div>
    </div>
  );
}
