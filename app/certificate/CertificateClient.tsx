"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Download, Award, Sparkles } from "lucide-react";

interface Props {
  /** Lightweight list passed from the server page so the full lesson
      dataset never reaches the client bundle. */
  modules: { title: string }[];
}

const W = 1600;
const H = 1131;

/** Deterministic short ID from the certificate fields — gives each
    certificate a stable "QL-XXXXXX" code without a backend. */
function certId(name: string, module: string): string {
  const s = `${name}|${module}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return "QL-" + h.toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
}

export default function CertificateClient({ modules }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [module, setModule] = useState(modules[0]?.title ?? "");
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let active = true;
    // Canvas only paints custom fonts that are already loaded.
    (document as any).fonts?.ready.then(() => active && setFontsReady(true));
    return () => {
      active = false;
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = W / 2;
    const displayName = name.trim() || "Your Name";
    const id = certId(displayName, module);

    // ── Background ──
    ctx.fillStyle = "#0b0b12";
    ctx.fillRect(0, 0, W, H);

    const glowA = ctx.createRadialGradient(320, 240, 0, 320, 240, 700);
    glowA.addColorStop(0, "rgba(139,92,246,0.16)");
    glowA.addColorStop(1, "rgba(139,92,246,0)");
    ctx.fillStyle = glowA;
    ctx.fillRect(0, 0, W, H);

    const glowB = ctx.createRadialGradient(1300, 950, 0, 1300, 950, 700);
    glowB.addColorStop(0, "rgba(6,182,212,0.14)");
    glowB.addColorStop(1, "rgba(6,182,212,0)");
    ctx.fillStyle = glowB;
    ctx.fillRect(0, 0, W, H);

    // ── Borders ──
    const borderGrad = ctx.createLinearGradient(50, 50, W - 50, H - 50);
    borderGrad.addColorStop(0, "#8b5cf6");
    borderGrad.addColorStop(1, "#06b6d4");
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, W - 100, H - 100);

    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    ctx.strokeRect(72, 72, W - 144, H - 144);

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    // ── Wordmark ──
    ctx.font = "700 46px Georgia, serif";
    const qura = "Qura";
    const labz = "Labz";
    const wq = ctx.measureText(qura).width;
    const wl = ctx.measureText(labz).width;
    const startX = cx - (wq + wl) / 2;
    ctx.textAlign = "left";
    ctx.fillStyle = "#a78bfa";
    ctx.fillText(qura, startX, 185);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(labz, startX + wq, 185);
    ctx.textAlign = "center";

    // ── Title ──
    (ctx as any).letterSpacing = "10px";
    ctx.font = "600 34px Arial, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("CERTIFICATE OF COMPLETION", cx, 305);
    (ctx as any).letterSpacing = "0px";

    // divider
    const dg = ctx.createLinearGradient(cx - 70, 0, cx + 70, 0);
    dg.addColorStop(0, "#8b5cf6");
    dg.addColorStop(1, "#06b6d4");
    ctx.strokeStyle = dg;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 70, 345);
    ctx.lineTo(cx + 70, 345);
    ctx.stroke();

    // ── Presented to ──
    ctx.font = "italic 28px Georgia, serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("This certificate is proudly presented to", cx, 450);

    // ── Recipient name (auto-fit) ──
    let nameSize = 84;
    ctx.font = `700 ${nameSize}px Georgia, serif`;
    while (ctx.measureText(displayName).width > W - 320 && nameSize > 36) {
      nameSize -= 4;
      ctx.font = `700 ${nameSize}px Georgia, serif`;
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillText(displayName, cx, 560);

    // underline under name
    const nameW = Math.min(ctx.measureText(displayName).width + 80, W - 240);
    ctx.strokeStyle = "rgba(139,92,246,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - nameW / 2, 590);
    ctx.lineTo(cx + nameW / 2, 590);
    ctx.stroke();

    // ── Completed module ──
    ctx.font = "26px Arial, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("has successfully completed the module", cx, 670);

    // module title (gradient, auto-fit)
    let modSize = 50;
    ctx.font = `700 ${modSize}px Georgia, serif`;
    while (ctx.measureText(module).width > W - 360 && modSize > 26) {
      modSize -= 3;
      ctx.font = `700 ${modSize}px Georgia, serif`;
    }
    const modW = ctx.measureText(module).width;
    const mg = ctx.createLinearGradient(cx - modW / 2, 0, cx + modW / 2, 0);
    mg.addColorStop(0, "#a78bfa");
    mg.addColorStop(1, "#22d3ee");
    ctx.fillStyle = mg;
    ctx.fillText(module, cx, 745);

    // ── Seal ──
    const sy = 895;
    ctx.beginPath();
    ctx.arc(cx, sy, 58, 0, Math.PI * 2);
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, sy, 46, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = "700 30px Georgia, serif";
    ctx.fillStyle = "#a78bfa";
    ctx.textBaseline = "middle";
    ctx.fillText("QL", cx, sy + 1);
    ctx.textBaseline = "alphabetic";

    // ── Date (left) & Issuer (right) ──
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const colL = 470;
    const colR = W - 470;
    const lineY = 905;

    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(colL - 150, lineY);
    ctx.lineTo(colL + 150, lineY);
    ctx.moveTo(colR - 150, lineY);
    ctx.lineTo(colR + 150, lineY);
    ctx.stroke();

    ctx.font = "26px Georgia, serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(date, colL, lineY - 14);
    ctx.fillText("QuraLabz", colR, lineY - 14);

    (ctx as any).letterSpacing = "4px";
    ctx.font = "600 18px Arial, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("DATE", colL, lineY + 32);
    ctx.fillText("ISSUED BY", colR, lineY + 32);
    (ctx as any).letterSpacing = "0px";

    // ── Footer / ID ──
    ctx.font = "20px Arial, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(
      `Certificate ID: ${id}  •  Verify at quralabz.com`,
      cx,
      H - 95
    );
  }, [name, module]);

  useEffect(() => {
    draw();
  }, [draw, fontsReady]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const safe = (name.trim() || "certificate").replace(/[^a-z0-9]+/gi, "-");
    const a = document.createElement("a");
    a.download = `QuraLabz-Certificate-${safe}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-10 items-start">
      {/* ── Form ── */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/8 p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-violet-300" />
          <h2 className="text-lg font-bold text-white">Create your certificate</h2>
        </div>

        <label className="block text-sm font-medium text-slate-300 mb-2">
          Your full name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ada Lovelace"
          maxLength={40}
          className="w-full mb-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition"
        />

        <label className="block text-sm font-medium text-slate-300 mb-2">
          Module completed
        </label>
        <select
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition appearance-none cursor-pointer"
        >
          {modules.map((m) => (
            <option key={m.title} value={m.title} className="bg-[#12121a]">
              {m.title}
            </option>
          ))}
        </select>

        <button
          onClick={download}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white
            bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-shimmer
            hover:shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-shadow"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>

        <p className="mt-4 text-xs text-slate-400 leading-relaxed">
          <Sparkles className="inline w-3 h-3 text-violet-400 mr-1" />
          Want a <strong className="text-slate-300">verified</strong> certificate
          with a public verification link?{" "}
          <Link href="/pricing" className="text-cyan-400 underline hover:text-cyan-300">
            Go Pro
          </Link>
          .
        </p>
      </div>

      {/* ── Live preview ── */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full h-auto block"
          aria-label="Certificate preview"
        />
      </div>
    </div>
  );
}
