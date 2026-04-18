import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 1. Verify Signature
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // 2. Update Registration status
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .update({
        payment_status: "paid",
        razorpay_payment_id: razorpay_payment_id,
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select(`*, child:children(name), parent:profiles(phone)`)
      .single();

    if (regError || !reg) {
      console.error("DB update error after payment:", regError);
      return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }

    // 3. Trigger Automation (WhatsApp)
    try {
      const { sendRegistrationWhatsApp } = await import("@/lib/whatsapp");
      await sendRegistrationWhatsApp(reg.parent?.phone || "", reg.child?.name || "your child");
    } catch (waError) {
      console.error("WhatsApp Trigger Failed:", waError);
      // Don't fail the verification if only the notification fails
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verification Logic Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
