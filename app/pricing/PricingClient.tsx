"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Crown,
  Rocket,
  ShieldCheck,
  FileText,
  Award,
  Ban,
  MessageCircle,
  Star,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   PAYMENT LINKS — paste your Stripe Payment Link URLs here.
   Create them at: dashboard.stripe.com → Payment Links (no backend
   required). Until filled in, the CTA scrolls to the contact page.
   ──────────────────────────────────────────────────────────────── */
const PAYMENT_LINKS = {
  proMonthly: "", // e.g. "https://buy.stripe.com/xxxxxxxx"
  proYearly: "", // e.g. "https://buy.stripe.com/yyyyyyyy"
  lifetime: "", // e.g. "https://buy.stripe.com/zzzzzzzz"
};

const FALLBACK_CTA = "/contact";

type Billing = "monthly" | "yearly";

export default function PricingClient() {
  const [billing, setBilling] = useState<Billing>("yearly");

  const proPrice = billing === "monthly" ? 9 : 79;
  const proSuffix = billing === "monthly" ? "/month" : "/year";
  const proLink =
    (billing === "monthly" ? PAYMENT_LINKS.proMonthly : PAYMENT_LINKS.proYearly) ||
    FALLBACK_CTA;
  const lifetimeLink = PAYMENT_LINKS.lifetime || FALLBACK_CTA;

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
      {/* ── Header ── */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-4">
          Membership
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
          Learn for free.
          <br className="hidden sm:block" />{" "}
          <span className="gradient-text">Go further with Pro.</span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Every lesson is free, forever. Upgrade when you want certificates,
          an ad-free experience, and real-world projects that get you hired.
        </p>
      </div>

      {/* ── Billing toggle ── */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            billing === "monthly"
              ? "bg-white/10 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("yearly")}
          className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            billing === "yearly"
              ? "bg-white/10 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Yearly
          <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wide">
            Save 27%
          </span>
        </button>
      </div>

      {/* ── Tier cards ── */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {/* FREE */}
        <PlanCard
          icon={<Rocket className="w-6 h-6 text-cyan-400" />}
          name="Free"
          price="$0"
          suffix="forever"
          tagline="Everything you need to start."
          cta="Start Learning"
          ctaHref="/lessons"
          ctaStyle="ghost"
          features={[
            { icon: <Check />, text: "All 11 modules & 150+ lessons" },
            { icon: <Check />, text: "In-browser Python (no setup)" },
            { icon: <Check />, text: "Auto-graded exercises" },
            { icon: <Check />, text: "Inline charts & plots" },
            { icon: <Check />, text: "Community access" },
          ]}
        />

        {/* PRO — highlighted */}
        <PlanCard
          icon={<Crown className="w-6 h-6 text-violet-300" />}
          name="Pro"
          price={`$${proPrice}`}
          suffix={proSuffix}
          tagline="For serious learners building a career."
          cta="Go Pro"
          ctaHref={proLink}
          ctaStyle="primary"
          highlighted
          features={[
            { icon: <Sparkles />, text: "Everything in Free" },
            { icon: <Ban />, text: "100% ad-free experience" },
            { icon: <Award />, text: "Verified certificates of completion" },
            { icon: <FileText />, text: "Downloadable cheat sheets (PDF)" },
            { icon: <Rocket />, text: "Premium capstone projects + solutions" },
            { icon: <MessageCircle />, text: "Priority email support" },
          ]}
        />

        {/* LIFETIME */}
        <PlanCard
          icon={<Star className="w-6 h-6 text-amber-300" />}
          name="Lifetime"
          price="$149"
          suffix="one-time"
          tagline="Pay once. Own it forever."
          cta="Get Lifetime"
          ctaHref={lifetimeLink}
          ctaStyle="ghost"
          features={[
            { icon: <Check />, text: "Everything in Pro, forever" },
            { icon: <Check />, text: "No recurring subscription" },
            { icon: <Check />, text: "Early access to new modules" },
            { icon: <Check />, text: "Founding member badge" },
          ]}
        />
      </div>

      {/* ── Trust line ── */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-sm text-slate-300">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> 14-day money-back guarantee
        </span>
        <span className="inline-flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Cancel anytime
        </span>
        <span className="inline-flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Secure checkout via Stripe
        </span>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl bg-white/[0.03] border border-white/8 p-5 hover:border-violet-500/30 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer text-white font-semibold list-none">
                {item.q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Reusable plan card ── */
function PlanCard({
  icon,
  name,
  price,
  suffix,
  tagline,
  cta,
  ctaHref,
  ctaStyle,
  features,
  highlighted = false,
}: {
  icon: React.ReactNode;
  name: string;
  price: string;
  suffix: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  ctaStyle: "primary" | "ghost";
  features: { icon: React.ReactNode; text: string }[];
  highlighted?: boolean;
}) {
  const isExternal = ctaHref.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col p-7 rounded-3xl h-full transition-all duration-300 ${
        highlighted
          ? "bg-gradient-to-b from-violet-600/15 to-white/[0.03] border-2 border-violet-500/40 shadow-2xl shadow-violet-500/10"
          : "bg-white/[0.03] border border-white/8 hover:border-white/20"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
          Most Popular
        </span>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>

      <div className="mb-1 flex items-end gap-1.5">
        <span className="text-4xl font-black text-white">{price}</span>
        <span className="text-slate-400 text-sm mb-1">{suffix}</span>
      </div>
      <p className="text-slate-400 text-sm mb-6">{tagline}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
            <span className="flex-shrink-0 mt-0.5 text-violet-400 [&>svg]:w-4 [&>svg]:h-4">
              {f.icon}
            </span>
            {f.text}
          </li>
        ))}
      </ul>

      {isExternal ? (
        <a
          href={ctaHref}
          className={ctaClass(ctaStyle)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cta}
        </a>
      ) : (
        <Link href={ctaHref} className={ctaClass(ctaStyle)}>
          {cta}
        </Link>
      )}
    </motion.div>
  );
}

function ctaClass(style: "primary" | "ghost") {
  const base =
    "w-full text-center px-5 py-3 rounded-xl text-sm font-bold transition-all";
  return style === "primary"
    ? `${base} text-white bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-shimmer hover:shadow-[0_0_24px_rgba(139,92,246,0.45)]`
    : `${base} text-white bg-white/5 border border-white/15 hover:bg-white/10`;
}

const FAQ = [
  {
    q: "Are the lessons really free?",
    a: "Yes — all 150+ lessons across every module are free forever, with no sign-up required. The Free tier is supported by ads. Pro simply removes ads and adds certificates, downloadable resources, and capstone projects.",
  },
  {
    q: "What do I get with a certificate?",
    a: "When you complete a module on Pro, you earn a verified certificate of completion you can share on LinkedIn or attach to job applications — proof you've mastered the material hands-on, not just watched videos.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Pro is a rolling subscription you can cancel with one click from your account. You keep access until the end of your billing period. Lifetime is a one-time payment with nothing to cancel.",
  },
  {
    q: "What's your refund policy?",
    a: "Every paid plan is backed by a 14-day money-back guarantee. If it's not for you, email us within 14 days for a full refund — no questions asked.",
  },
  {
    q: "Do I need to install anything?",
    a: "Never. All code runs directly in your browser via WebAssembly (Pyodide). Nothing to install, nothing to configure — it even works offline once loaded.",
  },
];
