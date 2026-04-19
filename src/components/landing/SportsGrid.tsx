"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";
import { SPORTS, SPORTS_URGENT_BANNER } from "@/data/camp";

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
          <div className="section-label mb-3">{SPORTS.length} Disciplines Available</div>
          <div className="accent-divider" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
            Choose Your{" "}
            <span className="gradient-text">3 Sports</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl text-base leading-relaxed font-medium">
            Pick any 3 from our roster of {SPORTS.length}. All coaching, equipment, and nutrition included in the flat ₹12,000 fee.
          </p>
          
          <div className="mt-6 flex items-center gap-2 p-3 rounded-lg border border-red-500/20 bg-red-500/5 max-w-xl">
            <span className="text-xl">⚠️</span>
            <p className="text-primary text-sm font-semibold">{SPORTS_URGENT_BANNER.replace('⚠️ ', '')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPORTS.map((sport) => (
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
                  {/* Urgent badge */}
                  {sport.urgent && (
                    <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      <p className="text-white text-xs font-bold leading-none tracking-wide">FILLING FAST ⚡</p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-text-primary text-lg tracking-wide mb-1 flex items-center justify-between">
                    {sport.name}
                  </h3>
                  <div
                    className="h-px mb-4 w-8 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${sport.color}, transparent)` }}
                  />
                  <div className="flex justify-between items-center text-sm mt-auto border-t border-white/5 pt-3">
                    <p className="text-text-muted font-medium">{sport.coaches} Coaches</p>
                    <p className="text-text-primary font-bold">{sport.seats_total} Seats</p>
                  </div>
                  {sport.urgent_note && (
                    <p className="text-primary text-xs font-medium mt-2">{sport.urgent_note}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex items-center gap-3 justify-center">
          <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(90deg, transparent, rgba(255,180,169,0.2))" }} />
          <p className="text-text-subtle text-sm font-medium text-center">
            All {SPORTS.length} sports included in the{" "}
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
