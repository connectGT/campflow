"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Loader2, X, ChevronDown } from "lucide-react";

const SPORTS = ["swimming", "football", "cricket", "basketball", "badminton", "self_defence"];
const TRANSPORT_POINTS = ["Maharaj Bada", "Chetakpuri", "Padav", "Collectorate", "Self Drop"];

export function OfflineRegistrationForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    childName: "", childAge: "", childGrade: "",
    parentName: "", parentPhone: "", parentEmail: "",
    emergencyName: "", emergencyPhone: "",
    transportPoint: "Self Drop",
    slot1Sport: "swimming", slot2Sport: "football", slot3Sport: "cricket",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.childName || !form.slot1Sport || !form.slot2Sport || !form.slot3Sport) {
      alert("Child name and all 3 sports required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/offline-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({
          childName: "", childAge: "", childGrade: "",
          parentName: "", parentPhone: "", parentEmail: "",
          emergencyName: "", emergencyPhone: "",
          transportPoint: "Self Drop",
          slot1Sport: "swimming", slot2Sport: "football", slot3Sport: "cricket",
        });
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert(data.error || "Failed to add registration");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "w-full bg-background border border-glass-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary appearance-none";
  const inputClass = "w-full bg-background border border-glass-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-primary";
  const labelClass = "block text-xs text-text-muted font-medium mb-1";

  return (
    <div className="glass-strong rounded-2xl border border-glass-border mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-bold text-sm">Add Offline Registration</p>
            <p className="text-xs text-text-muted">Cash / in-person payment — directly marks as paid</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-6 pb-6 border-t border-glass-border pt-5">
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-bold">
              ✅ Offline registration added and synced to Google Sheets!
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClass}>Child Full Name *</label>
              <input required value={form.childName} onChange={e => set("childName", e.target.value)} placeholder="e.g. Arjun Kumar" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input type="number" min={4} max={22} value={form.childAge} onChange={e => set("childAge", e.target.value)} placeholder="e.g. 12" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>School / Grade</label>
              <input value={form.childGrade} onChange={e => set("childGrade", e.target.value)} placeholder="e.g. Class 7, DPS" className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClass}>Parent Name</label>
              <input value={form.parentName} onChange={e => set("parentName", e.target.value)} placeholder="Parent / Guardian" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Parent Phone</label>
              <input value={form.parentPhone} onChange={e => set("parentPhone", e.target.value)} placeholder="10-digit mobile" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Parent Email</label>
              <input type="email" value={form.parentEmail} onChange={e => set("parentEmail", e.target.value)} placeholder="(optional)" className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClass}>Emergency Contact Name</label>
              <input value={form.emergencyName} onChange={e => set("emergencyName", e.target.value)} placeholder="e.g. Suresh Kumar" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Emergency Phone</label>
              <input value={form.emergencyPhone} onChange={e => set("emergencyPhone", e.target.value)} placeholder="10-digit mobile" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Transport Pickup</label>
              <select value={form.transportPoint} onChange={e => set("transportPoint", e.target.value)} className={selectClass}>
                {TRANSPORT_POINTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {[
              { label: "7:00 – 8:00 AM Sport *", key: "slot1Sport" },
              { label: "8:00 – 9:00 AM Sport *", key: "slot2Sport" },
              { label: "9:00 – 10:00 AM Sport *", key: "slot3Sport" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                <select
                  required
                  value={form[key as keyof typeof form]}
                  onChange={e => set(key, e.target.value)}
                  className={selectClass}
                >
                  {SPORTS.map(s => (
                    <option key={s} value={s}>{s.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-glass-border">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              Add as Paid Registration
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-xs text-text-muted hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
