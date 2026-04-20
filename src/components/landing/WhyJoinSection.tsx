"use client";

import { motion } from "framer-motion";
import { WHY_JOIN } from "@/data/camp";
import { Icon } from "@/components/ui/IconMapping";

export function WhyJoinSection() {
  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden flex flex-col items-center border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-600/10 text-cyan-700 text-sm font-semibold mb-6 border border-cyan-600/20"
          >
            <span>The Transformation</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900"
          >
            You Come For. You Leave With.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-600"
          >
            A summer camp is about filling time. Dheera is about forging character.
          </motion.p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_JOIN.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white border border-zinc-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center border border-zinc-100 group-hover:scale-110 transition-transform text-cyan-600">
                <Icon name={item.icon} className="w-8 h-8" />
              </div>
              
              <div className="mb-6">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Come For</span>
                <h3 className="text-2xl font-bold text-zinc-900">{item.come_for}</h3>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 top-2 text-cyan-500/20 text-4xl">↳</div>
                <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-2">Leave With</span>
                <p className="text-zinc-600 leading-relaxed font-medium">
                  {item.leave_with}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
