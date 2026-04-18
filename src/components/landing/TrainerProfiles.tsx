"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";

const trainers = [
  { name: "Rajesh Sharma",  sport: "Cricket",    exp: "15 years", badge: "State-level player",    initial: "R", color: "#ff5745" },
  { name: "Priya Menon",    sport: "Swimming",   exp: "12 years", badge: "National medalist",      initial: "P", color: "#aacae6" },
  { name: "Arjun Nair",     sport: "Football",   exp: "10 years", badge: "I-League coach",         initial: "A", color: "#ff8a7d" },
  { name: "Deepika Rao",    sport: "Basketball", exp: "8 years",  badge: "University champion",    initial: "D", color: "#ffb4a9" },
  { name: "Vikram Singh",   sport: "Tennis",     exp: "14 years", badge: "AITA certified",         initial: "V", color: "#ff5745" },
  { name: "Sneha Patil",    sport: "Badminton",  exp: "11 years", badge: "National ranked",        initial: "S", color: "#5ed9d6" },
];

export function TrainerProfiles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trainer-card",
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
    <section ref={containerRef} className="py-24 px-8 section-alt relative overflow-hidden">
      <div className="orb w-[450px] h-[450px] bg-[#ff5745] top-[50%] right-[-120px] translate-y-[-50%]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Split layout: image on left, text on right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative rounded-2xl overflow-hidden h-72 lg:h-full min-h-[320px]">
            <Image
              src="/trainer-coaching.jpg"
              alt="Dheera Sports Foundation coach training children, Gwalior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60" />
            <div className="absolute bottom-6 left-6 glass rounded-xl p-4">
              <p className="font-display font-bold text-text-primary text-sm">NSNIS Certified</p>
              <p className="text-text-muted text-xs mt-1">All coaches hold national certifications</p>
            </div>
          </div>

          <div>
            <div className="section-label mb-3">Meet the Coaches</div>
            <div className="accent-divider" />
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 mb-6 leading-tight">
              World-Class{" "}
              <span className="gradient-text">Instruction</span>
            </h2>
            <p className="text-text-muted text-base leading-relaxed font-medium mb-8">
              Every coach at Dheera is a former competitive athlete. Our trainers bring real-world experience — state trophies, national rankings, and professional coaching credentials — to every session.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "6", sub: "Expert Coaches" },
                { label: "100+", sub: "Yrs Combined Exp." },
                { label: "500+", sub: "Students Trained" },
              ].map((s) => (
                <div key={s.label} className="glass-subtle rounded-xl p-4 text-center">
                  <p className="font-display font-extrabold text-2xl gradient-text leading-none">{s.label}</p>
                  <p className="text-text-subtle text-xs mt-1 font-medium">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trainer cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="trainer-card glass-subtle rounded-xl p-6 card-lift group hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[#111316] font-black text-base shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${trainer.color}, #ff5745)` }}
                >
                  {trainer.initial}
                </div>
                <div>
                  <h3 className="font-display font-bold text-text-primary text-base tracking-wide leading-tight">
                    {trainer.name}
                  </h3>
                  <p className="text-secondary text-xs font-bold uppercase tracking-[0.15em] mt-0.5">
                    {trainer.sport}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5" style={{ borderTop: "1px solid rgba(255,218,213,0.08)", paddingTop: "1rem" }}>
                <div className="flex justify-between">
                  <span className="text-text-subtle text-xs uppercase tracking-wider font-semibold">Experience</span>
                  <span className="text-text-primary text-sm font-semibold">{trainer.exp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-subtle text-xs uppercase tracking-wider font-semibold">Credentials</span>
                  <span className="text-primary text-xs font-semibold uppercase tracking-wide">{trainer.badge}</span>
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
