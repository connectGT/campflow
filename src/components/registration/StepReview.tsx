"use client";

import { useCartStore } from "@/store/cart.store";
import { ChevronLeft, ChevronRight, User, Calendar, Sliders } from "lucide-react";

export function StepReview() {
  const { childName, childAge, selectedSports, prevStep, nextStep } = useCartStore();

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg">
      <h2 className="font-display text-2xl font-bold mb-8">Review Registration</h2>

      <div className="space-y-6 mb-10">
        {/* Child Info */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface/50 border border-glass-border">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Child Details</p>
            <p className="text-lg font-bold">{childName}</p>
            <p className="text-sm text-text-muted">{childAge} Years Old</p>
          </div>
        </div>

        {/* Selected Sports */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface/50 border border-glass-border">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Selected Sports</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedSports.map((id) => (
                <span key={id} className="px-3 py-1 rounded-full bg-background border border-glass-border text-xs font-medium capitalize">
                  {id}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Summary */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-bold">₹</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Total Fee</p>
                <p className="text-2xl font-bold">₹12,000</p>
              </div>
              <p className="text-xs text-text-muted italic">Incl. all taxes & equipment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Proceed to Payment <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
