"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";

const trainers = [
  { name: "Rajesh Sharma", sport: "Cricket", exp: "15 years", badge: "State-level player" },
  { name: "Priya Menon", sport: "Swimming", exp: "12 years", badge: "National medalist" },
  { name: "Arjun Nair", sport: "Football", exp: "10 years", badge: "I-League coach" },
  { name: "Deepika Rao", sport: "Basketball", exp: "8 years", badge: "University champion" },
  { name: "Vikram Singh", sport: "Tennis", exp: "14 years", badge: "AITA certified" },
  { name: "Sneha Patil", sport: "Badminton", exp: "11 years", badge: "National ranked" },
];

export function TrainerProfiles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trainer-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
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
    <section ref={containerRef} className="py-24 px-6 bg-surface-container-low/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-6 tracking-wide">
          World-Class <span className="gradient-text italic font-mono">Instruction</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-lg">
          Our specialized coaches bring decades of competitive experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="trainer-card glass rounded-none border-secondary/20 p-8 hover:bg-surface-bright/5 hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group hover:shadow-xl hover:shadow-secondary/5"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full filter blur-xl transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>

              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-none bg-background border border-secondary/40 flex items-center justify-center text-3xl font-display font-bold text-secondary mb-6 relative z-10 shadow-inner shadow-primary/20">
                {trainer.name.charAt(0)}
              </div>

              <h3 className="font-display text-xl font-bold tracking-wide relative z-10">{trainer.name}</h3>
              <p className="text-secondary text-sm font-mono uppercase tracking-widest mt-1 mb-4 relative z-10">{trainer.sport}</p>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-secondary/20 relative z-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-muted font-mono uppercase text-xs tracking-wider">Experience</span>
                  <span className="text-text-primary">{trainer.exp}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-muted font-mono uppercase text-xs tracking-wider">Credentials</span>
                  <span className="text-primary text-xs uppercase tracking-wider font-semibold">{trainer.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrainerProfiles;
