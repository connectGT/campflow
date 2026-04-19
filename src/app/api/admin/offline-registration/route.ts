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
    // Admin auth check
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;
    if (!isValidAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const {
      childName, childAge, childGrade,
      parentName, parentPhone, parentEmail,
      emergencyName, emergencyPhone,
      transportPoint,
      slot1Sport, slot2Sport, slot3Sport,
      notes,
    } = body;

    if (!childName || !slot1Sport || !slot2Sport || !slot3Sport) {
      return NextResponse.json({ error: "Child name and all 3 sports are required" }, { status: 400 });
    }

    // Use service role to bypass RLS
    const supabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Create an offline parent profile (dummy UUID-based or use a fixed offline admin profile)
    //    We use a special "offline" profile linked to a placeholder user
    const offlineParentId = "00000000-0000-0000-0000-000000000001";

    // Ensure the offline profile exists
    await supabase.from("profiles").upsert({
      id: offlineParentId,
      full_name: parentName || "Offline Registration",
      email: parentEmail || "offline@dheera.in",
      phone: parentPhone || "",
    }, { onConflict: "id" });

    // 2. Create child record
    const { data: child, error: childError } = await supabase
      .from("children")
      .insert({
        parent_id: offlineParentId,
        name: childName,
        age: Number(childAge) || 0,
        grade: childGrade || "",
      })
      .select()
      .single();

    if (childError || !child) {
      console.error("Offline child insert error:", childError);
      return NextResponse.json({ error: "Failed to create child record" }, { status: 500 });
    }

    // 3. Create registration — directly mark as PAID (offline = cash/in-person verified)
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .insert({
        parent_id: offlineParentId,
        child_id: child.id,
        slot_1_sport: slot1Sport,
        slot_2_sport: slot2Sport,
        slot_3_sport: slot3Sport,
        amount: 12000,
        payment_status: "paid",   // Offline = admin verified in person
        utr_number: `OFFLINE-${Date.now()}`,
        transport_pickup: transportPoint || "Self Drop",
        emergency_contact_name: emergencyName || "",
        emergency_contact_phone: emergencyPhone || "",
      })
      .select()
      .single();

    if (regError || !reg) {
      console.error("Offline reg insert error:", regError);
      return NextResponse.json({ error: "Failed to create registration" }, { status: 500 });
    }

    // 4. Sync to Google Sheets
    try {
      const { appendRegistrationToSheet } = await import("@/lib/google");
      await appendRegistrationToSheet({
        childName,
        childAge: Number(childAge) || 0,
        childSchool: childGrade || "",
        parentName: parentName || "Offline",
        parentEmail: parentEmail || "offline@dheera.in",
        parentPhone: parentPhone || "",
        emergencyName: emergencyName || "N/A",
        emergencyPhone: emergencyPhone || "N/A",
        transportPoint: transportPoint || "Self Drop",
        sports: [
          `7-8AM: ${slot1Sport}`,
          `8-9AM: ${slot2Sport}`,
          `9-10AM: ${slot3Sport}`,
        ],
        amount: 12000,
        orderId: reg.id,
        utrNumber: `OFFLINE-CASH`,
        screenshotUrl: "N/A",
        status: "Offline / Cash",
      });
    } catch (sheetErr) {
      console.error("Offline Sheets sync failed:", sheetErr);
    }

    return NextResponse.json({ success: true, registrationId: reg.id });
  } catch (error: any) {
    console.error("[Offline Registration] Error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
