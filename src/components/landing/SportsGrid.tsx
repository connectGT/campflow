"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";

const sports = [
  { name: "Cricket", emoji: "🏏", color: "#6C63FF", trainer: "Rajesh Sharma", time: "6:00 – 8:00 AM" },
  { name: "Swimming", emoji: "🏊", color: "#00D4AA", trainer: "Priya Menon", time: "7:00 – 9:00 AM" },
  { name: "Football", emoji: "⚽", color: "#FF4D6D", trainer: "Arjun Nair", time: "5:00 – 7:00 PM" },
  { name: "Basketball", emoji: "🏀", color: "#FF8C42", trainer: "Deepika Rao", time: "4:00 – 6:00 PM" },
  { name: "Tennis", emoji: "🎾", color: "#FFD93D", trainer: "Vikram Singh", time: "6:30 – 8:30 AM" },
  { name: "Badminton", emoji: "🏸", color: "#6C63FF", trainer: "Sneha Patil", time: "5:30 – 7:30 PM" },
];

export function SportsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sport-card",
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
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
    <section ref={containerRef} id="sports" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          Pick Your <span className="gradient-text">3 Sports</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-16">
          Choose any 3 from our roster. All included in the ₹12,000 package.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <motion.div
              key={sport.name}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="sport-card glass rounded-2xl p-6 md:p-8 cursor-pointer transition-shadow duration-300"
              style={{
                boxShadow: `0 0 0px ${sport.color}00`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${sport.color}30, 0 0 60px ${sport.color}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0px ${sport.color}00`;
              }}
            >
              <span className="text-4xl md:text-5xl mb-4 block">{sport.emoji}</span>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                {sport.name}
              </h3>
              <p className="text-text-muted text-sm mb-1">
                Coach: {sport.trainer}
              </p>
              <p className="text-text-muted text-sm font-mono">
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
