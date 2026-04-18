"use client";

import { useCartStore } from "@/store/cart.store";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function StepChildDetails() {
  const { childName, childAge, parentPhone, setChildName, setChildAge, setParentPhone, nextStep } = useCartStore();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!childName || childName.trim().length < 2) {
      setError("Please enter a valid child name.");
      return;
    }
    if (!childAge || childAge < 4 || childAge > 18) {
      setError("Age must be between 4 and 18.");
      return;
    }
    if (!parentPhone || !/^[6-9]\d{9}$/.test(parentPhone)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg">
      <h2 className="font-display text-2xl font-bold mb-6">Child Details</h2>

      {error && (
        <div className="bg-destructive/20 text-destructive border border-destructive/50 rounded-lg p-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Child's Name</label>
          <input
            type="text"
            className="w-full bg-background border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            placeholder="e.g. Arjun Sharma"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Child's Age</label>
          <input
            type="number"
            className="w-full bg-background border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            placeholder="e.g. 12"
            value={childAge || ""}
            onChange={(e) => setChildAge(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Parent WhatsApp Number</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-surface border border-r-0 border-glass-border rounded-l-xl text-text-muted">
              +91
            </span>
            <input
              type="tel"
              className="w-full bg-background border border-glass-border rounded-r-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              placeholder="9876543210"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Next Step <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
