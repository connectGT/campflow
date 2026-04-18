"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered heading word reveal
      const words = headingRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll(".stat-num");
      statNumbers?.forEach((el) => {
        const target = parseInt(el.getAttribute("data-value") || "0", 10);
        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: target,
            duration: 2,
            delay: 1,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Floating orbs parallax
      gsap.to(".orb-hero-1", {
        y: -80,
        x: 30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-hero-2", {
        y: 60,
        x: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-hero-3", {
        y: -40,
        x: 50,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-background"
    >
      {/* Corner Embellishments */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-secondary/40 z-0"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-secondary/40 z-0"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-secondary/40 z-0"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-secondary/40 z-0"></div>

      {/* Top Header Placeholder (can be moved to a global Header later) */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-20">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-primary flex items-center justify-center text-secondary font-display text-sm font-bold border border-secondary/50 shadow-inner">
            Dheera
          </div>
          <div>
            <h2 className="text-secondary font-display text-lg tracking-[0.2em] uppercase">
              Dheera Sports Foundation
            </h2>
            <p className="text-secondary/70 italic font-sans text-sm">
              "Forging Olympic Dreams. Awakening Conscious Spirits."
            </p>
          </div>
        </div>
        <div className="text-right font-sans text-sm text-secondary/80 space-y-2">
          <p className="flex items-center justify-end gap-2">📞 +91-9074063030</p>
          <p className="flex items-center justify-end gap-2">✉️ muktabhinav@gmail.com</p>
          <p className="flex items-center justify-end gap-2">📍 Shivpuri Link Road, Gwalior</p>
        </div>
      </div>

      <div className="relative z-10 text-center w-full max-w-6xl mx-auto pt-24">
        {/* Sub-heading banner */}
        <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-[0.2em] text-secondary/60 mb-6 uppercase">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-secondary/40"></div>
          <p>Section 8 Non-Profit · Gwalior, MP · Est. 2025</p>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-secondary/40"></div>
        </div>

        {/* Heading with word-by-word reveal */}
        <h1
          ref={headingRef}
          className="font-display font-bold leading-none tracking-wide text-center uppercase"
          style={{ perspective: "800px" }}
        >
          <div className="word block text-secondary text-6xl md:text-8xl lg:text-[7.5rem] tracking-tight drop-shadow-sm">Dheera Sports</div>
          <div className="word block text-text-primary text-5xl md:text-7xl lg:text-[5.5rem] tracking-widest mt-2">Transformation</div>
          <div className="word block text-primary text-7xl md:text-9xl lg:text-[9rem] tracking-tighter mt-1" style={{ textShadow: "0 5px 25px rgba(107, 15, 26, 0.6)" }}>Summer Camp</div>
          <div className="word block text-secondary/50 text-4xl md:text-5xl mt-6 tracking-[0.8em]">2026</div>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-2xl md:text-3xl text-secondary mt-12 mb-16 italic font-sans"
        >
          Send us a child. <span className="text-text-primary font-normal">We give you back an athlete.</span>
        </motion.p>

        {/* Stats Grid matching image */}
        <div ref={statsRef} className="grid grid-cols-5 border-t border-b border-secondary/20 py-8 max-w-5xl mx-auto items-center mt-12 relative w-full bg-background/50 backdrop-blur-sm">
           {/* Decorative Diamonds */}
           <div className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 bg-secondary rotate-45 opacity-60"></div>
           <div className="absolute -bottom-1.5 left-1/2 -ml-1.5 w-3 h-3 bg-secondary rotate-45 opacity-60"></div>
           
           <div className="text-center border-r border-secondary/20 flex flex-col justify-center h-full">
             <p className="text-4xl md:text-5xl font-display font-bold text-secondary">120</p>
             <p className="text-xs text-text-muted/80 mt-3 font-mono uppercase tracking-[0.15em]">Seats Only</p>
           </div>
           
           <div className="text-center border-r border-secondary/20 flex flex-col justify-center h-full">
             <p className="text-4xl md:text-5xl font-display font-bold text-secondary">35</p>
             <p className="text-xs text-secondary/80 mt-2 font-mono uppercase tracking-[0.15em]">Days</p>
             <p className="text-[10px] text-text-muted mt-1 font-mono uppercase">06 MAY – 09 JUN</p>
           </div>
           
           <div className="text-center border-r border-secondary/20 flex flex-col justify-center h-full">
             <p className="text-4xl md:text-5xl font-display font-bold text-secondary">6</p>
             <p className="text-xs text-text-muted/80 mt-3 font-mono uppercase tracking-[0.15em]">Sports</p>
           </div>
           
           <div className="text-center border-r border-secondary/20 flex flex-col justify-center h-full">
             <p className="text-4xl md:text-5xl font-display font-bold text-secondary">7–20</p>
             <p className="text-xs text-text-muted/80 mt-3 font-mono uppercase tracking-[0.15em]">Years Age</p>
           </div>
           
           <div className="text-center flex flex-col justify-center h-full">
             <p className="text-4xl md:text-5xl font-display font-bold text-secondary">7 AM</p>
             <p className="text-xs text-secondary/80 mt-2 font-mono uppercase tracking-[0.15em]">– 10 AM</p>
             <p className="text-[10px] text-text-muted mt-1 font-mono uppercase">Daily</p>
           </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
