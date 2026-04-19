import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const registrationId = formData.get("registration_id") as string;
    const screenshot = formData.get("screenshot") as File;
    const utr = formData.get("utr") as string;

    if (!registrationId || !screenshot || !utr || utr.trim() === "") {
      return NextResponse.json({ error: "Missing data, UTR, or screenshot" }, { status: 400 });
    }

    const cleanUtr = utr.trim().toUpperCase();

    // Use service role client to bypass RLS for updates
    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Upload screenshot to Supabase Storage
    const fileName = `${registrationId}_${Date.now()}.jpg`;
    const { error: uploadError } = await adminSupabase.storage
      .from("payment-proofs")
      .upload(fileName, screenshot, { upsert: true });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload screenshot" }, { status: 500 });
    }

    const { data: { publicUrl } } = adminSupabase.storage
      .from("payment-proofs")
      .getPublicUrl(fileName);

    // 2. Duplicate UTR / Fraud Check
    const { data: existing } = await adminSupabase
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

    // 3. Update registration — save UTR, screenshot, set pending_approval
    const { error: updateError } = await adminSupabase
      .from("registrations")
      .update({
        payment_status: "pending_approval",
        utr_number: cleanUtr,
        proof_image_url: publicUrl,
      })
      .eq("id", registrationId);

    if (updateError) {
      console.error("Update error:", updateError);
      return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      status: "pending_approval",
      utr: cleanUtr 
    });

  } catch (error: any) {
    console.error("Verification Logic Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
