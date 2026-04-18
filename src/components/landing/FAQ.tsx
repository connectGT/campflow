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
    <section className="section-alt py-24 px-8 relative overflow-hidden">
      <div className="orb w-[350px] h-[350px] bg-[#aacae6] top-[-80px] right-[-80px]" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
        {/* Left — Header */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="section-label mb-3">Got Questions?</div>
          <div className="accent-divider" />
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight mt-4 mb-6 leading-tight">
            Everything You{" "}
            <span className="gradient-text">Need to Know</span>
          </h2>
          <p className="text-text-muted text-base leading-relaxed font-medium">
            Complete answers before you commit. If you have a question we haven&apos;t answered, reach us at{" "}
            <a href="mailto:muktabhinav@gmail.com" className="text-primary hover:text-primary-hover transition-colors">
              muktabhinav@gmail.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919074063030" className="text-primary hover:text-primary-hover transition-colors">
              +91-9074063030
            </a>.
          </p>
        </div>

        {/* Right — Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass-subtle rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? "border-primary/20" : ""
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
              >
                <span className="font-display font-semibold text-text-primary text-sm tracking-wide group-hover:text-primary transition-colors pr-4">
                  {faq.q}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    background: openIndex === i
                      ? "linear-gradient(135deg, #ffb4a9, #ff5745)"
                      : "rgba(91, 64, 60, 0.25)",
                    border: openIndex === i ? "none" : "1px solid rgba(91, 64, 60, 0.35)",
                  }}
                >
                  {openIndex === i ? (
                    <Minus className="w-3.5 h-3.5 text-[#111316]" strokeWidth={2.5} />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-text-muted" strokeWidth={2} />
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
                    <p
                      className="px-5 pb-5 text-text-muted text-sm leading-relaxed border-t pt-3 font-medium"
                      style={{ borderColor: "rgba(255, 218, 213, 0.08)" }}
                    >
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
