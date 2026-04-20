"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Sports", href: "#sports" },
    { label: "Schedule", href: "#schedule" },
    { label: "Coaches", href: "#coaches" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "translate-y-0 opacity-100 py-3 glass-strong border-b-glass-border shadow-lg" 
          : "-translate-y-full opacity-0 py-5 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm tracking-tighter">DS</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block text-text-primary">
              Dheera<span className="text-text-muted font-normal">Sports</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/register"
              className="px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="btn-primary py-2 px-5 text-sm m-0"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden z-50">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 text-text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 glass-strong border-b border-glass-border shadow-2xl py-6 px-6 flex flex-col gap-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-text-primary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant">
              <Link
                href="/register"
                className="btn-ghost w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
