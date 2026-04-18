"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import { Check } from "lucide-react";
import Link from "next/link";

const included = [
  "3 sports of your choice",
  "Professional coaching",
  "All equipment provided",
  "Nutrition & hydration",
  "Progress report & certificate",
  "Insurance coverage",
  "Small batch (max 15 kids)",
  "Morning & evening slots",
];

export function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".check-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pricing-card",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 relative">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-wide">
          Sovereign <span className="gradient-text italic font-mono">Pricing</span>
        </h2>
        <p className="text-text-muted mb-16 text-lg">
          One elite tier. Everything included. No hidden fees.
        </p>

        <div className="pricing-card glass-strong rounded-none border border-secondary/40 p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-primary/10">
          {/* Popular badge */}
          <div className="absolute top-4 right-4 bg-primary text-text-primary text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-none border border-secondary/30">
            Gold Tier
          </div>

          <p className="text-secondary text-sm uppercase tracking-widest mb-4 font-mono font-bold">
            Transformation Package
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-8">
            <span className="text-text-muted text-3xl font-mono">₹</span>
            <span className="font-display text-7xl md:text-8xl font-bold text-text-primary drop-shadow-[0_0_15px_rgba(201,168,76,0.2)]">
              12,000
            </span>
          </div>
          <p className="text-text-muted text-sm mb-10 font-mono tracking-wide">per athlete · one-time</p>

          <div className="text-left space-y-4 mb-10 pt-8 border-t border-secondary/20">
            {included.map((item) => (
              <div key={item} className="check-item flex items-center gap-4">
                <div className="w-6 h-6 border border-secondary/40 bg-background/50 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-secondary glow-secondary" />
                </div>
                <span className="text-base text-text-primary font-mono">{item}</span>
              </div>
            ))}
          </div>

          <Link href="/register" className="block">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary-hover text-text-primary rounded-none border border-secondary/30 px-6 py-4 font-mono font-bold tracking-widest uppercase text-lg transition-colors text-center cursor-pointer shadow-lg shadow-primary/20"
            >
              Secure Application
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
