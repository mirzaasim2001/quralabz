import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing & Membership — Free Forever, Pro for Careers | QuraLabz",
  description:
    "QuraLabz is free forever. Upgrade to Pro for an ad-free experience, verified certificates, downloadable cheat sheets, and premium capstone projects. 14-day money-back guarantee.",
  keywords: [
    "data science course pricing",
    "python certificate",
    "ad-free learning",
    "data science membership",
    "learn python online",
  ],
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "QuraLabz Pricing & Membership",
    description:
      "Free forever. Go Pro for certificates, ad-free learning, and real-world projects.",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 relative overflow-hidden">
      {/* Ambient glow to match site aesthetic */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px]" />
      </div>
      <PricingClient />
    </div>
  );
}
