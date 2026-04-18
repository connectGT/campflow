"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What age group is CampFlow for?",
    a: "CampFlow is designed for children aged 7 to 20 years. We group kids by age and skill level to ensure the best experience for everyone.",
  },
  {
    q: "How long does the camp run?",
    a: "Each summer camp session runs for 35 days (06 May to 09 June, Monday to Saturday). Sessions run from 7 AM to 10 AM daily.",
  },
  {
    q: "Can my child switch sports mid-camp?",
    a: "We lock in your 3 sport selections at registration to ensure trainer planning, but you can request a swap within the first week if slots are available.",
  },
  {
    q: "What's included in the ₹12,000 fee?",
    a: "Everything — professional coaching for 3 sports, all equipment, hydration and light nutrition during sessions, insurance, and a proficiency certificate at the end.",
  },
  {
    q: "What's your refund policy?",
    a: "Full refund if cancelled 7+ days before camp starts. 50% refund for 3–7 days. No refund within 3 days of camp start. Medical emergencies are handled case-by-case.",
  },
  {
    q: "Do you provide transportation?",
    a: "Currently, parents are responsible for drop-off and pick-up. We're working on a bus service for select locations — stay tuned!",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-alt py-24 px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left — Header */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="section-label mb-3">Got Questions?</div>
          <div className="accent-divider" />
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight mt-4 mb-6">
            Everything You <span className="text-primary">Need to Know</span>
          </h2>
          <p className="text-text-muted text-base leading-relaxed">
            Complete answers before you commit. If you have a question we haven't answered, reach us at muktabhinav@gmail.com or call +91-9074063030.
          </p>
        </div>

        {/* Right — Accordion */}
        <div className="space-y-0 border border-white/10">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-b border-white/10 last:border-0 ${openIndex === i ? "bg-primary/5" : ""}`}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
              >
                <span className="font-black uppercase text-white text-sm tracking-wide group-hover:text-primary transition-colors pr-4">
                  {faq.q}
                </span>
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                  {openIndex === i ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-text-muted" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-text-muted text-sm leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
