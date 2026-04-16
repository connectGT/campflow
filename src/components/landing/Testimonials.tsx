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
    <section ref={containerRef} className="py-24 overflow-hidden">
      <div className="px-6 mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          What Parents <span className="gradient-text">Say</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto">
          Real stories from real families across India.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 px-6 overflow-x-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass rounded-2xl p-8 min-w-[340px] md:min-w-[400px] shrink-0"
          >
            <p className="text-text-primary leading-relaxed mb-6 text-sm md:text-base">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-text-muted text-xs">{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
