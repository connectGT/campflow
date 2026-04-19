import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
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
    let dbChildId = null;

    // Check if child already exists by name for this parent
    const { data: existingChild } = await supabase
      .from("children")
      .select("id")
      .eq("parent_id", user.id)
      .eq("name", childName)
      .maybeSingle();

    if (existingChild) {
      dbChildId = existingChild.id;
      // Optionally update age/grade here if you want
      await supabase.from("children").update({ age: Number(childAge), grade: childSchool }).eq("id", dbChildId);
    } else {
      const { data: child, error: childError } = await supabase
        .from("children")
        .insert({ 
          parent_id: user.id, 
          name: childName, 
          age: Number(childAge),
          grade: childSchool, // schema uses 'grade', not 'school'
        })
        .select()
        .single();

      if (childError || !child) {
        console.error("Child Insert Error:", childError);
        return NextResponse.json({ error: `Failed to save child: ${childError?.message || "Unknown error"}` }, { status: 500 });
      }
      dbChildId = child.id;
    }

    // Update parent phone locally on profile
    await supabase.from("profiles").update({ phone: parentPhone }).eq("id", user.id);

    const amount = 12000;

    // 3. Create Registration record (Pending)
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .insert({
        parent_id: user.id,
        child_id: dbChildId,
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
