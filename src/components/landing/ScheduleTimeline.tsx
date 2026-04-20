"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import { IMPORTANT_DATES, CAMP } from "@/data/camp";
import { Icon } from "@/components/ui/IconMapping";

export function ScheduleTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-row",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
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
    <section ref={containerRef} className="py-24 px-8 bg-background relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-[#aacae6] top-0 right-[-100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 grid lg:grid-cols-2 gap-8 items-end">
          <div>
            <div className="section-label mb-3">Important Dates</div>
            <div className="accent-divider" />
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
              Camp{" "}
              <span className="gradient-text">Timeline</span>
            </h2>
          </div>
          <p className="text-text-muted text-base leading-relaxed lg:text-right font-medium">
            {CAMP.DAILY_TIMING}. {CAMP.DAILY_HOURS}, with one weekly rest day.
          </p>
        </div>

        {/* Schedule Table */}
        <div
          className="glass-subtle rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255, 218, 213, 0.08)" }}
        >
          {/* Rows */}
          {IMPORTANT_DATES.map((item, i) => (
            <div
              key={item.date}
              className={`timeline-row grid md:grid-cols-12 group hover:bg-primary/5 transition-colors duration-200 ${
                i % 2 === 1 ? "bg-white/[0.015]" : ""
              } ${i < IMPORTANT_DATES.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "rgba(255, 218, 213, 0.06)" }}
            >
              <div className="px-6 py-5 flex items-center md:col-span-3 border-b md:border-b-0 border-white/5 md:border-r">
                <span className="font-display font-semibold text-primary text-sm tracking-wide bg-primary/10 px-3 py-1 rounded-full">
                  {item.date}
                </span>
              </div>
              <div className="px-6 py-5 flex items-center gap-4 md:col-span-9">
                <Icon name={item.icon} className="w-5 h-5 text-primary shrink-0" />
                <span className="font-display font-semibold text-text-primary text-base tracking-wide">
                  {item.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScheduleTimeline;
