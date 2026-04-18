"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";

const testimonials = [
  {
    name: "Sunita Reddy",
    city: "Hyderabad",
    text: "My son loved every minute of the cricket sessions. The coaches were patient and truly skilled. He came back a different kid — more confident and disciplined.",
  },
  {
    name: "Amit Deshmukh",
    city: "Pune",
    text: "The best decision we made this summer. Both our daughters picked swimming and basketball. The facilities were top-notch and the batch sizes kept things personal.",
  },
  {
    name: "Kavitha Nair",
    city: "Kochi",
    text: "CampFlow made registration so easy — 3 minutes on the phone and done. The WhatsApp updates throughout camp were a great touch for us parents.",
  },
  {
    name: "Rajiv Gupta",
    city: "Delhi",
    text: "₹12,000 for 3 sports with equipment included? That's incredible value. My kid learned tennis, football, and badminton in one summer.",
  },
  {
    name: "Prerna Joshi",
    city: "Bangalore",
    text: "The progress report at the end was so detailed. We could see exactly how much our son improved in each sport. Already registering for next year!",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      const totalWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      gsap.to(scrollContainer, {
        scrollLeft: totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-background">
      <div className="px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-3">Parent Testimonials</div>
          <div className="accent-divider" />
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight mt-4">
            What Families <span className="text-primary">Say</span>
          </h2>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 px-8 overflow-x-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-surface border border-white/5 p-8 min-w-[340px] md:min-w-[420px] shrink-0 hover:border-primary/30 transition-colors"
          >
            {/* Quote mark */}
            <div className="text-primary text-5xl font-black leading-none mb-4">"</div>
            <p className="text-white leading-relaxed mb-8 text-base font-medium">
              {t.text}
            </p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-black text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-black uppercase text-white text-sm tracking-wide">{t.name}</p>
                <p className="text-primary text-xs font-bold uppercase tracking-[0.15em]">{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
