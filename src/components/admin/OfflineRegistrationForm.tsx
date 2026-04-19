"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Loader2, ChevronDown, Sparkles, Upload, FileText, X, CheckCircle2 } from "lucide-react";

const SPORTS = ["swimming", "football", "cricket", "basketball", "badminton", "self_defence"];
const SPORT_LABELS: Record<string, string> = {
  swimming: "🏊 Swimming", football: "⚽ Football", cricket: "🏏 Cricket",
  basketball: "🏀 Basketball", badminton: "🏸 Badminton", self_defence: "🥋 Self Defence"
};
const TRANSPORT_POINTS = ["Self Drop", "Maharaj Bada", "Chetakpuri", "Padav", "Collectorate"];

const DEFAULT_FORM = {
  childName: "", childAge: "", childGrade: "",
  parentName: "", parentPhone: "", parentEmail: "",
  emergencyName: "", emergencyPhone: "",
  transportPoint: "Self Drop",
  slot1Sport: "swimming", slot2Sport: "football", slot3Sport: "cricket",
};

export function OfflineRegistrationForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMode, setAiMode] = useState<"image" | "text" | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [success, setSuccess] = useState(false);
  const [aiPreview, setAiPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // ── Gemini Magic Fill ──────────────────────────────────────────
  const handleAIFill = async (imageFile?: File) => {
    setAiLoading(true);
    try {
      const fd = new FormData();
      if (imageFile) {
        fd.append("image", imageFile);
        setAiPreview(URL.createObjectURL(imageFile));
      } else if (pasteText.trim()) {
        fd.append("text", pasteText);
      } else {
        alert("Provide an image or paste text first.");
        setAiLoading(false);
        return;
      }

      const res = await fetch("/api/admin/gemini-parse", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "AI parse failed");

      setForm((prev) => ({
        ...prev,
        ...data.data,
        childAge: String(data.data.childAge || ""),
      }));
      setAiMode(null);
      setPasteText("");
    } catch (err: any) {
      alert("Gemini error: " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  // ── Submit Offline Registration ────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.childName) { alert("Child name is required."); return; }
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
        setForm({ ...DEFAULT_FORM });
        setAiPreview(null);
        router.refresh();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        alert(data.error || "Failed to add registration");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-background border border-glass-border rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors";
  const selectClass = "w-full bg-background border border-glass-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none";
  const labelClass = "block text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1.5";

  return (
    <div className="glass-strong rounded-2xl border border-glass-border mb-6 overflow-hidden">
      {/* Header toggle */}
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-bold text-sm">Add Offline / Walk-in Registration</p>
            <p className="text-xs text-text-muted">Cash / in-person payment → instantly marks as paid & syncs sheet</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-glass-border">
          {/* ── Gemini AI Magic Fill Bar ── */}
          <div className="px-6 py-4 bg-gradient-to-r from-violet-500/10 to-primary/10 border-b border-glass-border">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-bold text-violet-300">Gemini Magic Fill</span>
              <span className="text-xs text-text-muted">— Upload a photo of the filled form or paste raw text</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Image Upload */}
              <button
                type="button"
                onClick={() => { setAiMode("image"); fileRef.current?.click(); }}
                disabled={aiLoading}
                className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {aiLoading && aiMode === "image" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                Upload Form Photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleAIFill(f); e.target.value = ""; }} />

              {/* Text Paste */}
              <button
                type="button"
                onClick={() => setAiMode(aiMode === "text" ? null : "text")}
                className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 text-xs font-bold rounded-xl transition-colors"
              >
                <FileText className="w-3 h-3" />
                Paste Form Text
              </button>

              {aiPreview && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400 font-bold">AI filled the form!</span>
                  <button onClick={() => setAiPreview(null)} className="ml-1 text-text-muted hover:text-white"><X className="w-3 h-3" /></button>
                </div>
              )}
            </div>

            {/* Text paste area */}
            {aiMode === "text" && (
              <div className="mt-3 flex gap-2">
                <textarea
                  value={pasteText}
                  onChange={e => setPasteText(e.target.value)}
                  placeholder="Paste registration form details here... e.g. Child: Arjun, Age: 12, Class 7, Sports: Swimming, Football, Cricket, Parent: Suresh, Phone: 9876543210..."
                  rows={4}
                  className="flex-1 bg-background border border-violet-500/40 rounded-xl px-3 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-violet-400 resize-none"
                />
                <button
                  type="button"
                  onClick={() => handleAIFill()}
                  disabled={aiLoading || !pasteText.trim()}
                  className="flex flex-col items-center justify-center gap-1 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 min-w-[80px]"
                >
                  {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Auto Fill
                </button>
              </div>
            )}
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="px-6 py-5">
            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-2 text-green-400 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" /> Registration added successfully and synced to Google Sheets!
              </div>
            )}

            {/* Section: Child */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">👦 Child Details</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className={labelClass}>Full Name *</label>
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

            {/* Section: Parent */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">👨‍👩‍👧 Parent / Guardian</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className={labelClass}>Parent Name</label>
                <input value={form.parentName} onChange={e => set("parentName", e.target.value)} placeholder="Guardian full name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input value={form.parentPhone} onChange={e => set("parentPhone", e.target.value)} placeholder="10-digit mobile" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email (optional)</label>
                <input type="email" value={form.parentEmail} onChange={e => set("parentEmail", e.target.value)} placeholder="parent@email.com" className={inputClass} />
              </div>
            </div>

            {/* Section: Emergency */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">🚨 Emergency Contact</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className={labelClass}>Contact Name</label>
                <input value={form.emergencyName} onChange={e => set("emergencyName", e.target.value)} placeholder="e.g. Suresh Kumar" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contact Phone</label>
                <input value={form.emergencyPhone} onChange={e => set("emergencyPhone", e.target.value)} placeholder="10-digit mobile" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Transport Pickup</label>
                <select value={form.transportPoint} onChange={e => set("transportPoint", e.target.value)} className={selectClass}>
                  {TRANSPORT_POINTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Section: Sports */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">🏅 Sport Slots</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "7:00 – 8:00 AM", key: "slot1Sport" },
                { label: "8:00 – 9:00 AM", key: "slot2Sport" },
                { label: "9:00 – 10:00 AM", key: "slot3Sport" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className={labelClass}>{label} *</label>
                  <select required value={form[key as keyof typeof form]} onChange={e => set(key, e.target.value)} className={selectClass}>
                    {SPORTS.map(s => <option key={s} value={s}>{SPORT_LABELS[s]}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                Add as Paid Registration
              </button>
              <button type="button" onClick={() => { setOpen(false); setForm({ ...DEFAULT_FORM }); setAiPreview(null); }} className="text-xs text-text-muted hover:text-white transition-colors px-3 py-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
