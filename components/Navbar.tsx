"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 border-b backdrop-blur-2xl transition-all duration-300
        ${scrolled
          ? "bg-[#09090f]/90 border-violet-500/20 shadow-[0_24px_80px_-30px_rgba(139,92,246,0.35)]"
          : "bg-[#09090f]/70 border-white/10 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)]"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-96.png"
            alt="QuraLabz"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg shadow-lg group-hover:scale-110 transition-transform"
          />
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">Qura</span>
            <span className="text-white">Labz</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                  ${active ? "text-violet-300" : "text-slate-400 hover:text-white hover:bg-white/8"}`}
              >
                {active && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute inset-0 -z-10 rounded-lg bg-violet-600/20 border border-violet-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#12121a] border-b border-white/8 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${active
                    ? "bg-violet-600/20 text-violet-300"
                    : "text-slate-400 hover:text-white hover:bg-white/8"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
