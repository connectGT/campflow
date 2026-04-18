"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import { Shield, Trophy, Zap, Users, Calendar, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Certified",
    description:
      "All trainers are NSNIS-certified. Camps are insured and follow strict child safety protocols.",
  },
  {
    icon: Trophy,
    title: "Pro-Level Coaching",
    description:
      "Former national-level athletes coach your children. Small batch sizes ensure personal attention.",
  },
  {
    icon: Zap,
    title: "3 Sports, 1 Price",
    description:
      "Pick any 3 sports from our roster. One flat fee of ₹12,000 covers everything — equipment, coaching, and nutrition.",
  },
  {
    icon: Users,
    title: "Small Batches",
    description:
      "Maximum 15 children per batch. Every child gets the attention they deserve from our coaches.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description:
      "Morning and evening slots available. Pick what works best for your family's routine.",
  },
  {
    icon: Award,
    title: "Certification",
    description:
      "Every child receives a proficiency certificate and a detailed progress report at the end of camp.",
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
    <section ref={containerRef} id="features" className="section-alt py-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-3">Why Choose Dheera</div>
          <div className="accent-divider" />
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight mt-4 max-w-xl">
            Built for <span className="text-primary">Champions</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl text-base leading-relaxed">
            Trusted by 500+ families across India. Here&apos;s what sets us apart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card bg-surface p-8 card-lift group"
            >
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <feature.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-black uppercase text-white text-lg tracking-wide mb-3">
                {feature.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
