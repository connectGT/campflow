import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RegistrationStep } from "@/types";

interface CartState {
  // Cart & Lock Config
  cartSessionId: string | null;
  cartExpiresAt: number | null; 
  isTogglingSport: boolean;
  cartError: string | null;

  // Child details
  childName: string;
  childAge: number | null;
  childSchool: string;
  parentPhone: string;
  emergencyName: string;
  emergencyPhone: string;
  transportPoint: string;

  // Sport selection explicitly mapped to time slots
  selectedSports: {
    slot_1: string | null;
    slot_2: string | null;
    slot_3: string | null;
  };

  // Flow control
  currentStep: RegistrationStep;

  // Actions — Child
  setChildName: (name: string) => void;
  setChildAge: (age: number) => void;
  setChildSchool: (school: string) => void;
  setParentPhone: (phone: string) => void;
  setEmergencyName: (name: string) => void;
  setEmergencyPhone: (phone: string) => void;
  setTransportPoint: (point: string) => void;

  // Actions — Sports (Async for locks)
  toggleSport: (sportId: string, slotId: "slot_1" | "slot_2" | "slot_3") => Promise<void>;
  clearCartLock: () => void; // call when timer runs out

  // Actions — Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: RegistrationStep) => void;

  // Actions — Reset
  reset: () => void;
}

const initialState = {
  cartSessionId: null,
  cartExpiresAt: null,
  isTogglingSport: false,
  cartError: null,

  childName: "",
  childAge: null,
  childSchool: "",
  parentPhone: "",
  emergencyName: "",
  emergencyPhone: "",
  transportPoint: "",
  selectedSports: { slot_1: null, slot_2: null, slot_3: null },
  currentStep: 1 as RegistrationStep,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setChildName: (name) => set({ childName: name }),
      setChildAge: (age) => set({ childAge: age }),
      setChildSchool: (school) => set({ childSchool: school }),
      setParentPhone: (phone) => set({ parentPhone: phone }),
      setEmergencyName: (name) => set({ emergencyName: name }),
      setEmergencyPhone: (phone) => set({ emergencyPhone: phone }),
      setTransportPoint: (point) => set({ transportPoint: point }),

      toggleSport: async (sportId, slotId) => {
        const state = get();
        
        // Lazy init sessionId once they pick the first sport
        const sessionId = state.cartSessionId || crypto.randomUUID();
        if (!state.cartSessionId) {
          set({ cartSessionId: sessionId });
        }

        const currentSlotSport = state.selectedSports[slotId];
        const isDeselecting = currentSlotSport === sportId;

        // Validation: cannot pick the exact same sport in two different slots
        const isDuplicate = Object.values(state.selectedSports).some(id => id === sportId) && !isDeselecting;

        set({ isTogglingSport: true, cartError: null });

        try {
          if (isDuplicate) {
            set({ isTogglingSport: false, cartError: "You cannot select the same sport for multiple time-slots." });
            return;
          }

          if (isDeselecting) {
            // Release from backend
            const res = await fetch("/api/cart/reserve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "release", sportId, slotId, sessionId })
            });
            
            if (!res.ok) throw new Error("Could not release seat");

            // UI update
            const newSelected = { ...state.selectedSports, [slotId]: null };
            const isEmpty = !newSelected.slot_1 && !newSelected.slot_2 && !newSelected.slot_3;

            set({ 
              selectedSports: newSelected,
              cartExpiresAt: isEmpty ? null : state.cartExpiresAt, 
              isTogglingSport: false 
            });
          } else {
            // If there's currently another sport in this slot, we must release it first theoretically!
            if (currentSlotSport) {
               await fetch("/api/cart/reserve", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ action: "release", sportId: currentSlotSport, slotId, sessionId })
               });
            }

            // Reserve the new one
            const res = await fetch("/api/cart/reserve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "reserve", sportId, slotId, sessionId })
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to reserve seat");

            // Update successful
            set({ 
              selectedSports: { ...state.selectedSports, [slotId]: sportId },
              cartExpiresAt: new Date(data.expiresAt).getTime(), // Keep synced
              isTogglingSport: false 
            });
          }
        } catch (err: any) {
           console.error("Cart action failed", err);
           set({ cartError: err.message, isTogglingSport: false });
        }
      },

      clearCartLock: () => {
        set({ ...initialState });
      },

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 4) as RegistrationStep,
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1) as RegistrationStep,
        })),

      goToStep: (step) => set({ currentStep: step }),

      reset: () => set(initialState),
    }),
    {
      name: "dheera-cart-storage",
    }
  )
);
