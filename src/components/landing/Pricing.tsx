"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import { Check, ArrowRight } from "lucide-react";
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-alt py-24 px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Heading */}
        <div>
          <div className="section-label mb-3">Simple, Transparent</div>
          <div className="accent-divider" />
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight mt-4 mb-6">
            One Price. <span className="text-primary">Everything</span> Included.
          </h2>
          <p className="text-text-muted text-base leading-relaxed mb-8">
            No hidden fees. No upsells. One flat rate for a summer that will change your child forever.
          </p>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Price Card */}
        <div className="pricing-card bg-background border border-white/10 p-10 relative overflow-hidden">
          {/* Red corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10" />
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-primary border-l-[80px] border-l-transparent opacity-30" />

          <p className="section-label mb-3">Transformation Package</p>
          <div className="flex items-start gap-2 mb-2">
            <span className="text-3xl text-text-muted font-bold mt-3">₹</span>
            <span className="font-black text-8xl text-white leading-none">12</span>
            <span className="font-black text-4xl text-text-muted self-end mb-4">,000</span>
          </div>
          <p className="text-text-muted text-sm mb-8 uppercase font-bold tracking-wider">
            Per athlete · One-time fee
          </p>

          <div className="border-t border-white/10 pt-8 space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Duration</span>
              <span className="text-white font-bold">35 Days (06 May – 09 Jun)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Sports Included</span>
              <span className="text-white font-bold">Any 3 of 6</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Batch Size</span>
              <span className="text-white font-bold">Max 15 children</span>
            </div>
          </div>

          <Link href="/register" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center text-center"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
