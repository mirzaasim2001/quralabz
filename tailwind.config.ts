import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        background: "#0a0a0f",
        surface: "#12121a",
        "surface-2": "#1a1a26",
        "surface-3": "#22223a",
        border: "rgba(255,255,255,0.08)",
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.3), transparent)",
        "card-shimmer":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(139,92,246,0.15)",
        "glow-cyan": "0 0 40px rgba(6,182,212,0.15)",
        card: "0 4px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
        shimmer: "shimmer 2s infinite",
        float: "float 7s ease-in-out infinite",
        "float-reverse": "floatReverse 9s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        aurora: "aurora 22s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        "grid-pan": "gridPan 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -28px, 0) rotate(6deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, 24px, 0) rotate(-5deg)" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(8%, -6%) scale(1.15)" },
          "66%": { transform: "translate(-6%, 8%) scale(0.95)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%", transform: "rotate(0deg) scale(1)" },
          "33%": { borderRadius: "60% 40% 35% 65% / 55% 65% 35% 45%", transform: "rotate(8deg) scale(1.08)" },
          "66%": { borderRadius: "35% 65% 55% 45% / 35% 50% 50% 65%", transform: "rotate(-6deg) scale(0.96)" },
        },
        gridPan: {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "60px 60px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
