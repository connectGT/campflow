import { create } from "zustand";
import type { RegistrationStep } from "@/types";

interface CartState {
  // Child details
  childName: string;
  childAge: number | null;
  parentPhone: string;

  // Sport selection (exactly 3 required)
  selectedSports: string[];

  // Flow control
  currentStep: RegistrationStep;

  // Actions — Child
  setChildName: (name: string) => void;
  setChildAge: (age: number) => void;
  setParentPhone: (phone: string) => void;

  // Actions — Sports
  toggleSport: (sportId: string) => void;

  // Actions — Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: RegistrationStep) => void;

  // Actions — Reset
  reset: () => void;
}

const initialState = {
  childName: "",
  childAge: null,
  parentPhone: "",
  selectedSports: [],
  currentStep: 1 as RegistrationStep,
};

export const useCartStore = create<CartState>((set) => ({
  ...initialState,

  setChildName: (name) => set({ childName: name }),
  setChildAge: (age) => set({ childAge: age }),
  setParentPhone: (phone) => set({ parentPhone: phone }),

  toggleSport: (sportId) =>
    set((state) => {
      const isSelected = state.selectedSports.includes(sportId);
      if (isSelected) {
        return {
          selectedSports: state.selectedSports.filter((id) => id !== sportId),
        };
      }
      // Enforce max 3 sports
      if (state.selectedSports.length >= 3) return state;
      return {
        selectedSports: [...state.selectedSports, sportId],
      };
    }),

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
