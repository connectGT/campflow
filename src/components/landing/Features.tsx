"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import { Shield, Trophy, Zap, Users, Calendar, Award } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Shield,
    title: "Safe & Certified",
    description: "All trainers are NSNIS-certified. Camps are insured and follow strict child safety protocols.",
  },
  {
    icon: Trophy,
    title: "Pro-Level Coaching",
    description: "Former national-level athletes coach your children. Small batch sizes ensure personal attention.",
  },
  {
    icon: Zap,
    title: "3 Sports, 1 Price",
    description: "Pick any 3 sports from our roster. One flat fee of ₹12,000 covers everything — equipment, coaching, and nutrition.",
  },
  {
    icon: Users,
    title: "Small Batches",
    description: "Maximum 15 children per batch. Every child gets the attention they deserve from our coaches.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Morning sessions 7–10 AM and evening slots available. Pick what works best for your family.",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Every child receives a proficiency certificate and a detailed progress report at the end of camp.",
  },
];

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
        <div className="mb-16 max-w-2xl">
          <div className="section-label mb-3">Why Choose Dheera</div>
          <div className="accent-divider" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
            Built for <span className="gradient-text">Champions</span>
          </h2>
          <p className="text-text-muted mt-4 text-base leading-relaxed font-medium">
            Trusted by 500+ families across India. Here&apos;s what sets Dheera apart from the rest.
          </p>
        </div>

        {/* Image + Features split layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Features grid — 2 cols on left */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card glass-subtle rounded-xl p-6 card-lift group hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255, 87, 69, 0.12)", border: "1px solid rgba(255, 180, 169, 0.2)" }}
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-sm tracking-wide mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Image column — right side */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden h-80">
              <Image
                src="/features-bg.jpg"
                alt="Children enjoying summer sports camp activities at Dheera Sports Foundation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-xl p-4">
                  <p className="font-display font-bold text-text-primary text-sm leading-tight">
                    &ldquo;Send us a child.{" "}
                    <span className="gradient-text">We give you back an athlete.&rdquo;</span>
                  </p>
                  <p className="text-text-subtle text-xs mt-2 uppercase tracking-wider">— Dheera Sports Foundation</p>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "500+", sub: "Families Trusted" },
                { label: "2025", sub: "Established" },
                { label: "Sec. 8", sub: "Non-Profit NGO" },
                { label: "Gwalior", sub: "Madhya Pradesh" },
              ].map((f) => (
                <div key={f.label} className="glass-subtle rounded-xl p-4 text-center">
                  <p className="font-display font-extrabold text-xl gradient-text leading-none">{f.label}</p>
                  <p className="text-text-subtle text-xs mt-1 font-medium">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
