"use client";

import { motion } from "framer-motion";
import { SANGHA_HEADLINE, SANGHA_SUBLINE, SANGHA_INTRO, SANGHA_PILLARS, DHEERA_ECOSYSTEM, ECOSYSTEM_NOTE } from "@/data/camp";

export function SanghaSection() {
  return (
    <section className="py-24 bg-zinc-950 text-zinc-50 relative overflow-hidden flex flex-col items-center border-t border-zinc-800">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20"
          >
            <span>The Dheera Collective</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent"
          >
            {SANGHA_HEADLINE}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-300 font-light"
          >
            {SANGHA_SUBLINE}
          </motion.p>
        </div>

        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-10 mb-20 text-center max-w-4xl mx-auto backdrop-blur-sm"
        >
          <p className="text-2xl font-serif italic text-zinc-200">"{SANGHA_INTRO}"</p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {SANGHA_PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-2xl hover:bg-zinc-900 transition-colors"
            >
              <div className="text-4xl mb-6">{pillar.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Ecosystem Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-white mb-2">The Ecosystem</h3>
            <p className="text-zinc-500 text-sm">{ECOSYSTEM_NOTE}</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-zinc-800 -z-10 translate-y-[-50%]">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="h-full bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-400"
              />
            </div>

            {DHEERA_ECOSYSTEM.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (idx * 0.2) }}
                className="flex flex-col items-center flex-1 w-full md:w-auto"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center text-3xl mb-4 relative z-10 hover:border-cyan-500 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-1">{item.label}</h4>
                <p className="text-cyan-400 text-xs font-medium uppercase tracking-wider text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
