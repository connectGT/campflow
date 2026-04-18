"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";

const schedule = [
  { time: "6:00 AM", sport: "Cricket", trainer: "Rajesh Sharma", emoji: "🏏" },
  { time: "7:00 AM", sport: "Swimming", trainer: "Priya Menon", emoji: "🏊" },
  { time: "4:00 PM", sport: "Basketball", trainer: "Deepika Rao", emoji: "🏀" },
  { time: "5:00 PM", sport: "Football", trainer: "Arjun Nair", emoji: "⚽" },
  { time: "5:30 PM", sport: "Badminton", trainer: "Sneha Patil", emoji: "🏸" },
  { time: "6:30 AM", sport: "Tennis", trainer: "Vikram Singh", emoji: "🎾" },
];

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
    <section ref={containerRef} className="section-alt py-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 grid lg:grid-cols-2 gap-8 items-end">
          <div>
            <div className="section-label mb-3">Daily Programme</div>
            <div className="accent-divider" />
            <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight mt-4">
              A Day at <span className="text-primary">Camp</span>
            </h2>
          </div>
          <p className="text-text-muted text-base leading-relaxed lg:text-right">
            Morning and evening sessions, Monday through Saturday. 7 AM – 10 AM daily.
          </p>
        </div>

        {/* Schedule Table */}
        <div className="border border-white/10">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-primary/10 border-b border-white/10">
            {["Time", "Sport", "Coach", ""].map((h) => (
              <div
                key={h}
                className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted"
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {schedule.map((item, i) => (
            <div
              key={item.sport}
              className={`timeline-row grid grid-cols-4 border-b border-white/5 group hover:bg-primary/5 transition-colors ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}
            >
              <div className="px-6 py-5 flex items-center">
                <span className="font-black text-primary text-sm tracking-wide">{item.time}</span>
              </div>
              <div className="px-6 py-5 flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-black uppercase text-white text-sm tracking-wide">{item.sport}</span>
              </div>
              <div className="px-6 py-5 flex items-center">
                <span className="text-text-muted text-sm font-medium">{item.trainer}</span>
              </div>
              <div className="px-6 py-5 flex items-center justify-end">
                <div className="w-6 h-0.5 bg-primary/40 group-hover:w-10 group-hover:bg-primary transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScheduleTimeline;
