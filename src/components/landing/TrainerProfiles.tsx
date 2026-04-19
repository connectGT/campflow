"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";
import { FOUNDING_DIRECTORS, EXPERT_TEAM, STAFF_TOTAL_LABEL } from "@/data/camp";

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
            <div className="absolute bottom-6 left-6 glass rounded-xl p-4 max-w-[250px]">
              <p className="font-display font-bold text-text-primary text-sm">Professional Staff</p>
              <p className="text-text-muted text-xs mt-1">{STAFF_TOTAL_LABEL}</p>
            </div>
          </div>

          <div>
            <div className="section-label mb-3">Our Team</div>
            <div className="accent-divider" />
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 mb-6 leading-tight">
              World-Class{" "}
              <span className="gradient-text">Instruction</span>
            </h2>
            <p className="text-text-muted text-base leading-relaxed font-medium mb-8">
              Guided by professional coaches, sports psychologists, nutritional experts, and wellness practitioners.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-subtle rounded-xl p-5 text-center border-l-2 border-[#ff5745]">
                <p className="font-display font-bold text-lg text-text-primary mb-1">Founding Directors</p>
                <p className="text-text-subtle text-xs font-medium">{FOUNDING_DIRECTORS.length} Visionaries</p>
              </div>
              <div className="glass-subtle rounded-xl p-5 text-center border-l-2 border-[#aacae6]">
                <p className="font-display font-bold text-lg text-text-primary mb-1">Expert Team</p>
                <p className="text-text-subtle text-xs font-medium">{EXPERT_TEAM.length} Lead Specialists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Directors */}
        <div className="mb-16">
          <h3 className="font-display font-extrabold text-2xl mb-8 flex items-center gap-4">
            Founding Directors
            <div className="h-px flex-1 bg-white/5" />
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {FOUNDING_DIRECTORS.map((trainer) => (
              <div key={trainer.name} className="trainer-card glass-subtle rounded-xl p-6 card-lift group hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[#111316] font-black text-lg shrink-0"
                    style={{ background: `linear-gradient(135deg, ${trainer.color}, #ff5745)` }}
                  >
                    {trainer.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-text-primary text-base tracking-wide leading-tight">
                      {trainer.name}
                    </h4>
                    <p className="text-secondary text-xs font-bold uppercase tracking-[0.1em] mt-0.5">
                      {trainer.role}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-primary text-xs font-bold uppercase tracking-wide">{trainer.credentials}</p>
                </div>
                <p className="text-text-muted text-xs leading-relaxed border-t border-white/5 pt-4">
                  {trainer.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Team */}
        <div>
          <h3 className="font-display font-extrabold text-2xl mb-8 flex items-center gap-4">
            Expert Coaching Team
            <div className="h-px flex-1 bg-white/5" />
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERT_TEAM.map((trainer) => (
              <div key={trainer.name} className="trainer-card glass-subtle rounded-xl p-5 card-lift group hover:border-primary/20 transition-all duration-300">
                <h4 className="font-display font-bold text-text-primary text-base tracking-wide mb-1">
                  {trainer.name}
                </h4>
                <p className="text-secondary text-xs font-bold uppercase tracking-[0.1em] mb-4">
                  {trainer.role}
                </p>
                <div className="h-px w-8 bg-white/10 mb-4" />
                <p className="text-text-muted text-xs leading-relaxed font-medium">
                  {trainer.credentials}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrainerProfiles;
