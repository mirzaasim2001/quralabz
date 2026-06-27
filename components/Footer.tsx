"use client";

import Link from "next/link";
import { Heart, Linkedin, Mail } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Brand Column */}
          <Reveal>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">QuraLabz</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Interactive data science learning platform. Free, no sign-up, run Python in your browser.
            </p>
          </div>
          </Reveal>

          {/* Learning Links */}
          <Reveal delay={0.1}>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Learning</h4>
          <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/lessons" className="hover:text-cyan-400 transition-colors font-semibold text-slate-300">
                  All Lessons
                </Link>
              </li>
              <li>
                <Link href="/module/python" className="hover:text-cyan-400 transition-colors">
                  Python Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/module/ml-basics" className="hover:text-cyan-400 transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/module/deep-learning" className="hover:text-cyan-400 transition-colors">
                  Deep Learning
                </Link>
              </li>
              <li>
                <Link href="/certificate" className="hover:text-cyan-400 transition-colors">
                  Get a Certificate
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          </Reveal>

          {/* Support Links */}
          <Reveal delay={0.2}>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing & Membership
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          </Reveal>

          {/* Connect */}
          <Reveal delay={0.3}>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@quralabz.com"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mirza-asim-baig-3806951a1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          </Reveal>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Footer */}
        <Reveal>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <p>Made with</p>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <p>for learners everywhere</p>
          </div>
          <p>© 2026 QuraLabz. All rights reserved.</p>
        </div>
        </Reveal>

        {/* Compliance Notice */}
        <div className="mt-8 pt-8 border-t border-white/10 text-xs text-slate-400 text-center">
          <p>
            This site uses cookies for analytics and advertising. By using QuraLabz, you agree to our{" "}
            <Link href="/privacy-policy" className="text-cyan-400 underline hover:text-cyan-300">
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link href="/terms" className="text-cyan-400 underline hover:text-cyan-300">
              Terms & Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
