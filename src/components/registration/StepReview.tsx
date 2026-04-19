"use client";

import { useCartStore } from "@/store/cart.store";
import { ChevronLeft, ChevronRight, User, Bus, Phone, ShieldAlert, Sliders } from "lucide-react";
import { CAMP } from "@/data/camp";

export function StepReview() {
  const { 
    childName, childAge, childSchool, 
    parentPhone, emergencyName, emergencyPhone, transportPoint,
    selectedSports, prevStep, nextStep 
  } = useCartStore();

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg">
      <h2 className="font-display text-2xl font-bold mb-8">Review Registration</h2>

      <div className="space-y-4 mb-10">
        
        {/* Child Info */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface/50 border border-glass-border">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Child Profile</p>
            <p className="text-lg font-bold">{childName} <span className="text-text-muted text-sm font-medium">({childAge} yrs)</span></p>
            <p className="text-sm text-text-muted">School: {childSchool}</p>
          </div>
        </div>

        {/* Contacts */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-glass-border flex-1">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Parent WhatsApp</p>
              <p className="text-sm font-bold">+91 {parentPhone}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-glass-border flex-1">
            <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Emergency: {emergencyName}</p>
              <p className="text-sm font-bold">+91 {emergencyPhone}</p>
            </div>
          </div>
        </div>

        {/* Transport */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface/50 border border-glass-border">
          <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
            <Bus className="w-5 h-5 text-teal-500" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Transport Pickup Point</p>
            <p className="text-lg font-bold">{transportPoint}</p>
          </div>
        </div>

        {/* Selected Sports */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface/50 border border-glass-border">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Selected Disciplines</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedSports.map((id) => (
                <span key={id} className="px-3 py-1 rounded-full bg-background border border-glass-border text-xs font-semibold capitalize tracking-wide">
                  {id.replace('_', '-')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Summary */}
        <div className="flex items-start gap-4 p-5 mt-2 rounded-xl border border-primary bg-primary/10 overflow-hidden relative">
          <div className="absolute -right-4 -bottom-8 opacity-10 pointer-events-none">
            <span className="text-[120px] font-black italic">D</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 relative z-10">
            <span className="text-[#111316] font-black">₹</span>
          </div>
          <div className="flex-1 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-primary/80 uppercase tracking-widest font-black mb-1">Total Package</p>
                <p className="text-3xl font-black text-white">₹{CAMP.FEE.toLocaleString()}</p>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted bg-surface/50 border border-glass-border px-2 py-1 rounded">ALL INCLUSIVE</p>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-between mt-8 border-t border-white/5 pt-6">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 btn-primary shadow-[0_0_20px_rgba(255,87,69,0.3)] shadow-primary/30"
        >
          Proceed to Payment <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default StepReview;
