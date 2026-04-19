import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createHmac } from "crypto";

export const dynamic = "force-dynamic";

function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const user = process.env.ADMIN_USERNAME || "";
  const pass = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_JWT_SECRET || "change-this-in-production";
  const expected = createHmac("sha256", secret).update(user + ":" + pass).digest("hex");
  return token === expected;
}

export async function POST(request: Request) {
  try {
    // Cookie-based admin auth (matches /dheera-control login)
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;
    if (!isValidAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Always use service role client to bypass RLS — admin has no Supabase session
    const supabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { registrationId, action, rejectionReason } = await request.json();

    if (!registrationId || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Fetch full registration details (service role bypasses RLS)
    const { data: reg, error: fetchError } = await supabase
      .from("registrations")
      .select(`
        *, 
        child:children(name, age, grade),
        parent:profiles(full_name, email, phone)
      `)
      .eq("id", registrationId)
      .single();

    if (fetchError || !reg) {
      console.error("[Admin Approve] Fetch error:", fetchError);
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Mark as paid
      const { error: updateErr } = await supabase
        .from("registrations")
        .update({ payment_status: "paid" })
        .eq("id", registrationId);

      if (updateErr) {
        console.error("[Admin Approve] Update error:", updateErr);
        return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
      }

      // Sync to Google Sheets
      try {
        const { appendRegistrationToSheet } = await import("@/lib/google");

        const sports: string[] = [];
        if (reg.slot_1_sport) sports.push(`7-8AM: ${reg.slot_1_sport}`);
        if (reg.slot_2_sport) sports.push(`8-9AM: ${reg.slot_2_sport}`);
        if (reg.slot_3_sport) sports.push(`9-10AM: ${reg.slot_3_sport}`);

        await appendRegistrationToSheet({
          childName: reg.child?.name || "Unknown",
          childAge: reg.child?.age || 0,
          childGender: reg.child?.gender || "",
          childDob: reg.child?.date_of_birth || "",
          fatherName: reg.child?.father_name || "",
          motherName: reg.child?.mother_name || "",
          childSchool: reg.child?.grade || "N/A",
          parentName: reg.parent?.full_name || "Unknown",
          parentEmail: reg.parent?.email || "",
          parentPhone: reg.parent?.phone || "",
          whatsappNumber: reg.whatsapp_number || reg.parent?.phone || "",
          fullAddress: reg.full_address || "",
          emergencyName: reg.emergency_contact_name || "N/A",
          emergencyPhone: reg.emergency_contact_phone || "N/A",
          transportPoint: reg.transport_pickup || "Self Drop",
          sports,
          amount: reg.amount || 12000,
          orderId: reg.id,
          utrNumber: reg.utr_number || "N/A",
          screenshotUrl: reg.proof_image_url || "N/A",
          status: "Approved",
        });

        console.log("[Admin Approve] ✅ Google Sheets sync successful for:", reg.child?.name);
      } catch (sheetErr) {
        // Log but don't fail the approval — sheet sync is non-critical
        console.error("[Admin Approve] ⚠️ Google Sheets sync failed:", sheetErr);
      }

      // WhatsApp notification
      try {
        const { sendRegistrationWhatsApp } = await import("@/lib/whatsapp");
        await sendRegistrationWhatsApp(reg.parent?.phone || "", reg.child?.name || "your child");
      } catch (waErr) {
        console.error("[Admin Approve] WhatsApp notification failed:", waErr);
      }

      return NextResponse.json({ success: true, status: "paid" });

    } else {
      // REJECT: mark as rejected, save reason
      const { error: rejectError } = await supabase
        .from("registrations")
        .update({
          payment_status: "rejected",
          rejection_reason: rejectionReason || "Payment could not be verified.",
        })
        .eq("id", registrationId);

      if (rejectError) {
        console.error("[Admin Approve] Reject error:", rejectError);
        return NextResponse.json({ error: "Failed to reject registration" }, { status: 500 });
      }

      // Clean up cart seat reservations
      await supabase.from("seat_reservations").delete().eq("session_id", reg.id);

      return NextResponse.json({ success: true, status: "rejected" });
    }

  } catch (error: any) {
    console.error("[Admin Approve] Unexpected error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
