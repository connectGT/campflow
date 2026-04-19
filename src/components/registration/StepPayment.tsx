"use client";

import { useCartStore } from "@/store/cart.store";
import { useState, useRef } from "react";
import { ChevronLeft, QrCode, Upload, ShieldCheck, Loader2, RefreshCcw, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export function StepPayment() {
  const { 
    childName, childAge, childSchool, transportPoint,
    parentPhone, emergencyName, emergencyPhone,
    selectedSports, cartSessionId, 
    prevStep, reset 
  } = useCartStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [step, setStep] = useState<"pay" | "upload" | "verifying">("pay");
  const [utr, setUtr] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "campflow@okaxis"; // Default placeholder
  const PAYEE_NAME = "Dheera Sports Foundation";
  const AMOUNT = 12000;
  
  // UPI deep link
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${AMOUNT}&cu=INR&tn=Registration for ${childName}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const startRegistration = async () => {
    setIsProcessing(true);
    setError("");
    try {
      const res = await fetch("/api/register/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          childName, childAge, childSchool, transportPoint,
          parentPhone, emergencyName, emergencyPhone,
          selectedSports, sessionId: cartSessionId 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setRegistrationId(data.registrationId);
      setStep("upload");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerify = async () => {
    if (!screenshot || !registrationId || !utr || utr.trim() === "") {
      setError("Please provide both the screenshot and the Transaction UTR ID.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("registration_id", registrationId);
      formData.append("screenshot", screenshot);
      formData.append("utr", utr);
      if (cartSessionId) formData.append("session_id", cartSessionId);

      const res = await fetch("/api/register/verify", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        reset();
        router.push("/register/success");
      } else {
        if (data.status === "duplicate_utr") {
          setError("Fraud Detected: This Transaction ID has already been used.");
        } else {
          setError(data.error || "Verification failed");
        }
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg text-center">
      {step === "pay" ? (
        <>
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-display text-2xl font-bold mb-2">Scan & Pay</h2>
          <p className="text-text-muted mb-8 text-sm max-w-sm mx-auto">
            Scan the QR code below using any UPI app (GPay, PhonePe, Paytm).
          </p>

          <div className="bg-white p-4 rounded-3xl w-fit mx-auto shadow-2xl mb-8 border-4 border-primary/20">
            <QRCode value={upiLink} size={200} />
          </div>

          <div className="bg-surface/50 border border-glass-border rounded-2xl p-6 mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-muted text-sm">Payable to:</span>
              <span className="font-bold text-sm">{PAYEE_NAME}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-muted text-sm">VPA:</span>
              <span className="font-mono text-xs">{UPI_ID}</span>
            </div>
            <div className="border-t border-glass-border pt-4 flex justify-between items-center font-bold text-lg">
               <span>Amount</span>
               <span className="text-primary">₹{AMOUNT.toLocaleString()}</span>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-4 mb-6 text-sm flex items-center gap-3 text-left">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            onClick={startRegistration}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : "I've Paid, Continue ➔"}
          </button>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-display text-2xl font-bold mb-2">Upload Proof</h2>
          <p className="text-text-muted mb-6 text-sm max-w-sm mx-auto">
            Please enter your Transaction UTR ID and upload the payment screenshot.
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-4 mb-6 text-sm flex items-center gap-3 text-left">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="mb-6 text-left">
            <label className="block text-sm font-semibold mb-2 text-text-muted">Transaction ID (UTR Number)</label>
            <input 
              type="text" 
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="e.g. 312345678901"
              className="w-full bg-background border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 mb-8 cursor-pointer transition-all ${
              screenshot ? "border-green-500 bg-green-500/5" : "border-glass-border hover:border-primary/50 bg-white/5"
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            {preview ? (
              <div className="relative group">
                <img src={preview} alt="Success proof" className="max-h-64 mx-auto rounded-lg shadow-md" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-lg">
                  <RefreshCcw className="text-white w-8 h-8" />
                </div>
              </div>
            ) : (
              <div className="py-6">
                <Upload className="w-10 h-10 text-text-muted mx-auto mb-4" />
                <p className="text-sm font-medium">Click to upload screenshot</p>
                <p className="text-xs text-text-muted mt-1">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={handleVerify}
              disabled={!screenshot || !utr || utr.trim() === "" || isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Payment Proof"}
            </button>
            <button
              onClick={() => setStep("pay")}
              className="text-text-muted hover:text-text-primary transition-colors text-sm font-medium"
            >
              Back to QR Code
            </button>
          </div>
        </>
      )}

      <div className="mt-8 pt-8 border-t border-glass-border flex justify-center items-center gap-2 text-[10px] text-text-muted uppercase tracking-widest">
        <ShieldCheck className="w-3 h-3" /> Secure Registration Portal
      </div>
    </div>
  );
}
