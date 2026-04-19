import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { 
      childName, childAge, childSchool, 
      parentPhone, emergencyName, emergencyPhone, transportPoint,
      selectedSports, sessionId 
    } = body;

    if (!childName || !childAge || !selectedSports || selectedSports.length !== 3) {
      return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
    }

    // 1. Create or ensure child exists
    const { data: child, error: childError } = await supabase
      .from("children")
      .upsert(
        { 
          parent_id: user.id, 
          name: childName, 
          age: childAge,
          school: childSchool,
        },
        { onConflict: "" } 
      )
      .select()
      .single();

    if (childError || !child) {
      return NextResponse.json({ error: "Failed to save child details" }, { status: 500 });
    }

    // Update parent phone locally on profile
    await supabase.from("profiles").update({ phone: parentPhone }).eq("id", user.id);

    const amount = 12000;

    // 3. Create Registration record (Pending)
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .insert({
        parent_id: user.id,
        child_id: child.id,
        sports: selectedSports, // Now text[] array!
        amount,
        payment_status: "pending",
        transport_pickup: transportPoint,
        emergency_contact_name: emergencyName,
        emergency_contact_phone: emergencyPhone
      })
      .select()
      .single();

    if (regError || !reg) {
      console.error("Registration Save Error:", regError);
      return NextResponse.json({ error: "Failed to create registration" }, { status: 500 });
    }

    // 4. Release local Cart Locks immediately as they are moving to verification
    if (sessionId) {
      await supabase.from("seat_reservations").delete().eq("session_id", sessionId);
    }

    if (regError || !reg) {
      console.error("Registration Save Error:", regError);
      return NextResponse.json({ error: "Failed to create registration" }, { status: 500 });
    }

    return NextResponse.json({
      registrationId: reg.id,
      amount: reg.amount,
      currency: "INR",
    });
  } catch (error: any) {
    console.error("Order Creation Logic Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
