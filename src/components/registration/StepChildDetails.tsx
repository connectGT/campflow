"use client";

import { useCartStore } from "@/store/cart.store";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { TRANSPORT } from "@/data/camp";

const TRANSPORT_POINTS = [...TRANSPORT.POINTS, "Self-Arrangement"];

const inputClass = "w-full bg-background border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-text-muted/60";
const selectClass = "w-full bg-background border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none";
const labelClass = "block text-sm font-medium text-text-muted mb-2";
const sectionTitle = "text-xs font-bold uppercase tracking-widest text-primary mb-4 mt-2";

export function StepChildDetails() {
  const {
    childName, childGender, childDob, childSchool,
    fatherName, motherName,
    parentPhone, whatsappNumber, fullAddress,
    emergencyName, emergencyPhone, transportPoint,
    setChildName, setChildGender, setChildDob, setChildSchool,
    setFatherName, setMotherName,
    setParentPhone, setWhatsappNumber, setFullAddress,
    setEmergencyName, setEmergencyPhone, setTransportPoint,
    nextStep
  } = useCartStore();

  const [error, setError] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);

  const handleSameAsPhone = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) setWhatsappNumber(parentPhone);
  };

  const calcAge = (dob: string): number => {
    if (!dob) return 0;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleNext = () => {
    if (!childName || childName.trim().length < 2) {
      setError("Please enter the Swimmer's full name.");
      return;
    }
    if (!childGender) {
      setError("Please select Gender.");
      return;
    }
    if (!childDob) {
      setError("Please enter Date of Birth.");
      return;
    }
    const age = calcAge(childDob);
    if (age < 5 || age > 22) {
      setError("Age must be between 5 and 22 years.");
      return;
    }
    if (!fatherName && !motherName) {
      setError("Please enter at least Father's Name or Mother's Name.");
      return;
    }
    if (!childSchool || childSchool.trim().length < 2) {
      setError("Please enter the School Name.");
      return;
    }
    if (!parentPhone || !/^[6-9]\d{9}$/.test(parentPhone)) {
      setError("Please enter a valid 10-digit Mobile Number.");
      return;
    }
    if (!whatsappNumber || !/^[6-9]\d{9}$/.test(whatsappNumber)) {
      setError("Please enter a valid 10-digit WhatsApp Number.");
      return;
    }
    if (!fullAddress || fullAddress.trim().length < 5) {
      setError("Please enter your Full Address.");
      return;
    }
    if (!emergencyName || emergencyName.trim().length < 2) {
      setError("Please enter Emergency Contact Name.");
      return;
    }
    if (!emergencyPhone || !/^[6-9]\d{9}$/.test(emergencyPhone)) {
      setError("Please enter a valid Emergency Contact Number.");
      return;
    }
    if (!transportPoint) {
      setError("Please select a Transport / Drop point.");
      return;
    }
    setError("");
    nextStep();
  };

  const PhoneInput = ({ label, value, onChange, placeholder }: any) => (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex">
        <span className="inline-flex items-center px-4 bg-surface border border-r-0 border-glass-border rounded-l-xl text-text-muted text-sm font-medium">
          +91
        </span>
        <input
          type="tel"
          maxLength={10}
          className="w-full bg-background border border-glass-border rounded-r-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-text-muted/60"
          placeholder={placeholder || "9876543210"}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        />
      </div>
    </div>
  );

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg">
      <h2 className="font-display text-2xl font-bold mb-2">Participant Details</h2>
      <p className="text-text-muted text-sm mb-6">Fill in all details as they appear on school records.</p>

      {error && (
        <div className="bg-destructive/20 text-destructive border border-destructive/50 rounded-xl p-3 mb-6 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="space-y-8">

        {/* ── Section 1: Child Info ── */}
        <div>
          <p className={sectionTitle}>👦 Swimmer's Information</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={labelClass}>Name of Swimmer *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Arjun Kumar Sharma"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className={labelClass}>Gender *</label>
              <div className="flex gap-3">
                {[
                  { val: "male", icon: "♂", label: "Male" },
                  { val: "female", icon: "♀", label: "Female" },
                ].map(({ val, icon, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setChildGender(val)}
                    className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      childGender === val
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-background border-glass-border text-text-muted hover:border-primary/50"
                    }`}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className={labelClass}>
                Date of Birth *
                {childDob && (
                  <span className="ml-2 text-primary font-bold">
                    (Age: {calcAge(childDob)} yrs)
                  </span>
                )}
              </label>
              <input
                type="date"
                className={inputClass}
                max={new Date(Date.now() - 5 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                value={childDob}
                onChange={(e) => setChildDob(e.target.value)}
              />
            </div>

            {/* Father */}
            <div>
              <label className={labelClass}>Father's Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Suresh Kumar"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </div>

            {/* Mother */}
            <div>
              <label className={labelClass}>Mother's Name *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Sunita Devi"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
              />
            </div>

            {/* School */}
            <div className="md:col-span-2">
              <label className={labelClass}>School Name *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Scindia School, Gwalior"
                value={childSchool}
                onChange={(e) => setChildSchool(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: Contact ── */}
        <div>
          <p className={sectionTitle}>📞 Contact Information</p>
          <div className="grid md:grid-cols-2 gap-5">
            <PhoneInput
              label="Mobile Number *"
              value={parentPhone}
              onChange={(v: string) => {
                setParentPhone(v);
                if (sameAsPhone) setWhatsappNumber(v);
              }}
            />

            <div>
              <label className={labelClass}>
                WhatsApp Number *
                <label className="ml-3 text-xs cursor-pointer text-text-muted font-normal">
                  <input
                    type="checkbox"
                    className="mr-1 accent-primary"
                    checked={sameAsPhone}
                    onChange={(e) => handleSameAsPhone(e.target.checked)}
                  />
                  Same as mobile
                </label>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-surface border border-r-0 border-glass-border rounded-l-xl text-text-muted text-sm font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  className="w-full bg-background border border-glass-border rounded-r-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-text-muted/60"
                  placeholder="9876543210"
                  value={whatsappNumber}
                  disabled={sameAsPhone}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Full Address *</label>
              <textarea
                rows={2}
                className={`${inputClass} resize-none`}
                placeholder="House No., Street, Area, City — e.g. 12, Shivaji Nagar, Gwalior 474001"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Section 3: Emergency & Transport ── */}
        <div>
          <p className={sectionTitle}>🚨 Emergency & Transport</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Emergency Contact Name *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Rahul Sharma (Uncle)"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
              />
            </div>
            <PhoneInput
              label="Emergency Contact Phone *"
              value={emergencyPhone}
              onChange={setEmergencyPhone}
            />
            <div className="md:col-span-2 relative">
              <label className={labelClass}>Pick-Up & Drop Point *</label>
              <select
                className={selectClass}
                value={transportPoint}
                onChange={(e) => setTransportPoint(e.target.value)}
              >
                <option value="" disabled>Select a location</option>
                {TRANSPORT_POINTS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-[calc(50%+8px)] -translate-y-1/2 w-4 h-4 text-text-muted" />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Next Step <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default StepChildDetails;
