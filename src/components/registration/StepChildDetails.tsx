"use client";

import { useCartStore } from "@/store/cart.store";
import { useState, useRef } from "react";
import { ChevronRight, ChevronDown, Camera, Upload, X, FileText } from "lucide-react";
import { TRANSPORT } from "@/data/camp";
import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

const TRANSPORT_POINTS = [...TRANSPORT.POINTS, "Self-Arrangement"];

const inputClass = "w-full bg-background border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-text-muted/60";
const selectClass = "w-full bg-background border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none";
const labelClass = "block text-sm font-semibold text-text-muted mb-2";
const sectionTitle = "text-[11px] font-bold uppercase tracking-widest text-primary mb-4 mt-1 pb-2 border-b border-glass-border";

const PhoneInput = ({ label, value, onChange, disabled }: {label:string, value:string, onChange:(v:string)=>void, disabled?:boolean}) => (
  <div>
    <label className={labelClass}>{label} <span className="text-red-400">*</span></label>
    <div className="flex">
      <span className="inline-flex items-center px-4 bg-surface border border-r-0 border-glass-border rounded-l-xl text-text-muted text-sm font-semibold">+91</span>
      <input
        type="tel"
        maxLength={10}
        disabled={disabled}
        className={`w-full bg-background border border-glass-border rounded-r-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-text-muted/60 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        placeholder="9876543210"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
      />
    </div>
  </div>
);

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
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Aadhar upload state
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [aadharUrl, setAadharUrl] = useState<string | null>(null);
  const [uploadingAadhar, setUploadingAadhar] = useState(false);
  const aadharRef = useRef<HTMLInputElement>(null);

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

  const compressFile = async (file: File) => {
    if (file.type === "application/pdf") return file;
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedBlob = await imageCompression(file, options);
      return new File([compressedBlob], file.name, { type: file.type });
    } catch (error) {
      console.warn("Compression failed, using original file", error);
      return file;
    }
  };

  const handlePhotoSelect = async (originalFile: File) => {
    if (originalFile.size > 5 * 1024 * 1024) {
      setError("Photo must be less than 5 MB.");
      return;
    }
    
    setUploadingPhoto(true);
    const file = await compressFile(originalFile);
    
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError("");

    // Upload immediately to storage
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("student-photos")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadErr) throw uploadErr;
      const { data: { publicUrl } } = supabase.storage.from("student-photos").getPublicUrl(path);
      setPhotoUrl(publicUrl);
    } catch (e: any) {
      setError("Photo upload failed: " + e.message);
      setPhotoPreview(null);
      setPhotoFile(null);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleAadharSelect = async (originalFile: File) => {
    if (originalFile.size > 5 * 1024 * 1024) { setError("Aadhar photo must be less than 5 MB."); return; }
    
    setUploadingAadhar(true);
    const file = await compressFile(originalFile);
    
    setAadharFile(file);
    setAadharPreview(URL.createObjectURL(file));
    setError("");
    
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("aadhar-photos")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadErr) throw uploadErr;
      const { data: { publicUrl } } = supabase.storage.from("aadhar-photos").getPublicUrl(path);
      setAadharUrl(publicUrl);
    } catch (e: any) {
      setError("Aadhar upload failed: " + e.message);
      setAadharPreview(null);
      setAadharFile(null);
    } finally {
      setUploadingAadhar(false);
    }
  };

  const handleNext = () => {
    const required = (val: string | null | undefined, label: string) => {
      if (!val || val.trim().length < 1) { setError(`${label} is required.`); return false; }
      return true;
    };

    if (!childName || childName.trim().length < 2) { setError("Swimmer's full name is required."); return; }
    if (!childGender) { setError("Gender is required."); return; }
    if (!childDob) { setError("Date of Birth is required."); return; }
    const age = calcAge(childDob);
    if (age < 5 || age > 22) { setError("Age must be between 5 and 22 years based on DOB."); return; }
    if (!fatherName || fatherName.trim().length < 2) { setError("Father's Name is required."); return; }
    if (!motherName || motherName.trim().length < 2) { setError("Mother's Name is required."); return; }
    if (!childSchool || childSchool.trim().length < 2) { setError("School Name is required."); return; }
    if (!photoUrl) { setError("Student photo is required. Please upload a photo."); return; }
    if (!aadharUrl) { setError("Aadhar card photo is required. Please upload the child's Aadhar card."); return; }
    if (!parentPhone || !/^[6-9]\d{9}$/.test(parentPhone)) { setError("Valid 10-digit Mobile Number is required."); return; }
    if (!whatsappNumber || !/^[6-9]\d{9}$/.test(whatsappNumber)) { setError("Valid 10-digit WhatsApp Number is required."); return; }
    if (!fullAddress || fullAddress.trim().length < 10) { setError("Full Address is required (minimum 10 characters)."); return; }
    if (!emergencyName || emergencyName.trim().length < 2) { setError("Emergency Contact Name is required."); return; }
    if (!emergencyPhone || !/^[6-9]\d{9}$/.test(emergencyPhone)) { setError("Valid Emergency Contact Number is required."); return; }
    if (!transportPoint) { setError("Pick-Up & Drop Point is required."); return; }

    // Store photo URLs in sessionStorage for the order API to pick up
    sessionStorage.setItem("student_photo_url", photoUrl);
    sessionStorage.setItem("aadhar_photo_url", aadharUrl!);
    setError("");
    nextStep();
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-10 shadow-lg">
      <h2 className="font-display text-2xl font-bold mb-1">Participant Details</h2>
      <p className="text-text-muted text-sm mb-6">All fields are required. Fill in exactly as per school records.</p>

      {error && (
        <div className="bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl p-4 mb-6 text-sm font-semibold flex items-center gap-2">
          ⚠️ {error}
        </div>
      )}

      <div className="space-y-8">

        {/* ── Section 1: Swimmer ── */}
        <div>
          <p className={sectionTitle}>👦 Swimmer's Information</p>
          <div className="grid md:grid-cols-2 gap-5">

            {/* Photo Upload */}
            <div className="md:col-span-2">
              <label className={labelClass}>Latest Photo of Swimmer <span className="text-red-400">*</span></label>
              <div className="flex items-center gap-5">
                {/* Preview */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`relative w-24 h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
                    ${photoPreview ? "border-primary" : "border-glass-border hover:border-primary/60"}`}
                >
                  {photoPreview ? (
                    <>
                      {photoFile?.type.includes("pdf") ? (
                        <div className="flex flex-col items-center justify-center w-full h-full bg-surface/50 text-primary">
                          <FileText className="w-8 h-8 mb-1" />
                          <span className="text-[10px] font-bold">PDF FILE</span>
                        </div>
                      ) : (
                        <img src={photoPreview} alt="Swimmer" className="w-full h-full object-cover" />
                      )}
                      {uploadingPhoto && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-text-muted mb-1" />
                      <span className="text-[9px] text-text-muted text-center px-1">Tap to upload</span>
                    </>
                  )}
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-surface border border-glass-border hover:border-primary text-sm font-semibold rounded-xl transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    {photoFile ? "Change File" : "Upload Photo"}
                  </button>
                  <p className="text-xs text-text-muted mt-2">JPG, PNG, or PDF, max 5 MB.</p>
                  {photoUrl && !uploadingPhoto && (
                    <p className="text-xs text-green-400 mt-1 font-semibold">✓ File uploaded</p>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoSelect(f); e.target.value = ""; }}
                />
              </div>
            </div>

            {/* Name */}
            <div className="md:col-span-2">
              <label className={labelClass}>Name of Swimmer <span className="text-red-400">*</span></label>
              <input type="text" className={inputClass} placeholder="e.g. Arjun Kumar Sharma" value={childName} onChange={(e) => setChildName(e.target.value)} />
            </div>

            {/* Gender */}
            <div>
              <label className={labelClass}>Gender <span className="text-red-400">*</span></label>
              <div className="flex gap-3">
                {[{ val: "male", label: "♂ Male" }, { val: "female", label: "♀ Female" }].map(({ val, label }) => (
                  <button key={val} type="button" onClick={() => setChildGender(val)}
                    className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${childGender === val ? "bg-primary/20 border-primary text-primary" : "bg-background border-glass-border text-text-muted hover:border-primary/50"}`}
                  >{label}</button>
                ))}
              </div>
            </div>

            {/* DOB */}
            <div>
              <label className={labelClass}>
                Date of Birth <span className="text-red-400">*</span>
                {childDob && <span className="ml-2 text-primary text-xs font-bold">(Age: {calcAge(childDob)} yrs)</span>}
              </label>
              <input type="date" className={inputClass}
                max={new Date(Date.now() - 5 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                value={childDob} onChange={(e) => setChildDob(e.target.value)} />
            </div>

            {/* Father */}
            <div>
              <label className={labelClass}>Father's Name <span className="text-red-400">*</span></label>
              <input type="text" className={inputClass} placeholder="e.g. Suresh Kumar" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
            </div>

            {/* Mother */}
            <div>
              <label className={labelClass}>Mother's Name <span className="text-red-400">*</span></label>
              <input type="text" className={inputClass} placeholder="e.g. Sunita Devi" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
            </div>

            {/* School */}
            <div className="md:col-span-2">
              <label className={labelClass}>School Name <span className="text-red-400">*</span></label>
              <input type="text" className={inputClass} placeholder="e.g. Scindia School, Gwalior" value={childSchool} onChange={(e) => setChildSchool(e.target.value)} />
            </div>

            {/* Aadhar Card Upload */}
            <div className="md:col-span-2">
              <label className={labelClass}>Aadhar Card of Child <span className="text-red-400">*</span></label>
              <div className="flex items-center gap-5">
                <div
                  onClick={() => aadharRef.current?.click()}
                  className={`relative w-40 h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
                    ${aadharPreview ? "border-primary" : "border-glass-border hover:border-primary/60"}`}
                >
                  {aadharPreview ? (
                    <>
                      {aadharFile?.type.includes("pdf") ? (
                        <div className="flex flex-col items-center justify-center w-full h-full bg-surface/50 text-secondary">
                          <FileText className="w-8 h-8 mb-1" />
                          <span className="text-[10px] font-bold">PDF FILE</span>
                        </div>
                      ) : (
                        <img src={aadharPreview} alt="Aadhar" className="w-full h-full object-cover" />
                      )}
                      {uploadingAadhar && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-text-muted mb-1" />
                      <span className="text-[9px] text-text-muted text-center px-1">Tap to upload</span>
                    </>
                  )}
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => aadharRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-surface border border-glass-border hover:border-primary text-sm font-semibold rounded-xl transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    {aadharFile ? "Change File" : "Upload Aadhar"}
                  </button>
                  <p className="text-xs text-text-muted mt-2">JPG, PNG, or PDF, max 5 MB.</p>
                  {aadharUrl && !uploadingAadhar && (
                    <p className="text-xs text-green-400 mt-1 font-semibold">✓ Aadhar uploaded</p>
                  )}
                </div>
                <input
                  ref={aadharRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleAadharSelect(f); e.target.value = ""; }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* ── Section 2: Contact ── */}
        <div>
          <p className={sectionTitle}>📞 Contact Information</p>
          <div className="grid md:grid-cols-2 gap-5">
            <PhoneInput label="Mobile Number" value={parentPhone} onChange={(v) => { setParentPhone(v); if (sameAsPhone) setWhatsappNumber(v); }} />

            <div>
              <label className={labelClass}>
                WhatsApp Number <span className="text-red-400">*</span>
                <label className="ml-3 text-xs cursor-pointer font-normal text-text-muted">
                  <input type="checkbox" className="mr-1 accent-primary" checked={sameAsPhone}
                    onChange={(e) => handleSameAsPhone(e.target.checked)} />
                  Same as mobile
                </label>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-surface border border-r-0 border-glass-border rounded-l-xl text-text-muted text-sm font-semibold">+91</span>
                <input type="tel" maxLength={10} disabled={sameAsPhone}
                  className={`w-full bg-background border border-glass-border rounded-r-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-text-muted/60 ${sameAsPhone ? "opacity-60 cursor-not-allowed" : ""}`}
                  placeholder="9876543210" value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, "").slice(0, 10))} />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Full Address <span className="text-red-400">*</span></label>
              <textarea rows={2} className={`${inputClass} resize-none`}
                placeholder="House No., Street, Area, City — e.g. 12, Shivaji Nagar, Gwalior 474001"
                value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
            </div>
          </div>
        </div>

        {/* ── Section 3: Emergency & Transport ── */}
        <div>
          <p className={sectionTitle}>🚨 Emergency & Transport</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Emergency Contact Name <span className="text-red-400">*</span></label>
              <input type="text" className={inputClass} placeholder="e.g. Rahul Sharma (Uncle)" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
            </div>
            <PhoneInput label="Emergency Contact Phone" value={emergencyPhone} onChange={setEmergencyPhone} />
            <div className="md:col-span-2 relative">
              <label className={labelClass}>Pick-Up & Drop Point <span className="text-red-400">*</span></label>
              <select className={selectClass} value={transportPoint} onChange={(e) => setTransportPoint(e.target.value)}>
                <option value="" disabled>Select a location</option>
                {TRANSPORT_POINTS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 bottom-3.5 w-4 h-4 text-text-muted" />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleNext} disabled={uploadingPhoto || uploadingAadhar}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50">
          Next Step <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default StepChildDetails;
