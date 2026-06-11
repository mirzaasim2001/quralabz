import {
  Code2,
  Table2,
  BarChart3,
  Sigma,
  Brain,
  BrainCircuit,
  Layers,
  Sparkles,
  Bot,
  Plug,
  SlidersHorizontal,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

interface ModuleTheme {
  icon: LucideIcon;
  /** icon + text color */
  text: string;
  /** chip background + border */
  chip: string;
  /** glow shadow for active states */
  glow: string;
}

const THEMES: Record<string, ModuleTheme> = {
  python: {
    icon: Code2,
    text: "text-violet-300",
    chip: "bg-violet-500/15 border-violet-500/30",
    glow: "shadow-[0_0_24px_rgba(139,92,246,0.25)]",
  },
  pandas: {
    icon: Table2,
    text: "text-cyan-300",
    chip: "bg-cyan-500/15 border-cyan-500/30",
    glow: "shadow-[0_0_24px_rgba(6,182,212,0.25)]",
  },
  visualization: {
    icon: BarChart3,
    text: "text-amber-300",
    chip: "bg-amber-500/15 border-amber-500/30",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.25)]",
  },
  numpy: {
    icon: Sigma,
    text: "text-sky-300",
    chip: "bg-sky-500/15 border-sky-500/30",
    glow: "shadow-[0_0_24px_rgba(14,165,233,0.25)]",
  },
  "ml-basics": {
    icon: Brain,
    text: "text-emerald-300",
    chip: "bg-emerald-500/15 border-emerald-500/30",
    glow: "shadow-[0_0_24px_rgba(16,185,129,0.25)]",
  },
  "advanced-ml": {
    icon: BrainCircuit,
    text: "text-fuchsia-300",
    chip: "bg-fuchsia-500/15 border-fuchsia-500/30",
    glow: "shadow-[0_0_24px_rgba(217,70,239,0.25)]",
  },
  "deep-learning": {
    icon: Layers,
    text: "text-rose-300",
    chip: "bg-rose-500/15 border-rose-500/30",
    glow: "shadow-[0_0_24px_rgba(244,63,94,0.25)]",
  },
  "generative-ai": {
    icon: Sparkles,
    text: "text-indigo-300",
    chip: "bg-indigo-500/15 border-indigo-500/30",
    glow: "shadow-[0_0_24px_rgba(99,102,241,0.25)]",
  },
  "agentic-ai": {
    icon: Bot,
    text: "text-teal-300",
    chip: "bg-teal-500/15 border-teal-500/30",
    glow: "shadow-[0_0_24px_rgba(20,184,166,0.25)]",
  },
  "model-context-protocol": {
    icon: Plug,
    text: "text-orange-300",
    chip: "bg-orange-500/15 border-orange-500/30",
    glow: "shadow-[0_0_24px_rgba(249,115,22,0.25)]",
  },
  "sliding-window-algorithms": {
    icon: SlidersHorizontal,
    text: "text-lime-300",
    chip: "bg-lime-500/15 border-lime-500/30",
    glow: "shadow-[0_0_24px_rgba(132,204,22,0.25)]",
  },
};

const FALLBACK: ModuleTheme = {
  icon: BookOpen,
  text: "text-violet-300",
  chip: "bg-violet-500/15 border-violet-500/30",
  glow: "shadow-[0_0_24px_rgba(139,92,246,0.25)]",
};

export function getModuleTheme(slug: string): ModuleTheme {
  return THEMES[slug] ?? FALLBACK;
}

interface ModuleIconProps {
  slug: string;
  /** chip box size, e.g. "w-12 h-12" */
  size?: string;
  /** icon size, e.g. "w-6 h-6" */
  iconSize?: string;
  withGlow?: boolean;
  className?: string;
}

/**
 * Per-module lucide icon in a themed glass chip. Replaces the old emoji
 * icons everywhere (cards, timeline, hero, lesson sidebar).
 */
export default function ModuleIcon({
  slug,
  size = "w-12 h-12",
  iconSize = "w-6 h-6",
  withGlow = false,
  className = "",
}: ModuleIconProps) {
  const theme = getModuleTheme(slug);
  const Icon = theme.icon;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl border backdrop-blur-sm
        ${size} ${theme.chip} ${theme.text} ${withGlow ? theme.glow : ""} ${className}`}
    >
      <Icon className={iconSize} />
    </span>
  );
}
