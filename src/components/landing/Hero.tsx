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
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Floating orbs */}
      <div className="orb orb-hero-1 w-96 h-96 bg-primary -top-48 -left-48" />
      <div className="orb orb-hero-2 w-80 h-80 bg-secondary -bottom-40 -right-40" />
      <div className="orb orb-hero-3 w-64 h-64 bg-primary/50 top-1/3 right-1/4" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-muted mb-8"
        >
          <Zap className="w-4 h-4 text-secondary" />
          <span>Registrations open for Summer 2025</span>
        </motion.div>

        {/* Heading with word-by-word reveal */}
        <h1
          ref={headingRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6"
          style={{ perspective: "800px" }}
        >
          <span className="word inline-block">Where</span>{" "}
          <span className="word inline-block gradient-text">Champions</span>{" "}
          <span className="word inline-block">Begin</span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          India&apos;s most exciting summer sports camp. Cricket, swimming,
          football, basketball, tennis, and badminton — all for just{" "}
          <span className="text-secondary font-mono font-bold">₹12,000</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/register">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-xl px-8 py-4 font-semibold text-lg transition-colors shadow-lg shadow-primary/25 cursor-pointer"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
          <Link href="#sports">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-glass-border hover:border-primary bg-transparent text-text-primary rounded-xl px-8 py-4 font-semibold text-lg transition-colors cursor-pointer"
            >
              Explore Sports
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto">
          <div>
            <p className="stat-num font-display text-3xl md:text-4xl font-bold text-primary" data-value="500">
              0
            </p>
            <p className="text-sm text-text-muted mt-1">Registrations</p>
          </div>
          <div>
            <p className="stat-num font-display text-3xl md:text-4xl font-bold text-secondary" data-value="6">
              0
            </p>
            <p className="text-sm text-text-muted mt-1">Sports</p>
          </div>
          <div>
            <p className="stat-num font-display text-3xl md:text-4xl font-bold text-primary" data-value="12">
              0
            </p>
            <p className="text-sm text-text-muted mt-1">Cities</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
