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
  childGender: string;
  childDob: string;           // "YYYY-MM-DD"
  fatherName: string;
  motherName: string;
  childSchool: string;

  // Contact
  parentPhone: string;        // Mobile number
  whatsappNumber: string;     // WhatsApp (may differ from mobile)
  fullAddress: string;

  // Emergency
  emergencyName: string;
  emergencyPhone: string;

  // Logistics
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
  setChildGender: (gender: string) => void;
  setChildDob: (dob: string) => void;
  setFatherName: (name: string) => void;
  setMotherName: (name: string) => void;
  setChildSchool: (school: string) => void;

  // Actions — Contact
  setParentPhone: (phone: string) => void;
  setWhatsappNumber: (phone: string) => void;
  setFullAddress: (address: string) => void;

  // Actions — Emergency & Logistics
  setEmergencyName: (name: string) => void;
  setEmergencyPhone: (phone: string) => void;
  setTransportPoint: (point: string) => void;

  // Actions — Sports (Async for locks)
  toggleSport: (sportId: string, slotId: "slot_1" | "slot_2" | "slot_3") => Promise<void>;
  clearCartLock: () => void;

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
  childGender: "",
  childDob: "",
  fatherName: "",
  motherName: "",
  childSchool: "",

  parentPhone: "",
  whatsappNumber: "",
  fullAddress: "",

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

      // Child setters
      setChildName: (name) => set({ childName: name }),
      setChildAge: (age) => set({ childAge: age }),
      setChildGender: (gender) => set({ childGender: gender }),
      setChildDob: (dob) => set({ childDob: dob }),
      setFatherName: (name) => set({ fatherName: name }),
      setMotherName: (name) => set({ motherName: name }),
      setChildSchool: (school) => set({ childSchool: school }),

      // Contact setters
      setParentPhone: (phone) => set({ parentPhone: phone }),
      setWhatsappNumber: (phone) => set({ whatsappNumber: phone }),
      setFullAddress: (address) => set({ fullAddress: address }),

      // Emergency / logistics
      setEmergencyName: (name) => set({ emergencyName: name }),
      setEmergencyPhone: (phone) => set({ emergencyPhone: phone }),
      setTransportPoint: (point) => set({ transportPoint: point }),

      toggleSport: async (sportId, slotId) => {
        const state = get();
        
        const sessionId = state.cartSessionId || crypto.randomUUID();
        if (!state.cartSessionId) set({ cartSessionId: sessionId });

        const currentSlotSport = state.selectedSports[slotId];
        const isDeselecting = currentSlotSport === sportId;
        const isDuplicate = Object.values(state.selectedSports).some(id => id === sportId) && !isDeselecting;

        set({ isTogglingSport: true, cartError: null });

        try {
          if (isDuplicate) {
            set({ isTogglingSport: false, cartError: "You cannot select the same sport for multiple time-slots." });
            return;
          }

          if (isDeselecting) {
            const res = await fetch("/api/cart/reserve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "release", sportId, slotId, sessionId })
            });
            if (!res.ok) throw new Error("Could not release seat");

            const newSelected = { ...state.selectedSports, [slotId]: null };
            const isEmpty = !newSelected.slot_1 && !newSelected.slot_2 && !newSelected.slot_3;
            set({ selectedSports: newSelected, cartExpiresAt: isEmpty ? null : state.cartExpiresAt, isTogglingSport: false });

          } else {
            if (currentSlotSport) {
              await fetch("/api/cart/reserve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "release", sportId: currentSlotSport, slotId, sessionId })
              });
            }

            const res = await fetch("/api/cart/reserve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "reserve", sportId, slotId, sessionId })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to reserve seat");

            set({ 
              selectedSports: { ...state.selectedSports, [slotId]: sportId },
              cartExpiresAt: new Date(data.expiresAt).getTime(),
              isTogglingSport: false 
            });
          }
        } catch (err: any) {
          console.error("Cart action failed", err);
          set({ cartError: err.message, isTogglingSport: false });
        }
      },

      clearCartLock: () => set({ ...initialState }),

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
    { name: "dheera-cart-storage" }
  )
);
