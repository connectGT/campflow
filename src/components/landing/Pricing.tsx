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
    <section ref={containerRef} className="py-24 px-8 bg-background relative overflow-hidden">
      {/* Orbs */}
      <div className="orb w-[450px] h-[450px] bg-[#ff5745] top-0 right-[-150px]" />
      <div className="orb w-[300px] h-[300px] bg-[#aacae6] bottom-0 left-[-80px]" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — Heading */}
        <div>
          <div className="section-label mb-3">Simple, Transparent</div>
          <div className="accent-divider" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 mb-6 leading-tight">
            One Price.{" "}
            <span className="gradient-text">Everything</span>{" "}
            Included.
          </h2>
          <p className="text-text-muted text-base leading-relaxed mb-8 font-medium">
            No hidden fees. No upsells. One flat rate for a summer that will change your child forever.
          </p>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #ffb4a9, #ff5745)" }}
                >
                  <Check className="w-3 h-3 text-[#111316]" strokeWidth={3} />
                </div>
                <span className="text-text-primary text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Price Card */}
        <div className="pricing-card glass rounded-2xl p-10 relative overflow-hidden">
          {/* Decorative gradient corner */}
          <div
            className="absolute top-0 right-0 w-48 h-48 opacity-10 rounded-full blur-3xl"
            style={{ background: "linear-gradient(135deg, #ffb4a9, #ff5745)" }}
          />

          <p className="section-label mb-3">Transformation Package</p>
          <div className="flex items-start gap-2 mb-2">
            <span className="text-2xl text-text-muted font-bold mt-4">₹</span>
            <span className="font-display font-extrabold text-8xl text-text-primary leading-none gradient-text">
              12
            </span>
            <span className="font-display font-extrabold text-4xl text-text-muted self-end mb-4">,000</span>
          </div>
          <p className="text-text-muted text-sm mb-8 uppercase font-bold tracking-wider">
            Per athlete · One-time fee
          </p>

          <div
            className="border-t pt-8 space-y-3 mb-8"
            style={{ borderColor: "rgba(255, 218, 213, 0.1)" }}
          >
            <div className="flex justify-between text-sm">
              <span className="text-text-muted font-medium">Duration</span>
              <span className="text-text-primary font-semibold">35 Days (06 May – 09 Jun)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted font-medium">Sports Included</span>
              <span className="text-text-primary font-semibold">Any 3 of 6</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted font-medium">Batch Size</span>
              <span className="text-text-primary font-semibold">Max 15 children</span>
            </div>
          </div>

          <Link href="/register" className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full"
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
