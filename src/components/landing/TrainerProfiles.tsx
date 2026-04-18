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
    <section ref={containerRef} className="py-24 px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-3">Meet the Coaches</div>
          <div className="accent-divider" />
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight mt-4">
            World-Class <span className="text-primary">Instruction</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl text-base leading-relaxed">
            Every coach is a former competitive athlete with years of coaching experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="trainer-card bg-surface border border-white/5 p-8 card-lift group hover:border-primary/40 transition-colors"
            >
              {/* Avatar */}
              <div className="w-16 h-16 bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-2xl font-black text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {trainer.name.charAt(0)}
              </div>

              <h3 className="font-black uppercase text-white text-lg tracking-wide mb-1">
                {trainer.name}
              </h3>
              <p className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-5">
                {trainer.sport}
              </p>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted uppercase text-xs tracking-wider font-bold">Experience</span>
                  <span className="text-white font-bold">{trainer.exp}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted uppercase text-xs tracking-wider font-bold">Credentials</span>
                  <span className="text-primary text-xs font-black uppercase tracking-wide">{trainer.badge}</span>
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
