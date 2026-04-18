"use client";

import { useCartStore } from "@/store/cart.store";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const sports = [
  { id: "cricket", name: "Cricket", emoji: "🏏", color: "#6C63FF" },
  { id: "swimming", name: "Swimming", emoji: "🏊", color: "#00D4AA" },
  { id: "football", name: "Football", emoji: "⚽", color: "#FF4D6D" },
  { id: "basketball", name: "Basketball", emoji: "🏀", color: "#FF8C42" },
  { id: "tennis", name: "Tennis", emoji: "🎾", color: "#FFD93D" },
  { id: "badminton", name: "Badminton", emoji: "🏸", color: "#6C63FF" },
];

export function StepSportSelection() {
  const { selectedSports, toggleSport, nextStep, prevStep } = useCartStore();

  const isComplete = selectedSports.length === 3;

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold">Pick 3 Sports</h2>
          <p className="text-text-muted text-sm mt-1">
            Selected: <span className="text-primary font-bold">{selectedSports.length}/3</span>
          </p>
        </div>
        <div className="flex gap-2">
          {selectedSports.map((id) => {
            const sport = sports.find((s) => s.id === id);
            return (
              <div key={id} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                {sport?.emoji}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {sports.map((sport) => {
          const isSelected = selectedSports.includes(sport.id);
          const isDisabled = !isSelected && isComplete;

          return (
            <motion.div
              key={sport.id}
              whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              onClick={() => !isDisabled && toggleSport(sport.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : isDisabled
                  ? "border-glass-border opacity-50 grayscale cursor-not-allowed"
                  : "border-glass-border bg-surface hover:border-primary/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="text-4xl mb-4 block">{sport.emoji}</span>
              <h3 className="font-bold text-lg">{sport.name}</h3>
              <p className="text-text-muted text-xs mt-1">
                {isSelected ? "Selected" : isDisabled ? "Limit Reached" : "Tap to select"}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          disabled={!isComplete}
          onClick={nextStep}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
            isComplete
              ? "bg-primary hover:bg-primary-hover text-white translate-y-0"
              : "bg-surface text-text-muted border border-glass-border cursor-not-allowed"
          }`}
        >
          Review Selection <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
