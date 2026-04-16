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
    <section ref={containerRef} className="py-24 px-6">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Simple <span className="gradient-text">Pricing</span>
        </h2>
        <p className="text-text-muted mb-16">
          One price. Everything included. No hidden fees.
        </p>

        <div className="pricing-card glass-strong rounded-2xl p-8 md:p-10 glow-primary relative overflow-hidden">
          {/* Popular badge */}
          <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            Most Popular
          </div>

          <p className="text-text-muted text-sm uppercase tracking-wider mb-2">
            Summer Camp Package
          </p>
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-text-muted text-2xl">₹</span>
            <span className="font-display text-6xl md:text-7xl font-bold">
              12,000
            </span>
          </div>
          <p className="text-text-muted text-sm mb-8">per child · one-time</p>

          <div className="text-left space-y-3 mb-8">
            {included.map((item) => (
              <div key={item} className="check-item flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-secondary" />
                </div>
                <span className="text-sm text-text-primary">{item}</span>
              </div>
            ))}
          </div>

          <Link href="/register" className="block">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-4 font-semibold text-lg transition-colors text-center cursor-pointer"
            >
              Register Now
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
