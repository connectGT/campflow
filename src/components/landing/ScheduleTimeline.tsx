"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";

const schedule = [
  { time: "7:00 AM", sport: "Cricket",    trainer: "Rajesh Sharma", emoji: "🏏" },
  { time: "7:00 AM", sport: "Swimming",   trainer: "Priya Menon",   emoji: "🏊" },
  { time: "7:00 AM", sport: "Tennis",     trainer: "Vikram Singh",  emoji: "🎾" },
  { time: "8:30 AM", sport: "Football",   trainer: "Arjun Nair",    emoji: "⚽" },
  { time: "8:30 AM", sport: "Basketball", trainer: "Deepika Rao",   emoji: "🏀" },
  { time: "8:30 AM", sport: "Badminton",  trainer: "Sneha Patil",   emoji: "🏸" },
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
    <section ref={containerRef} className="py-24 px-8 bg-background relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-[#aacae6] top-0 right-[-100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 grid lg:grid-cols-2 gap-8 items-end">
          <div>
            <div className="section-label mb-3">Daily Programme</div>
            <div className="accent-divider" />
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
              A Day at{" "}
              <span className="gradient-text">Camp</span>
            </h2>
          </div>
          <p className="text-text-muted text-base leading-relaxed lg:text-right font-medium">
            Morning and evening sessions, Monday through Saturday. 7 AM – 10 AM daily.
          </p>
        </div>

        {/* Schedule Table */}
        <div
          className="glass-subtle rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255, 218, 213, 0.08)" }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-4 border-b"
            style={{
              background: "rgba(255, 87, 69, 0.08)",
              borderColor: "rgba(255, 218, 213, 0.08)",
            }}
          >
            {["Time", "Sport", "Coach", ""].map((h) => (
              <div
                key={h}
                className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-text-muted font-display"
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {schedule.map((item, i) => (
            <div
              key={item.sport}
              className={`timeline-row grid grid-cols-4 group hover:bg-primary/5 transition-colors duration-200 ${
                i % 2 === 1 ? "bg-white/[0.015]" : ""
              } ${i < schedule.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "rgba(255, 218, 213, 0.06)" }}
            >
              <div className="px-6 py-5 flex items-center">
                <span className="font-display font-semibold text-primary text-sm tracking-wide">
                  {item.time}
                </span>
              </div>
              <div className="px-6 py-5 flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-display font-semibold text-text-primary text-sm tracking-wide">
                  {item.sport}
                </span>
              </div>
              <div className="px-6 py-5 flex items-center">
                <span className="text-text-muted text-sm font-medium">{item.trainer}</span>
              </div>
              <div className="px-6 py-5 flex items-center justify-end">
                <div
                  className="h-px bg-primary/30 group-hover:bg-primary transition-all duration-300"
                  style={{ width: "24px", ["--hover-width" as string]: "40px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScheduleTimeline;
