import type { Metadata } from "next";
import { modules } from "@/data/lessons";
import CertificateClient from "./CertificateClient";

export const metadata: Metadata = {
  title: "Free Certificate of Completion — Data Science & Python | QuraLabz",
  description:
    "Earn a shareable certificate of completion for the data science and Python modules you finish on QuraLabz. Generate it free and download instantly — perfect for LinkedIn.",
  keywords: [
    "free python certificate",
    "data science certificate",
    "certificate of completion",
    "linkedin certificate",
    "machine learning certificate",
  ],
  alternates: { canonical: "/certificate" },
  openGraph: {
    title: "Free Certificate of Completion | QuraLabz",
    description:
      "Generate and download a shareable certificate for the modules you complete.",
    type: "website",
  },
};

export default function CertificatePage() {
  // Project to titles only — keeps the heavy lesson dataset out of the client bundle.
  const moduleTitles = modules.map((m) => ({ title: m.title }));

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Certificates
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Show off what you&apos;ve <span className="gradient-text">learned</span>
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Finished a module? Generate a clean, shareable certificate of
            completion in seconds — then post it to LinkedIn and tag your progress.
          </p>
        </div>

        <CertificateClient modules={moduleTitles} />
      </div>
    </div>
  );
}
