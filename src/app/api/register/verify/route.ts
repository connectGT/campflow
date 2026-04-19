import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const formData = await request.formData();
    
    const registrationId = formData.get("registration_id") as string;
    const screenshot = formData.get("screenshot") as File;
    const utr = formData.get("utr") as string;

    if (!registrationId || !screenshot || !utr || utr.trim() === "") {
      return NextResponse.json({ error: "Missing data, UTR, or screenshot" }, { status: 400 });
    }

    const cleanUtr = utr.trim().toUpperCase();

    // 1. Upload to Supabase Storage
    const fileName = `${registrationId}_${Date.now()}.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("payment-proofs")
      .upload(fileName, screenshot);

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload screenshot" }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from("payment-proofs")
      .getPublicUrl(fileName);

    // 2. Duplicate/Fraud Check
    const { data: existing } = await supabase
      .from("registrations")
      .select("id")
      .eq("utr_number", cleanUtr)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ 
        error: "This Transaction ID has already been used. Fraud attempt flagged.",
        status: "duplicate_utr" 
      }, { status: 409 });
    }

    // 3. Save UTR + screenshot, mark as pending admin approval
    const finalStatus = "pending_approval";

    const { data: reg, error: updateError } = await supabase
      .from("registrations")
      .update({
        payment_status: finalStatus,
        utr_number: cleanUtr,
        proof_image_url: publicUrl,
        ai_confidence: 1.0,
        verification_log: { method: "manual_utr_entry" }
      })
      .eq("id", registrationId)
      .select(`
        *,
        child:children(name, age, school),
        parent:profiles(full_name, email, phone)
      `)
      .single();

    if (updateError || !reg) {
      return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      status: finalStatus,
      utr: cleanUtr 
    });
  } catch (error: any) {
    console.error("Verification Logic Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

