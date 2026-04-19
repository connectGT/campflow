import { create } from "zustand";
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

  // Sport selection (exactly 3 required)
  selectedSports: string[];

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
  toggleSport: (sportId: string) => Promise<void>;
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
  selectedSports: [],
  currentStep: 1 as RegistrationStep,
};

export const useCartStore = create<CartState>((set, get) => ({
  ...initialState,

  setChildName: (name) => set({ childName: name }),
  setChildAge: (age) => set({ childAge: age }),
  setChildSchool: (school) => set({ childSchool: school }),
  setParentPhone: (phone) => set({ parentPhone: phone }),
  setEmergencyName: (name) => set({ emergencyName: name }),
  setEmergencyPhone: (phone) => set({ emergencyPhone: phone }),
  setTransportPoint: (point) => set({ transportPoint: point }),

  toggleSport: async (sportId) => {
    const state = get();
    
    // Lazy init sessionId once they pick the first sport
    const sessionId = state.cartSessionId || crypto.randomUUID();
    if (!state.cartSessionId) {
      set({ cartSessionId: sessionId });
    }

    const isSelected = state.selectedSports.includes(sportId);

    set({ isTogglingSport: true, cartError: null });

    try {
      if (isSelected) {
        // Release from backend
        const res = await fetch("/api/cart/reserve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "release", sportId, sessionId })
        });
        
        if (!res.ok) throw new Error("Could not release seat");

        // UI update
        const newSelected = state.selectedSports.filter((id) => id !== sportId);
        set({ 
          selectedSports: newSelected,
          cartExpiresAt: newSelected.length === 0 ? null : state.cartExpiresAt, // Reset timer if cart is empty
          isTogglingSport: false 
        });
      } else {
        // Enforce max 3 locally to avoid unneeded API calls
        if (state.selectedSports.length >= 3) {
          set({ isTogglingSport: false, cartError: "You can only select up to 3 sports." });
          return;
        }

        // Add (Reserve) via backend
        const res = await fetch("/api/cart/reserve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "reserve", sportId, sessionId })
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to reserve seat");

        // Update successful
        set({ 
          selectedSports: [...state.selectedSports, sportId],
          cartExpiresAt: new Date(data.expiresAt).getTime(), // Keep synced with fresh API expiry
          isTogglingSport: false 
        });
      }
    } catch (err: any) {
       console.error("Cart action failed", err);
       set({ cartError: err.message, isTogglingSport: false });
    }
  },

  clearCartLock: () => {
    // We don't necessarily call release API for all because DB will auto-expire them eventually, 
    // but just flush local state if time is up. 
    set({ selectedSports: [], cartExpiresAt: null, cartError: "Cart timer expired. Seats released." });
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
}));
