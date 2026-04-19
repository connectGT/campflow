"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";
import { TRANSFORMATION_PILLARS, TRANSFORMATION_PROOF_LINE } from "@/data/camp";

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-[#aacae6] top-[50%] right-[-200px] translate-y-[-50%]" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="section-label mb-3">5 Pillars of Growth</div>
          <div className="accent-divider" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
            The Transformation <span className="gradient-text">Pillars</span>
          </h2>
          <p className="text-text-muted mt-4 text-base leading-relaxed font-medium">
            We are not offering a recreational camp. We are offering a 35-day structured transformation.
          </p>
        </div>

        {/* Image + Features split layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Features grid — 2 cols on left */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {TRANSFORMATION_PILLARS.map((feature) => (
              <div
                key={feature.title}
                className="feature-card glass-subtle rounded-xl p-6 card-lift group hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 text-2xl"
                  style={{ background: "rgba(255, 87, 69, 0.12)", border: "1px solid rgba(255, 180, 169, 0.2)" }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-display font-bold text-text-primary text-sm tracking-wide mb-1.5 uppercase tracking-[0.1em]">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>

          {/* Image column — right side */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden h-96 lg:h-full min-h-[400px]">
              <Image
                src="/features-bg.jpg"
                alt="Children enjoying summer sports camp activities at Dheera Sports Foundation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-xl p-4">
                  <p className="font-display font-medium text-text-primary text-xs leading-relaxed">
                    &ldquo;{TRANSFORMATION_PROOF_LINE.split('.').slice(0,2).join('.')}. <span className="gradient-text font-bold block mt-2">{TRANSFORMATION_PROOF_LINE.split('.').slice(2).join('.').trim()}</span>&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
