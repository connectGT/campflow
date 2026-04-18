"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";

const sports = [
  { name: "Cricket", emoji: "🏏", color: "#C9A84C", trainer: "Rajesh Sharma", time: "6:00 – 8:00 AM" },
  { name: "Swimming", emoji: "🏊", color: "#6B0F1A", trainer: "Priya Menon", time: "7:00 – 9:00 AM" },
  { name: "Football", emoji: "⚽", color: "#0D4F4F", trainer: "Arjun Nair", time: "5:00 – 7:00 PM" },
  { name: "Basketball", emoji: "🏀", color: "#C9A84C", trainer: "Deepika Rao", time: "4:00 – 6:00 PM" },
  { name: "Tennis", emoji: "🎾", color: "#6B0F1A", trainer: "Vikram Singh", time: "6:30 – 8:30 AM" },
  { name: "Badminton", emoji: "🏸", color: "#0D4F4F", trainer: "Sneha Patil", time: "5:30 – 7:30 PM" },
];

export function SportsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sport-card",
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
    <section ref={containerRef} id="sports" className="py-24 px-6 relative bg-background/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-6 tracking-wide">
          Pick Your <span className="gradient-text italic font-mono">3 Sports</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-lg">
          Choose any 3 from our roster. All included in the elite ₹12,000 package.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport, i) => (
            <motion.div
              key={sport.name}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`sport-card glass rounded-none border border-secondary/20 p-8 cursor-pointer transition-shadow duration-300 ${i % 2 === 0 ? 'lg:-translate-y-8' : 'lg:translate-y-4'}`}
              style={{
                boxShadow: `0 0 0px ${sport.color}00`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${sport.color}40, 0 0 60px ${sport.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0px ${sport.color}00`;
              }}
            >
              <span className="text-4xl md:text-5xl mb-6 block text-secondary/80">{sport.emoji}</span>
              <h3 className="font-display text-2xl font-bold mb-2 tracking-wide">
                {sport.name}
              </h3>
              <p className="text-text-muted text-sm mb-1 font-mono uppercase tracking-widest">
                Coach: {sport.trainer}
              </p>
              <p className="text-text-muted text-sm font-mono mt-4 pt-4 border-t border-secondary/20 inline-block text-secondary">
                {sport.time}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SportsGrid;
