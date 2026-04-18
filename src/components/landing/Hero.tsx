"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".stat-block",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.1, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">

      {/* ── Top Contact Bar ── */}
      <div className="nav-blur border-b border-white/5 px-6 py-3 flex justify-between items-center text-sm relative z-20">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#111316] font-black text-xs shrink-0"
            style={{ background: "linear-gradient(135deg, #ffb4a9, #ff5745)" }}
          >
            D
          </div>
          <span className="font-display font-black text-white tracking-widest uppercase text-xs">
            Dheera Sports Foundation
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-text-muted text-xs font-medium">
          <a href="tel:+919074063030" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3 h-3 text-primary" /> +91-9074063030
          </a>
          <a href="mailto:muktabhinav@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3 h-3 text-primary" /> muktabhinav@gmail.com
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary" /> Shivpuri Link Road, Gwalior
          </span>
        </div>
      </div>

      {/* ── Main Hero Grid ── */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-49px)]">

        {/* Left — Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 relative z-10">
          {/* Ambient orb */}
          <div className="orb w-[500px] h-[500px] bg-[#ff5745] top-[-100px] left-[-200px]" />

          <div className="hero-sub section-label mb-5 relative z-10">
            Section 8 Non-Profit · Gwalior, MP · Est. 2025
          </div>

          <h1 className="font-display font-extrabold uppercase leading-[0.9] mb-8 relative z-10">
            <span className="hero-word block text-text-primary text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Dheera Sports
            </span>
            <span className="hero-word block text-text-primary/60 text-4xl md:text-5xl lg:text-6xl tracking-tight mt-1">
              Transformation
            </span>
            <span className="hero-word block text-5xl md:text-7xl lg:text-8xl tracking-tight mt-3 gradient-text">
              Summer Camp
            </span>
            <span className="hero-word block text-text-subtle text-2xl md:text-3xl tracking-[0.25em] mt-5 font-light">
              2026
            </span>
          </h1>

          <p className="hero-sub text-lg md:text-xl text-text-muted font-medium mb-10 leading-relaxed max-w-md relative z-10">
            Send us a child.{" "}
            <span className="text-text-primary font-semibold italic">
              We give you back an athlete.
            </span>
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap gap-4 relative z-10"
          >
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary">
                Secure Your Spot
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            <Link href="#sports">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-ghost">
                View Disciplines
              </motion.div>
            </Link>
          </motion.div>

          {/* Camp highlights bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="flex flex-wrap gap-5 mt-12 relative z-10"
          >
            {[
              { label: "120 Seats", sub: "Limited intake" },
              { label: "₹12,000", sub: "All-inclusive" },
              { label: "35 Days", sub: "06 May – 09 Jun" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(180deg, #ffb4a9, #ff5745)" }} />
                <div>
                  <p className="font-display font-bold text-text-primary text-sm">{item.label}</p>
                  <p className="text-text-subtle text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Action Image + Stats */}
        <div className="relative overflow-hidden flex flex-col">
          {/* Hero background image */}
          <div className="relative flex-1 min-h-[400px] lg:min-h-0 group">
            <Image
              src="/hero-bg.jpg"
              alt="Children training at Dheera Sports Summer Camp, Gwalior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent lg:hidden" />

            {/* Floating badge */}
            <div className="absolute top-6 right-6 glass rounded-xl p-4 max-w-[160px]">
              <p className="font-display font-extrabold text-3xl gradient-text leading-none">7 AM</p>
              <p className="text-text-muted text-xs font-semibold mt-1 uppercase tracking-wider">– 10 AM Daily</p>
              <p className="text-text-subtle text-xs mt-1">Mon – Sat</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 border-t border-white/5 bg-surface shrink-0">
            {[
              { value: "120", label: "Seats Only" },
              { value: "35", sublabel: "06 MAY – 09 JUN", label: "Days" },
              { value: "6", label: "Sports" },
              { value: "7–20", label: "Years Age" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat-block border-b border-r border-white/5 p-6 hover:bg-primary/5 transition-colors duration-300"
              >
                <p className="font-display font-extrabold text-4xl md:text-5xl leading-none gradient-text">
                  {stat.value}
                </p>
                {stat.sublabel && (
                  <p className="text-xs text-secondary mt-1.5 uppercase tracking-widest font-semibold">
                    {stat.sublabel}
                  </p>
                )}
                <p className="text-xs text-text-subtle uppercase tracking-[0.2em] mt-1.5 font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
