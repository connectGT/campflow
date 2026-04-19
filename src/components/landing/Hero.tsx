"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap/config";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BRAND, CAMP, HERO_STATS, SECONDARY_STATS } from "@/data/camp";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".stat-block",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.1, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">

      {/* ── Top Contact Bar ── */}
      <div className="nav-blur border-b border-white/5 px-6 py-3 flex justify-between items-center text-sm relative z-20">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#111316] font-black text-xs shrink-0"
            style={{ background: "linear-gradient(135deg, #ffb4a9, #ff5745)" }}
          >
            D
          </div>
          <span className="font-display font-black text-white tracking-widest uppercase text-xs">
            {BRAND.NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-text-muted text-xs font-medium">
          <a href={`tel:${BRAND.PHONE.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3 h-3 text-primary" /> {BRAND.PHONE}
          </a>
          <a href={`https://wa.me/${BRAND.WHATSAPP.replace(/[^0-9]/g, "")}`} className="flex items-center gap-1.5 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-primary"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.538-17.096a12.062 12.062 0 00-8.54-3.525C6.182 1.164 1.18 6.162 1.18 12.802c0 2.115.552 4.183 1.602 6.002L.004 24l5.313-1.393a12.112 12.112 0 005.926 1.541h.005c6.64 0 11.644-5.002 11.644-11.64-.002-3.218-1.258-6.241-3.534-8.517"/></svg> WhatsApp
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary" /> {BRAND.LOCATION}
          </span>
        </div>
      </div>

      {/* ── Main Hero Grid ── */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-49px)]">

        {/* Left — Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 relative z-10">
          {/* Ambient orb */}
          <div className="orb w-[500px] h-[500px] bg-[#ff5745] top-[-100px] left-[-200px]" />

          <div className="hero-sub section-label mb-5 relative z-10">
            {BRAND.TYPE} · {BRAND.LOCATION.split(',')[0]}
          </div>

          <h1 className="font-display font-extrabold uppercase leading-[0.9] mb-8 relative z-10">
            <span className="hero-word block text-text-primary text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Dheera Sports
            </span>
            <span className="hero-word block text-text-primary/60 text-4xl md:text-5xl lg:text-6xl tracking-tight mt-1">
              Transformation
            </span>
            <span className="hero-word block text-5xl md:text-7xl lg:text-8xl tracking-tight mt-3 gradient-text">
              Summer Camp
            </span>
            <span className="hero-word block text-text-subtle text-2xl md:text-3xl tracking-[0.25em] mt-5 font-light">
              2026
            </span>
          </h1>

          <p className="hero-sub text-lg md:text-xl text-text-muted font-medium mb-10 leading-relaxed max-w-md relative z-10">
            {BRAND.HERO_CTA_LINE.split('.')[0]}.{" "}
            <span className="text-text-primary font-semibold italic">
              {BRAND.HERO_CTA_LINE.split('. ').slice(1).join('. ')}
            </span>
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap gap-4 relative z-10"
          >
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary">
                Secure Your Spot
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            <Link href="#sports">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-ghost">
                View Disciplines
              </motion.div>
            </Link>
          </motion.div>

          {/* Camp highlights bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="flex flex-wrap gap-6 mt-12 relative z-10"
          >
            {SECONDARY_STATS.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(180deg, #ffb4a9, #ff5745)" }} />
                <div>
                  <p className="font-display font-bold text-text-primary text-sm">{item.value}</p>
                  <p className="text-text-subtle text-xs">{item.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Action Image + Stats */}
        <div className="relative overflow-hidden flex flex-col">
          {/* Hero background image */}
          <div className="relative flex-1 min-h-[400px] lg:min-h-0 group">
            <Image
              src="/hero-bg.jpg"
              alt="Children training at Dheera Sports Summer Camp, Gwalior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent lg:hidden" />

            {/* Floating badge */}
            <div className="absolute top-6 right-6 glass rounded-xl p-4 max-w-[160px]">
              <p className="font-display font-extrabold text-3xl gradient-text leading-none">{CAMP.DAILY_TIMING.split(' – ')[0].replace(':00', '')}</p>
              <p className="text-text-muted text-xs font-semibold mt-1 uppercase tracking-wider">– {CAMP.DAILY_TIMING.split(' – ')[1].replace(':00', '')} Daily</p>
              <p className="text-text-subtle text-xs mt-1">({CAMP.DAILY_HOURS})</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 border-t border-white/5 bg-surface shrink-0">
            {HERO_STATS.map((stat) => {
              const mainLabel = stat.label.split(' | ')[0];
              const subLabel = stat.label.split(' | ')[1];
              return (
                <div
                  key={stat.label}
                  className="stat-block border-b border-r border-white/5 p-6 hover:bg-primary/5 transition-colors duration-300"
                >
                  <p className="font-display font-extrabold text-4xl md:text-5xl leading-none gradient-text">
                    {stat.value}
                  </p>
                  {subLabel && (
                    <p className="text-xs text-secondary mt-1.5 uppercase tracking-widest font-semibold">
                      {subLabel}
                    </p>
                  )}
                  <p className="text-xs text-text-subtle uppercase tracking-[0.2em] mt-1.5 font-semibold">
                    {mainLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
