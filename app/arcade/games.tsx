import type { ReactNode } from "react";
import { Terminal, Bug } from "lucide-react";
import { QUESTIONS } from "./questions";

/* ── Shared engine types ──────────────────────────────────────────
   Every arcade game compiles down to a deck of Rounds: a prompt, a
   set of clickable choices (one correct), and an explanation. Adding
   a new game = write a build() that returns Round[]. */
export interface Choice {
  label: ReactNode;
  correct: boolean;
}

export interface Round {
  prompt: ReactNode;
  choices: Choice[];
  explain: string;
  cols?: 1 | 2;
  badge?: "letter" | "number";
}

export interface GameDef {
  id: string;
  name: string;
  tagline: string;
  icon: ReactNode;
  build: () => Round[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-xl bg-[#0d0d14] border border-white/8 px-5 py-4 font-mono text-sm leading-7 overflow-x-auto">
      <pre className="text-slate-100 whitespace-pre">
        <span className="select-none text-slate-600 mr-3">{">>>"}</span>
        {code.split("\n").join("\n    ")}
      </pre>
    </div>
  );
}

/* ── Game 1: Guess the Output ── */
export function buildGuessDeck(): Round[] {
  return shuffle(QUESTIONS).map((q) => ({
    prompt: <CodeBlock code={q.code} />,
    // shuffle options so the answer isn't always in the same slot
    choices: shuffle(
      q.options.map((opt, i) => ({
        label: <span className="font-mono">{opt}</span>,
        correct: i === q.answer,
      }))
    ),
    explain: q.explain,
    cols: 2,
    badge: "letter",
  }));
}

/* ── Game 2: Bug Hunt — pick the line with the bug ── */
interface BugItem {
  lines: string[];
  buggy: number;
  explain: string;
}

const BUGS: BugItem[] = [
  {
    lines: ["def mean(nums):", "    total = sum(nums)", "    return total / len(num)"],
    buggy: 2,
    explain: "len(num) references an undefined name — it should be len(nums).",
  },
  {
    lines: ["for i in range(5)", "    print(i)"],
    buggy: 0,
    explain: "The for statement is missing a colon ( : ) at the end of the line.",
  },
  {
    lines: ["data = [10, 20, 30]", "print(data[3])"],
    buggy: 1,
    explain: "data has 3 items (indices 0–2); data[3] raises IndexError.",
  },
  {
    lines: ['name = "Ada"', 'print("Hello, " + name)', 'print("Age: " + 36)'],
    buggy: 2,
    explain: "You can't concatenate a str with an int — use str(36) or an f-string.",
  },
  {
    lines: ["nums = [1, 2, 3]", "nums.append(4, 5)", "print(nums)"],
    buggy: 1,
    explain: "list.append() takes one item; use extend([4, 5]) to add several.",
  },
  {
    lines: ["def greet(name):", '    msg = "Hi " + name', "print(msg)"],
    buggy: 2,
    explain: "msg is local to greet(); it doesn't exist outside the function (NameError).",
  },
  {
    lines: ["x = 5", "if x = 5:", '    print("five")'],
    buggy: 1,
    explain: "Use == to compare; a single = is assignment and is invalid in an if.",
  },
  {
    lines: ["import math", "print(math.sqr(16))"],
    buggy: 1,
    explain: "math has no 'sqr' — the square-root function is math.sqrt().",
  },
  {
    lines: ['fruits = ("apple", "banana")', 'fruits[0] = "cherry"'],
    buggy: 1,
    explain: "Tuples are immutable — assigning to fruits[0] raises TypeError. Use a list.",
  },
  {
    lines: ["d = {'x': 1}", "print(d['y'])"],
    buggy: 1,
    explain: "Key 'y' doesn't exist — use d.get('y') for a safe lookup that returns None.",
  },
];

export function buildBugHuntDeck(): Round[] {
  return shuffle(BUGS).map((b) => ({
    prompt: (
      <p className="text-sm text-slate-300 mb-1">
        Tap the line that contains the bug:
      </p>
    ),
    choices: b.lines.map((line, i) => ({
      label: <span className="font-mono whitespace-pre">{line}</span>,
      correct: i === b.buggy,
    })),
    explain: b.explain,
    cols: 1,
    badge: "number",
  }));
}

/* ── Registry — add new games here ── */
export const GAMES: GameDef[] = [
  {
    id: "guess",
    name: "Guess the Output",
    tagline: "Read the code. Predict what it prints.",
    icon: <Terminal className="w-6 h-6 text-cyan-300" />,
    build: buildGuessDeck,
  },
  {
    id: "bughunt",
    name: "Bug Hunt",
    tagline: "Spot the broken line before it ships.",
    icon: <Bug className="w-6 h-6 text-violet-300" />,
    build: buildBugHuntDeck,
  },
];
