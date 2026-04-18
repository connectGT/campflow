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
    glow: "glow-primary",
  },
  {
    icon: Trophy,
    title: "Pro-Level Coaching",
    description:
      "Former national-level athletes coach your children. Small batch sizes ensure personal attention.",
    glow: "",
  },
  {
    icon: Zap,
    title: "3 Sports, 1 Price",
    description:
      "Pick any 3 sports from our roster. One flat fee of ₹12,000 covers everything — equipment, coaching, and nutrition.",
    glow: "glow-secondary",
  },
  {
    icon: Users,
    title: "Small Batches",
    description:
      "Maximum 15 children per batch. Every child gets the attention they deserve from our coaches.",
    glow: "",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description:
      "Morning and evening slots available. Pick what works best for your family's routine.",
    glow: "glow-primary",
  },
  {
    icon: Award,
    title: "Certification",
    description:
      "Every child receives a proficiency certificate and a detailed progress report at the end of camp.",
    glow: "",
  },
];

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
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
    <section ref={containerRef} id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-left mb-6 tracking-wide">
          Why Parents <span className="gradient-text italic font-mono">Choose Us</span>
        </h2>
        <p className="text-text-muted text-left max-w-2xl mb-16 text-lg">
          Trusted by 500+ families across India. A premier athletic transformation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`feature-card glass p-8 transition-all duration-300 hover:bg-surface-bright/5 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/20 ${feature.glow} ${i % 2 === 1 ? 'md:mt-12' : ''}`}
            >
              <feature.icon className="w-10 h-10 text-secondary mb-6" />
              <h3 className="font-display text-2xl font-semibold mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-text-muted leading-relaxed font-mono">
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
