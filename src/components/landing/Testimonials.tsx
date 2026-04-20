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
    <section ref={containerRef} className="py-24 overflow-hidden bg-background relative">
      <div className="orb w-[500px] h-[500px] bg-[#ffb4a9] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />

      <div className="px-8 mb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-3">Parent Testimonials</div>
          <div className="accent-divider" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
            What Families{" "}
            <span className="gradient-text">Say</span>
          </h2>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 px-8 overflow-x-hidden relative z-10"
        style={{ scrollBehavior: "auto" }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass-subtle rounded-2xl p-8 min-w-[340px] md:min-w-[400px] shrink-0 hover:border-primary/20 transition-all duration-300 card-lift"
          >
            {/* Quote mark */}
            <div className="text-5xl font-black leading-none mb-4 gradient-text">&ldquo;</div>
            <p className="text-text-primary leading-relaxed mb-8 text-base font-medium">
              {t.text}
            </p>
            <div
              className="flex items-center gap-4 border-t pt-6"
              style={{ borderColor: "rgba(255, 218, 213, 0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#111316] font-black text-sm shrink-0"
                style={{ background: "linear-gradient(135deg, #ffb4a9, #ff5745)" }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-display font-bold text-text-primary text-sm tracking-wide">{t.name}</p>
                <p className="text-secondary text-xs font-semibold uppercase tracking-[0.12em] mt-0.5">{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
