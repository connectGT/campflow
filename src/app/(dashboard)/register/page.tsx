"use client";

import { useCartStore } from "@/store/cart.store";
import { StepChildDetails } from "@/components/registration/StepChildDetails";
import { StepSportSelection } from "@/components/registration/StepSportSelection";
import { StepReview } from "@/components/registration/StepReview";
import { StepPayment } from "@/components/registration/StepPayment";
import { Check, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Child Details" },
  { id: 2, title: "Pick Sports" },
  { id: 3, title: "Review" },
  { id: 4, title: "Payment" },
];

export default function RegisterPage() {
  const currentStep = useCartStore((state) => state.currentStep);

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Register on <span className="gradient-text">Dheera Cart</span>
        </h1>
        <p className="text-text-muted">
          Complete these simple steps to secure your child&apos;s spot.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-glass-border -z-10 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${
                    isCompleted
                      ? "bg-primary text-white"
                      : isCurrent
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-surface text-text-muted border border-glass-border"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={`absolute mt-14 text-xs font-medium md:text-sm ${
                    isCurrent || isCompleted ? "text-text-primary" : "text-text-muted"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="mt-20">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && <StepChildDetails />}
          {currentStep === 2 && <StepSportSelection />}
          {currentStep === 3 && <StepReview />}
          {currentStep === 4 && <StepPayment />}
        </motion.div>
      </div>
    </div>
  );
}
