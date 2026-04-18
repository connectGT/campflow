"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What age group is CampFlow for?",
    a: "CampFlow is designed for children aged 4 to 17 years. We group kids by age and skill level to ensure the best experience for everyone.",
  },
  {
    q: "How long does the camp run?",
    a: "Each summer camp session runs for 4 weeks (Monday to Saturday). Morning batches run from 6 AM to 9 AM, and evening batches from 4 PM to 7 PM.",
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
    <section className="py-24 px-6 bg-surface-container-low/10">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-6 tracking-wide">
          Intelligence & <span className="gradient-text italic font-mono">Answers</span>
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-lg">
          Complete logistical clarity before you secure your spot.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass rounded-none border-secondary/20 overflow-hidden transition-colors ${openIndex === i ? 'bg-surface-bright/5 border-secondary/40' : 'hover:border-secondary/30'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
              >
                <span className="font-display font-semibold text-lg md:text-xl tracking-wide group-hover:text-text-primary transition-colors pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${openIndex === i ? 'text-secondary' : 'text-text-muted group-hover:text-secondary'}`}
                >
                  <ChevronDown className="w-6 h-6 shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-secondary/10 mx-6">
                      <p className="text-text-muted text-base leading-relaxed font-sans">
                        {faq.a}
                      </p>
                    </div>
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
