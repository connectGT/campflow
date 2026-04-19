"use client";

import { useCartStore } from "@/store/cart.store";
import { useEffect, useState } from "react";
import { Timer, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export function GlobalTimer() {
  const { cartExpiresAt, clearCartLock, cartSessionId } = useCartStore();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!cartExpiresAt) {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = cartExpiresAt - now;

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        handleExpire();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cartExpiresAt]);

  const handleExpire = async () => {
    // Attempt to clear backend locks if we have a session ID
    if (cartSessionId) {
       fetch("/api/register/release-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: cartSessionId })
       }).catch(console.error);
    }
    
    clearCartLock();
    router.push("/");
  };

  if (timeLeft === null || timeLeft <= 0) return null;

  const minutes = Math.floor((timeLeft / 1000) / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const isUrgent = timeLeft < 120000; // less than 2 minutes

  return (
    <div className="fixed top-20 right-6 z-50 animate-fade-in-up">
      <div className={`glass-strong rounded-2xl p-4 border flex items-center gap-3 shadow-2xl transition-all ${
        isUrgent ? 'border-destructive/50 bg-destructive/10 text-destructive' : 'border-primary/20 bg-surface/50 text-text-primary'
      }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          isUrgent ? 'bg-destructive/20 animate-pulse' : 'bg-primary/20'
        }`}>
          {isUrgent ? <AlertTriangle className="w-5 h-5" /> : <Timer className="w-5 h-5" />}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">
            {isUrgent ? 'Expiring Soon' : 'Seat Reserved'}
          </p>
          <div className="font-mono text-xl font-bold tracking-tight">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
}
