"use client";

import { useCartStore } from "@/store/cart.store";
import { ChevronLeft, ChevronRight, Check, Loader2, Clock, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { SPORTS as sports } from "@/data/camp";

export function StepSportSelection() {
  const { 
    selectedSports, toggleSport, nextStep, prevStep, 
    isTogglingSport, cartExpiresAt, cartError, clearCartLock 
  } = useCartStore();

  const isComplete = selectedSports.length === 3;
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!cartExpiresAt) {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, cartExpiresAt - Date.now());
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearCartLock();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cartExpiresAt, clearCartLock]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden">
      
      {/* Timer Overlay Banner */}
      <AnimatePresence>
        {cartExpiresAt && timeLeft !== null && timeLeft > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-0 left-0 right-0 py-2 px-4 flex items-center justify-center gap-2 font-bold text-sm tracking-widest ${timeLeft < 60000 ? 'bg-red-500 text-white' : 'bg-primary/20 text-primary border-b border-primary/30'}`}
          >
            <Clock className="w-4 h-4" />
            CART RESERVATION EXPIRES IN {formatTime(timeLeft)}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 ${cartExpiresAt ? 'mt-8' : ''}`}>
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
              <div key={id} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(255,87,69,0.3)]">
                {sport?.emoji}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {cartError && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm font-medium">{cartError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {sports.map((sport) => {
          const isSelected = selectedSports.includes(sport.id);
          const isDisabled = (!isSelected && isComplete) || isTogglingSport;

          return (
            <motion.div
              key={sport.id}
              whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              onClick={() => !isDisabled && toggleSport(sport.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : isDisabled
                  ? "border-glass-border opacity-50 grayscale"
                  : "border-glass-border bg-surface hover:border-primary/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {isTogglingSport && isDisabled && !isSelected && !isComplete && (
                 <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-surface border border-glass-border flex items-center justify-center">
                    <Loader2 className="w-3 h-3 text-text-muted animate-spin" />
                 </div>
              )}
              <span className="text-4xl mb-4 block">{sport.emoji}</span>
              <h3 className="font-bold text-lg leading-tight mb-1">{sport.name}</h3>
              <p className="text-text-muted text-xs font-semibold">
                {isSelected ? "Locked" : isComplete ? "Limit Reached" : isTogglingSport ? "Wait..." : sport.seats_total + " Total Seats"}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <button
          disabled={isTogglingSport}
          onClick={prevStep}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-medium disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          disabled={!isComplete || isTogglingSport}
          onClick={nextStep}
          className={`relative overflow-hidden flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
            isComplete && !isTogglingSport
              ? "btn-primary shadow-[0_0_20px_rgba(255,87,69,0.3)] shadow-primary/30"
              : "bg-surface text-text-muted border border-glass-border cursor-not-allowed"
          }`}
        >
          {isTogglingSport ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Reserving...
            </>
          ) : (
            <>
              Review Selection <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
