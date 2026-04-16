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
    <section ref={containerRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          Learn from the <span className="gradient-text">Best</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-16">
          Our trainers bring decades of competitive experience to every session.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="trainer-card glass rounded-2xl p-6 hover:translate-y-[-4px] transition-transform duration-300"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold mb-4">
                {trainer.name.charAt(0)}
              </div>

              <h3 className="font-display text-lg font-bold">{trainer.name}</h3>
              <p className="text-primary text-sm font-semibold">{trainer.sport}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                  {trainer.exp}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary">
                  {trainer.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrainerProfiles;
