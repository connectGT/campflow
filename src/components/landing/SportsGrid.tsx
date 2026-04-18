"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";

const sports = [
  { name: "Cricket", emoji: "🏏", color: "#D8473D", trainer: "Rajesh Sharma", time: "6:00 – 8:00 AM" },
  { name: "Swimming", emoji: "🏊", color: "#D8473D", trainer: "Priya Menon", time: "7:00 – 9:00 AM" },
  { name: "Football", emoji: "⚽", color: "#D8473D", trainer: "Arjun Nair", time: "5:00 – 7:00 PM" },
  { name: "Basketball", emoji: "🏀", color: "#D8473D", trainer: "Deepika Rao", time: "4:00 – 6:00 PM" },
  { name: "Tennis", emoji: "🎾", color: "#D8473D", trainer: "Vikram Singh", time: "6:30 – 8:30 AM" },
  { name: "Badminton", emoji: "🏸", color: "#D8473D", trainer: "Sneha Patil", time: "5:30 – 7:30 PM" },
];

export function SportsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sport-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
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
    <section ref={containerRef} id="sports" className="py-24 px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-3">6 Disciplines Available</div>
          <div className="accent-divider" />
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight mt-4">
            Choose Your <span className="text-primary">3 Sports</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl text-base leading-relaxed">
            All included in the elite ₹12,000 package.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sports.map((sport) => (
            <motion.div
              key={sport.name}
              whileHover={{ y: -6 }}
              className="sport-card group cursor-pointer"
            >
              <div className="bg-surface border border-white/5 p-6 text-center group-hover:border-primary/50 transition-colors h-full">
                <div className="text-4xl mb-4 block">{sport.emoji}</div>
                <h3 className="font-black uppercase text-white text-sm tracking-wide mb-3">
                  {sport.name}
                </h3>
                <div className="w-8 h-0.5 bg-primary mx-auto mb-3" />
                <p className="text-text-muted text-xs font-medium uppercase tracking-wider mb-1">
                  {sport.trainer}
                </p>
                <p className="text-primary text-xs font-bold">
                  {sport.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SportsGrid;
