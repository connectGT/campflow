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
      // Timeline scrub — cards reveal as user scrolls
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      // Animate the vertical line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          A Day at <span className="gradient-text">CampFlow</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-16">
          Morning and evening sessions to fit your schedule.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="timeline-line absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary via-secondary to-primary origin-top"
          />

          <div className="space-y-12">
            {schedule.map((item, i) => (
              <div
                key={item.sport}
                className={`timeline-card flex items-center gap-6 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="glass rounded-2xl p-6 inline-block">
                    <span className="text-3xl mb-2 block">{item.emoji}</span>
                    <h3 className="font-display text-lg font-bold">{item.sport}</h3>
                    <p className="text-text-muted text-sm">{item.trainer}</p>
                    <p className="text-secondary font-mono text-sm mt-1">{item.time}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-2 border-background shrink-0" />

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScheduleTimeline;
