"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ApproveRejectButtons({ registrationId }: { registrationId: string }) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [done, setDone] = useState<"approved" | "rejected" | null>(null);
  const router = useRouter();

  const handle = async (action: "approve" | "reject") => {
    setLoading(action);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId, action }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(action === "approve" ? "approved" : "rejected");
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
        {loading === "reject" ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
        Reject
      </button>
    </div>
  );
}
