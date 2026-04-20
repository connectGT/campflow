"use client";

import { useCartStore } from "@/store/cart.store";
import { ChevronLeft, ChevronRight, Check, Loader2, Clock, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { SPORTS as sports } from "@/data/camp";
import { Icon } from "@/components/ui/IconMapping";

const SLOTS = [
  { id: "slot_1" as const, label: "7:00 AM - 8:00 AM" },
  { id: "slot_2" as const, label: "8:00 AM - 9:00 AM" },
  { id: "slot_3" as const, label: "9:00 AM - 10:00 AM" }
];

export function StepSportSelection() {
  const { 
    selectedSports, toggleSport, nextStep, prevStep, 
    isTogglingSport, cartExpiresAt, cartError, clearCartLock 
  } = useCartStore();

  const isComplete = !!selectedSports.slot_1 && !!selectedSports.slot_2 && !!selectedSports.slot_3;
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"slot_1" | "slot_2" | "slot_3">("slot_1");
  const [availability, setAvailability] = useState<Record<string, any>>({});

      const [successPopup, setSuccessPopup] = useState<{ sportName: string, slot: string } | null>(null);
      // Real-time Availability Polling
      useEffect(() => {
        const fetchAvailability = async () => {
          try {
            const res = await fetch("/api/sports/availability");
            const data = await res.json();
            if (data.availability) setAvailability(data.availability);
          } catch (e) {
            console.error("Failed to fetch availability", e);
          }
        };
        fetchAvailability(); // initial
        const poller = setInterval(fetchAvailability, 3000);
        return () => clearInterval(poller);
      }, []);

      // Timer logic
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

      const selectedCount = Object.values(selectedSports).filter(Boolean).length;

      return (
        <div className="glass rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden">
          {/* Success Popup Overlay */}
          <AnimatePresence>
            {successPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              >
                <div className="bg-surface border-2 border-primary/50 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm mx-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,87,69,0.5)]">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-white">Successfully Selected!</h3>
                  <p className="text-text-muted mb-6">
                    <span className="text-primary font-bold">{successPopup.sportName}</span> is locked in for <br/> {successPopup.slot}.
                  </p>
                  <p className="text-xs text-text-muted animate-pulse">Moving to next time slot...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timer Overlay Banner */}
          <AnimatePresence>
            {cartExpiresAt && timeLeft !== null && timeLeft > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute top-0 left-0 right-0 py-2 px-4 flex items-center justify-center gap-2 font-bold text-sm tracking-widest z-10 ${timeLeft < 60000 ? 'bg-red-500 text-white' : 'bg-primary/20 text-primary border-b border-primary/30'}`}
              >
                <Clock className="w-4 h-4" />
                CART RESERVATION EXPIRES IN {formatTime(timeLeft)}
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 ${cartExpiresAt ? 'mt-8' : ''}`}>
            <div>
              <h2 className="font-display text-2xl font-bold">Build Routine</h2>
              <p className="text-text-muted text-sm mt-1">
                Pick 1 sport per time slot. <span className="text-primary font-bold">{selectedCount}/3</span>
              </p>
            </div>
          </div>

          <AnimatePresence>
            {cartError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm font-medium">{cartError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div className="flex bg-surface border border-glass-border rounded-xl p-1 mb-6">
            {SLOTS.map((slot) => {
              const isActive = activeTab === slot.id;
              const assignedSportId = selectedSports[slot.id];
              const sportObj = assignedSportId ? sports.find((s) => s.id === assignedSportId) : null;

              return (
                <button
                  key={slot.id}
                  onClick={() => setActiveTab(slot.id)}
                  className={`flex-1 relative py-3 text-sm font-semibold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                    isActive ? "text-white" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/80 border-t border-white/20 rounded-lg shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{slot.label}</span>
                  <span className="relative z-10 text-[10px] uppercase tracking-wider opacity-80">
                    {sportObj ? <span className="flex items-center gap-1"><Icon name={sportObj.emoji} className="w-3 h-3" /> {sportObj.name}</span> : "Unassigned"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid for Active Tab */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {sports.map((sport) => {
              const isSelectedInThisSlot = selectedSports[activeTab] === sport.id;
              
              // Check if this explicit sport is selected in ANOTHER slot
              const isSelectedInOtherSlot = Object.entries(selectedSports).some(
                ([slotId, sId]) => sId === sport.id && slotId !== activeTab
              );

              // Availability Data
              const availData = availability[sport.id]?.[activeTab];
              const remaining = availData ? availData.remaining : ((sport as any).seats_per_slot || Math.floor(sport.seats_total / 3));
              const isFull = remaining <= 0;

              const isDisabled = isTogglingSport || isSelectedInOtherSlot || (!isSelectedInThisSlot && isFull);

              const handleSportClick = async () => {
                if (isDisabled) return;
                const isSelecting = !isSelectedInThisSlot;
                
                await toggleSport(sport.id, activeTab);
                
                // Read fresh state to ensure there was no error
                const { cartError } = useCartStore.getState();
                
                // Auto-advance to next sequential logical tab if selecting (not deselecting) and no errors occurred
                if (isSelecting && !cartError) {
                  const slotLabel = SLOTS.find(s => s.id === activeTab)?.label || activeTab;
                  setSuccessPopup({ sportName: sport.name, slot: slotLabel });
                  
                  setTimeout(() => {
                    setSuccessPopup(null);
                    if (activeTab === "slot_1") setActiveTab("slot_2");
                    else if (activeTab === "slot_2") setActiveTab("slot_3");
                  }, 1500); 
                }
              };

          return (
            <motion.div
              key={sport.id}
              whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              onClick={handleSportClick}
              className={`relative p-6 rounded-2xl border-2 transition-all ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${
                isSelectedInThisSlot
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : isDisabled
                  ? "border-glass-border opacity-50 grayscale"
                  : "border-glass-border bg-surface hover:border-primary/50"
              }`}
            >
              {isSelectedInThisSlot && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(255,87,69,0.5)]">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {isTogglingSport && !isSelectedInThisSlot && !isDisabled && (
                 <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-surface border border-glass-border flex items-center justify-center">
                    <Loader2 className="w-3 h-3 text-text-muted animate-spin" />
                 </div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-primary" style={{ background: `${sport.color}22`, border: `1px solid ${sport.color}44` }}>
                <Icon name={sport.emoji} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg leading-tight mb-1">{sport.name}</h3>
              <p className={`text-xs font-semibold ${isSelectedInOtherSlot ? 'text-orange-400' : isFull ? 'text-red-400' : 'text-primary/80'}`}>
                {isSelectedInThisSlot ? "Locked" 
                 : isSelectedInOtherSlot ? "In Other Slot" 
                 : isFull ? "Slot Full" 
                 : `${remaining} Seats Left`}
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
              <Loader2 className="w-5 h-5 animate-spin" /> Updating...
            </>
          ) : (
            <>
              Review Routine <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
