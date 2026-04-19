import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Admin gate
    const isAdmin = user?.email === "gurutray@gmail.com" || user?.email?.endsWith("@campflow.in") || user?.email === "muktabhinav@gmail.com";
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { registrationId, action } = await request.json();

    if (!registrationId || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Fetch full registration details
    const { data: reg, error: fetchError } = await supabase
      .from("registrations")
      .select(`
        *, 
        child:children(name, age, school),
        parent:profiles(full_name, email, phone)
      `)
      .eq("id", registrationId)
      .single();

    if (fetchError || !reg) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Mark as paid
      await supabase.from("registrations").update({ payment_status: "paid" }).eq("id", registrationId);

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
          childSchool: reg.child?.school || "Unknown",
          parentName: reg.parent?.full_name || "Unknown",
          parentEmail: reg.parent?.email || "",
          parentPhone: reg.parent?.phone || reg.emergency_contact_phone || "",
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
      } catch (sheetErr) {
        console.error("[Admin Approve] Google Sheets sync failed:", sheetErr);
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
      // REJECT: delete registration so the slot is freed
      await supabase.from("registrations").delete().eq("id", registrationId);

      // Also clean up any lingering cart reservations for this child
      await supabase.from("seat_reservations").delete().eq("child_id", reg.child_id);

      return NextResponse.json({ success: true, status: "rejected" });
    }
  } catch (error: any) {
    console.error("[Admin Approve] Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
