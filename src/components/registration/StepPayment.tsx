"use client";

import { useCartStore } from "@/store/cart.store";
import { useState } from "react";
import { ChevronLeft, CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function StepPayment() {
  const { childName, childAge, selectedSports, parentPhone, prevStep, reset } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");

    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        setError("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      // 1. Create Order
      const orderRes = await fetch("/api/register/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          childAge,
          selectedSports,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CampFlow Summer Camp",
        description: `Registration for ${childName}`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          // 2. Verify Payment
          setIsProcessing(true);
          const verifyRes = await fetch("/api/register/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            reset(); // Clear store
            router.push("/register/success");
          } else {
            setError(verifyData.error || "Payment verification failed");
          }
          setIsProcessing(false);
        },
        prefill: {
          name: childName,
          contact: parentPhone,
        },
        theme: {
          color: "#6C63FF",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during payment");
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg text-center">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
        <CreditCard className="w-8 h-8 text-primary" />
      </div>

      <h2 className="font-display text-2xl font-bold mb-2">Finalize Payment</h2>
      <p className="text-text-muted mb-8 text-sm max-w-sm mx-auto">
        Secure your spot instantly. We use Razorpay for 256-bit encrypted, safe transactions.
      </p>

      {error && (
        <div className="bg-destructive/20 text-destructive border border-destructive/50 rounded-lg p-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="bg-surface/50 border border-glass-border rounded-2xl p-6 mb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-text-muted">Summer Camp Admission</span>
          <span className="font-bold">₹12,000.00</span>
        </div>
        <div className="border-t border-glass-border pt-4 flex justify-between items-center font-bold text-lg">
          <span>Amount to Pay</span>
          <span className="text-primary">₹12,000.00</span>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>Pay Now & Register <ShieldCheck className="w-6 h-6" /></>
          )}
        </button>

        <button
          onClick={prevStep}
          disabled={isProcessing}
          className="text-text-muted hover:text-text-primary transition-colors text-sm font-medium"
        >
          Go back to review
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-glass-border flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
        {/* Add UPI, Visa, Mastercard icons if needed */}
      </div>
    </div>
  );
}
