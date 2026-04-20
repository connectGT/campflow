"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import { INCLUSIONS_CORE, INCLUSIONS_FREE, INCLUSIONS_PARENTS, INCLUSIONS_SUMMARY, CAMP } from "@/data/camp";
import { Icon } from "@/components/ui/IconMapping";
import { Sparkles, Users, IndianRupee } from "lucide-react";

export function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".inclusion-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="inclusions" className="py-24 bg-background relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-[#aacae6] top-[20%] left-[-200px]" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-label mb-3 inline-block">The Investment</div>
          <div className="accent-divider mx-auto" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 leading-tight">
            What <span className="gradient-text">{CAMP.FEE_DISPLAY.split('—')[0]}</span> Covers
          </h2>
          <p className="text-text-muted mt-4 text-base font-medium">
            {INCLUSIONS_SUMMARY}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Core Inclusions */}
          <div className="glass-subtle rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-display font-bold text-xl text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <IndianRupee className="w-4 h-4" />
              </span>
              11 Core Inclusions
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {INCLUSIONS_CORE.map((item) => (
                <div key={item.title} className="inclusion-card p-4 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5">
                  <div className="flex gap-4">
                    <div className="pt-1 shrink-0 text-primary">
                      <Icon name={item.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider mb-1.5">{item.title}</h4>
                      <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Additions & Parents */}
          <div className="flex flex-col gap-8">
            
            <div className="glass-subtle rounded-2xl p-6" style={{ background: "linear-gradient(180deg, rgba(26,28,31,0.6) 0%, rgba(94,217,214,0.05) 100%)" }}>
              <h3 className="font-display font-bold text-xl text-[#5ed9d6] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#5ed9d6]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </span>
                Free Value Additions
              </h3>
              <div className="flex flex-col gap-4">
                {INCLUSIONS_FREE.map((item) => (
                  <div key={item.title} className="inclusion-card flex gap-4">
                    <div className="pt-1 shrink-0 text-[#5ed9d6]">
                      <Icon name={item.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider">{item.title}</h4>
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#111316] bg-[#5ed9d6] px-1.5 py-0.5 rounded leading-none">{item.badge}</span>
                      </div>
                      <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-subtle rounded-2xl p-6" style={{ background: "linear-gradient(180deg, rgba(26,28,31,0.6) 0%, rgba(255,180,169,0.05) 100%)" }}>
              <h3 className="font-display font-bold text-primary text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </span>
                For Parents
              </h3>
              <div className="flex flex-col gap-4">
                {INCLUSIONS_PARENTS.map((item) => (
                  <div key={item.title} className="inclusion-card flex gap-4">
                    <div className="pt-1 shrink-0 text-primary">
                      <Icon name={item.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider">{item.title}</h4>
                      </div>
                      <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}

export default Pricing;
