"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export function ApproveRejectButtons({ registrationId }: { registrationId: string }) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [done, setDone] = useState<"approved" | "rejected" | null>(null);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const router = useRouter();

  const handle = async (action: "approve" | "reject") => {
    if (action === "reject" && !showRejectForm) {
      setShowRejectForm(true);
      return;
    }
    if (action === "reject" && !rejectReason.trim()) {
      alert("Please enter a rejection reason for the parent.");
      return;
    }
    setLoading(action);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId, action, rejectionReason: rejectReason }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(action === "approve" ? "approved" : "rejected");
        setShowRejectForm(false);
        router.refresh();
      } else {
        alert(data.error || "Action failed");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  if (done === "approved") {
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">
        <CheckCircle2 className="w-3 h-3" /> Approved
      </span>
    );
  }
  if (done === "rejected") {
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-1 rounded-full">
        <XCircle className="w-3 h-3" /> Rejected
      </span>
    );
  }

  // Reject reason form
  if (showRejectForm) {
    return (
      <div className="flex flex-col gap-2 min-w-[200px]">
        <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
          <AlertTriangle className="w-3 h-3" /> Rejection Reason
        </div>
        <textarea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="e.g. UTR not found in bank statement for 18 Apr..."
          rows={3}
          className="w-full text-xs bg-background border border-red-400/30 rounded-lg px-3 py-2 text-white placeholder:text-text-muted resize-none focus:outline-none focus:border-red-400"
        />
        <div className="flex gap-2">
          <button
            onClick={() => handle("reject")}
            disabled={!!loading}
            className="flex-1 flex items-center justify-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 hover:bg-red-400/20 border border-red-400/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading === "reject" ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
            Confirm Reject
          </button>
          <button
            onClick={() => { setShowRejectForm(false); setRejectReason(""); }}
            className="text-xs text-text-muted hover:text-white px-2 py-1.5 rounded-lg border border-glass-border transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handle("approve")}
        disabled={!!loading}
        className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 hover:bg-green-400/20 border border-green-400/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading === "approve" ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
        Approve
      </button>
      <button
        onClick={() => handle("reject")}
        disabled={!!loading}
        className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 hover:bg-red-400/20 border border-red-400/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
      >
        <XCircle className="w-3 h-3" />
        Reject
      </button>
    </div>
  );
}
