"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".stat-block",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 1.1,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Top Contact Bar */}
      <div className="bg-surface border-b border-white/5 px-8 py-3 flex justify-between items-center text-sm">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-white font-black text-xs mr-3">
            D
          </div>
          <span className="font-black text-white tracking-widest uppercase text-sm">
            Dheera Sports Foundation
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-text-muted text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-primary" /> +91-9074063030
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-primary" /> muktabhinav@gmail.com
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary" /> Shivpuri Link Road, Gwalior
          </span>
        </div>
      </div>

      {/* Main Hero */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-49px)]">
        {/* Left — Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 relative z-10">
          {/* Eyebrow */}
          <div className="hero-sub section-label mb-4">
            Section 8 Non-Profit · Gwalior, MP · Est. 2025
          </div>

          {/* Headline */}
          <h1 className="font-sans font-black uppercase leading-none mb-6">
            <span className="hero-word block text-white text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Dheera Sports
            </span>
            <span className="hero-word block text-white text-4xl md:text-5xl lg:text-6xl tracking-tight mt-1">
              Transformation
            </span>
            <span
              className="hero-word block text-primary text-5xl md:text-7xl lg:text-8xl tracking-tight mt-2"
            >
              Summer Camp
            </span>
            <span className="hero-word block text-white/40 text-3xl md:text-4xl tracking-[0.2em] mt-4">
              2026
            </span>
          </h1>

          {/* Tagline */}
          <p className="hero-sub text-xl md:text-2xl text-text-muted font-medium mb-10 leading-relaxed max-w-lg">
            Send us a child.{" "}
            <span className="text-white font-bold italic">
              We give you back an athlete.
            </span>
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex"
              >
                Secure Your Spot
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            <Link href="#sports">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost inline-flex"
              >
                View Disciplines
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Right — Stats + Visual */}
        <div className="section-alt flex flex-col justify-end relative overflow-hidden">
          {/* Background accent */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #D8473D 0px, #D8473D 1px, transparent 1px, transparent 40px)",
            }}
          />

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-2 border-t border-white/10 mt-auto">
            {[
              { value: "120", label: "Seats Only" },
              { value: "35", sublabel: "06 MAY – 09 JUN", label: "Days" },
              { value: "6", label: "Sports" },
              { value: "7–20", label: "Years Age" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat-block border-b border-r border-white/10 p-8 hover:bg-primary/5 transition-colors"
              >
                <p className="font-black text-5xl md:text-6xl text-primary leading-none">
                  {stat.value}
                </p>
                {stat.sublabel && (
                  <p className="text-xs text-text-muted uppercase tracking-widest mt-2 font-bold">
                    {stat.sublabel}
                  </p>
                )}
                <p className="text-xs text-text-muted uppercase tracking-[0.2em] mt-2 font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Time block */}
          <div className="relative z-10 border-t border-white/10 p-8 flex justify-between items-center">
            <div>
              <p className="font-black text-5xl text-primary">7 AM</p>
              <p className="text-xs text-text-muted uppercase tracking-[0.2em] font-bold mt-1">– 10 AM Daily</p>
            </div>
            <div className="text-right">
              <p className="section-label">Session Timing</p>
              <p className="text-text-muted text-sm mt-1">Mon – Sat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
