import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { parsePaymentScreenshot } from "@/lib/ai/gemini";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const formData = await request.formData();
    
    const registrationId = formData.get("registration_id") as string;
    const screenshot = formData.get("screenshot") as File;

    if (!registrationId || !screenshot) {
      return NextResponse.json({ error: "Missing data or screenshot" }, { status: 400 });
    }

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

    // 2. AI Parsing (Gemini)
    const buffer = Buffer.from(await screenshot.arrayBuffer());
    const aiResult = await parsePaymentScreenshot(buffer, screenshot.type);

    if (!aiResult.utr) {
      return NextResponse.json({ 
        error: "AI could not find a UTR number. Please ensure the screenshot is clear.",
        status: "failed_ocr"
      }, { status: 422 });
    }

    // 3. Duplicate/Fraud Check
    const { data: existing } = await supabase
      .from("registrations")
      .select("id")
      .eq("utr_number", aiResult.utr)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ 
        error: "This Transaction ID has already been used. Fraud attempt flagged.",
        status: "duplicate_utr" 
      }, { status: 409 });
    }

    // 4. Update Registration Status
    // If amount matches exactly, we can mark as paid. If not, mark as pending_approval.
    const isAmountValid = aiResult.amount === 12000;
    const finalStatus = isAmountValid ? "paid" : "pending_approval";

    const { data: reg, error: updateError } = await supabase
      .from("registrations")
      .update({
        payment_status: finalStatus,
        utr_number: aiResult.utr,
        proof_image_url: publicUrl,
        ai_confidence: aiResult.confidence,
        verification_log: { ai_result: aiResult }
      })
      .eq("id", registrationId)
      .select(`*, child:children(name), parent:profiles(phone)`)
      .single();

    if (updateError || !reg) {
      return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }

    // 5. Trigger Automation if status is paid
    if (finalStatus === "paid") {
      try {
        const { sendRegistrationWhatsApp } = await import("@/lib/whatsapp");
        await sendRegistrationWhatsApp(reg.parent?.phone || "", reg.child?.name || "your child");
        
        const { appendRegistrationToSheet } = await import("@/lib/google");
        await appendRegistrationToSheet({
          childName: reg.child?.name || "Unknown",
          childAge: reg.child?.age || 0,
          parentName: reg.parent?.full_name || "Unknown",
          parentEmail: reg.parent?.email || "",
          parentPhone: reg.parent?.phone || "",
          sports: reg.sports || [],
          amount: reg.amount || 12000,
          orderId: reg.id
        });
      } catch (automationError) {
        console.error("Post-verification automation failed:", automationError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      status: finalStatus,
      utr: aiResult.utr 
    });
  } catch (error: any) {
    console.error("Verification Logic Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
