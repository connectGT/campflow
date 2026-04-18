"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";

const sports = [
  {
    name: "Cricket",
    emoji: "🏏",
    trainer: "Rajesh Sharma",
    credential: "State-level player",
    time: "7:00 – 8:30 AM",
    image: "/sport-cricket.jpg",
    color: "#ff5745",
  },
  {
    name: "Swimming",
    emoji: "🏊",
    trainer: "Priya Menon",
    credential: "National medalist",
    time: "7:00 – 8:30 AM",
    image: "/sport-swimming.jpg",
    color: "#aacae6",
  },
  {
    name: "Football",
    emoji: "⚽",
    trainer: "Arjun Nair",
    credential: "I-League coach",
    time: "8:30 – 10:00 AM",
    image: "/sport-football.jpg",
    color: "#ff5745",
  },
  {
    name: "Basketball",
    emoji: "🏀",
    trainer: "Deepika Rao",
    credential: "University champion",
    time: "8:30 – 10:00 AM",
    image: "/sport-basketball.jpg",
    color: "#ffb4a9",
  },
  {
    name: "Tennis",
    emoji: "🎾",
    trainer: "Vikram Singh",
    credential: "AITA certified",
    time: "7:00 – 8:30 AM",
    image: "/sport-tennis.jpg",
    color: "#ff8a7d",
  },
  {
    name: "Badminton",
    emoji: "🏸",
    trainer: "Sneha Patil",
    credential: "National ranked",
    time: "8:30 – 10:00 AM",
    image: "/sport-badminton.jpg",
    color: "#5ed9d6",
  },
];

export function SportsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sport-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="sports" className="py-24 px-8 section-alt relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-[#ff5745] bottom-0 left-[-120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="section-label mb-3">6 Disciplines Available</div>
          <div className="accent-divider" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
            Choose Your{" "}
            <span className="gradient-text">3 Sports</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl text-base leading-relaxed font-medium">
            Pick any 3 from our roster of 6. All coaching, equipment, and nutrition included in the flat ₹12,000 fee.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sports.map((sport) => (
            <motion.div
              key={sport.name}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="sport-card group cursor-pointer"
            >
              <div className="glass-subtle rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/25 transition-all duration-300">
                {/* Sport image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={sport.image}
                    alt={`${sport.name} training at Dheera Sports Camp`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1f] via-[#1a1c1f]/30 to-transparent" />
                  {/* Emoji badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-xl glass">
                    {sport.emoji}
                  </div>
                  {/* Time badge */}
                  <div className="absolute top-3 right-3 glass rounded-lg px-2.5 py-1.5">
                    <p className="text-primary text-xs font-bold leading-none">{sport.time}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-text-primary text-lg tracking-wide mb-1">
                    {sport.name}
                  </h3>
                  <div
                    className="h-px mb-3 w-8 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${sport.color}, transparent)` }}
                  />
                  <p className="text-text-muted text-sm font-medium mb-0.5">{sport.trainer}</p>
                  <p className="text-text-subtle text-xs">{sport.credential}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex items-center gap-3 justify-center">
          <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(90deg, transparent, rgba(255,180,169,0.2))" }} />
          <p className="text-text-subtle text-sm font-medium text-center">
            All 6 sports included in the{" "}
            <span className="text-primary font-semibold">₹12,000 package</span>
            {" "}— pick any 3
          </p>
          <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(270deg, transparent, rgba(255,180,169,0.2))" }} />
        </div>
      </div>
    </section>
  );
}

export default SportsGrid;
