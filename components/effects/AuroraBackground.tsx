"use client";

/**
 * Site-wide ambient mesh-gradient background.
 * Pure CSS-driven (blob/aurora/float keyframes) so it costs nothing on the
 * main thread and respects the global prefers-reduced-motion override.
 */
export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full
          bg-violet-600/25 blur-[120px] mix-blend-screen
          animate-blob animate-float"
      />
      <div
        className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] rounded-full
          bg-cyan-500/20 blur-[120px] mix-blend-screen
          animate-blob animate-float-reverse"
        style={{ animationDelay: "-6s, -3s" }}
      />
      <div
        className="absolute bottom-[-12rem] left-1/4 w-[34rem] h-[34rem] rounded-full
          bg-fuchsia-500/15 blur-[120px] mix-blend-screen
          animate-blob animate-aurora"
        style={{ animationDelay: "-10s, -8s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[60rem] h-[60rem] rounded-full bg-violet-900/10 blur-[160px]
          animate-aurora"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}
