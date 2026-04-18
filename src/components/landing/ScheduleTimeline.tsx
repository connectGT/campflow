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
    <section ref={containerRef} className="py-24 px-6 relative bg-surface-container-low/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-6 tracking-wide">
          A Day at <span className="gradient-text italic font-mono">CampFlow</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-lg">
          Morning and evening sessions to fit your family's schedule.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="timeline-line absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-secondary/10 via-secondary/50 to-secondary/10 origin-top"
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
                  <div className="glass rounded-none border-secondary/20 p-6 inline-block w-full max-w-sm hover:bg-surface-bright/5 transition-colors">
                    <span className="text-3xl mb-4 block text-secondary/70">{item.emoji}</span>
                    <h3 className="font-display text-2xl font-bold tracking-wide">{item.sport}</h3>
                    <p className="text-text-muted text-base font-mono uppercase tracking-widest mt-2">{item.trainer}</p>
                    <p className="text-secondary font-mono text-sm mt-4 pt-4 border-t border-secondary/20 block">{item.time}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 w-3 h-3 rounded-none bg-primary border border-secondary shadow-[0_0_10px_rgba(201,168,76,0.6)] shrink-0" />

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
