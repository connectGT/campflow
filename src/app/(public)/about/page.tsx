"use client";

import { motion } from "framer-motion";
import { 
  BRAND_ONE_LINER, 
  DHEERA_WORD_MEANING, 
  VISION_STATEMENT, 
  VISION_DIMENSIONS, 
  VISION_QUOTE,
  MISSION_PILLARS,
  TWO_PILLARS,
  TWO_PILLARS_BRIDGE,
  CORE_PILLARS,
  LEGAL_ABOUT
} from "@/data/camp";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { useState } from "react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(CORE_PILLARS[0].id);

  return (
    <main className="min-h-screen bg-zinc-50 pt-20">
      
      {/* 1. Header / Meaning Section */}
      <section className="bg-zinc-950 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent mb-6">
              {BRAND_ONE_LINER}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12"
          >
            <div className="text-9xl font-serif text-cyan-500/20 px-8 py-2 border-r border-zinc-800 hidden md:block">
              {DHEERA_WORD_MEANING.hindi}
            </div>
            <div>
              <div className="flex items-end gap-4 mb-4">
                <h2 className="text-5xl font-bold text-white">{DHEERA_WORD_MEANING.pronunciation}</h2>
                <span className="text-zinc-500 text-lg mb-1 leading-none">/noun/</span>
              </div>
              <p className="text-2xl text-zinc-300 font-light italic mb-8">{DHEERA_WORD_MEANING.meaning}</p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                {DHEERA_WORD_MEANING.three_qualities.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm">{item.quality}</span>
                    <span className="text-white text-lg">{item.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Who We Are (Two Pillars) */}
      <section className="py-24 bg-white border-b border-zinc-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {TWO_PILLARS.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-10 hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-6">{pillar.icon}</div>
                <h3 className="text-3xl font-bold text-zinc-900 mb-2">{pillar.title}</h3>
                <p className="text-cyan-600 font-semibold uppercase tracking-wider text-sm mb-6">{pillar.subtitle}</p>
                <p className="text-zinc-600 leading-relaxed text-lg">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xl font-serif text-zinc-500 italic max-w-2xl mx-auto"
          >
            "{TWO_PILLARS_BRIDGE}"
          </motion.div>
        </div>
      </section>

      {/* 3. Vision Section */}
      <section className="py-24 bg-zinc-900 text-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">The Vision</span>
          <h2 className="text-3xl md:text-5xl font-serif max-w-5xl mx-auto leading-tight mb-20">
            "{VISION_STATEMENT}"
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-20">
            {VISION_DIMENSIONS.map((dim, idx) => (
              <div key={idx} className="relative">
                <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4 z-0">{dim.number}</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4">{dim.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{dim.body}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-[1px] rounded-2xl max-w-4xl mx-auto">
            <div className="bg-zinc-950 rounded-2xl p-8 md:p-12">
              <p className="text-2xl font-light italic text-zinc-200">"{VISION_QUOTE}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission Section */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Mission</span>
            <h2 className="text-4xl font-extrabold text-zinc-900">The Three Pillars of Execution</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MISSION_PILLARS.map((mission, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-6 bg-zinc-50 w-20 h-20 rounded-full flex items-center justify-center">{mission.icon}</div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{mission.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{mission.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Pillars Details (Tabs) */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-zinc-900">How We Build It</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Tab Nav */}
            <div className="md:w-1/3 flex flex-col gap-4">
              {CORE_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`text-left px-8 py-6 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                    activeTab === pillar.id 
                      ? "border-cyan-500 bg-cyan-50 text-cyan-900 shadow-md" 
                      : "border-zinc-100 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  <span className="text-3xl">{pillar.icon}</span>
                  <span className="font-bold text-lg">{pillar.title.split("—")[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="md:w-2/3">
              {CORE_PILLARS.map((pillar) => (
                <div key={pillar.id} className={activeTab === pillar.id ? "block animate-in fade-in slide-in-from-right-4 duration-500" : "hidden"}>
                  <h3 className="text-3xl font-bold text-zinc-900 mb-6">{pillar.title}</h3>
                  <p className="text-xl text-zinc-600 mb-10 leading-relaxed font-light">{pillar.intro}</p>
                  
                  {pillar.infrastructure_note && (
                    <div className="bg-zinc-900 text-white p-6 rounded-2xl mb-10 border-l-4 border-cyan-500">
                      <span className="font-semibold text-cyan-400 block mb-2">INFRASTRUCTURE COMMITMENT</span>
                      {pillar.infrastructure_note}
                    </div>
                  )}

                  {pillar.philosophy_quote && (
                    <div className="bg-zinc-50 p-6 rounded-2xl mb-10 border border-zinc-200">
                      <p className="font-serif italic text-lg text-zinc-700">"{pillar.philosophy_quote}"</p>
                    </div>
                  )}

                  <div className="space-y-8 mt-10">
                    {pillar.sub_pillars.map((sub, idx) => (
                      <div key={idx} className="flex gap-6">
                        <div className="text-3xl flex-shrink-0 mt-1">{sub.icon}</div>
                        <div>
                          <h4 className="text-xl font-bold text-zinc-900 mb-3">{sub.title}</h4>
                          <ul className="space-y-2">
                            {sub.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-3">
                                <span className="text-cyan-500 mt-1.5">•</span>
                                <span className="text-zinc-600">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing Promise Component */}
      <CTASection />

      {/* 7. Legal Trust Details block (Above Footer) */}
      <section className="bg-zinc-50 py-16 border-t border-zinc-200 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-zinc-600">
          <div>
            <span className="font-bold text-zinc-900 block mb-2">Banking</span>
            Bank: {LEGAL_ABOUT.BANK}<br/>
            IFSC: {LEGAL_ABOUT.BANK_IFSC}<br/>
            TAN: {LEGAL_ABOUT.TAN}
          </div>
          <div>
            <span className="font-bold text-zinc-900 block mb-2">Contact</span>
            {LEGAL_ABOUT.EMAIL}<br/>
            {LEGAL_ABOUT.ALTERNATE_PHONE}
          </div>
          <div>
            <span className="font-bold text-zinc-900 block mb-2">Registration</span>
            {LEGAL_ABOUT.ROC}<br/>
            {LEGAL_ABOUT.NIC_ACTIVITY}
          </div>
          <div>
            <span className="font-bold text-zinc-900 block mb-2">Address</span>
            {LEGAL_ABOUT.REGISTERED_ADDRESS}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
