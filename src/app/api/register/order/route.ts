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
      childName, childGender, childDob, childSchool,
      fatherName, motherName, photoUrl,
      parentPhone, whatsappNumber, fullAddress,
      emergencyName, emergencyPhone, transportPoint,
      selectedSports, sessionId,
    } = body;

    // Derive age from DOB
    const calcAge = (dob: string) => {
      if (!dob) return null;
      const today = new Date();
      const birth = new Date(dob);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      return age;
    };

    if (!childName || !selectedSports?.slot_1 || !selectedSports?.slot_2 || !selectedSports?.slot_3) {
      return NextResponse.json({ error: "Invalid registration data. Please complete all slots." }, { status: 400 });
    }

    // 0. Ensure parent profile exists (handles DB resets where profiles got wiped)
    await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
          phone: parentPhone,
        },
        { onConflict: "id" }
      );

    // 1. Create or update child record
    const childData = {
      name: childName,
      gender: childGender || null,
      date_of_birth: childDob || null,
      age: calcAge(childDob),
      grade: childSchool || null,
      father_name: fatherName || null,
      mother_name: motherName || null,
      photo_url: photoUrl || null,
    };

    const { data: existingChild } = await supabase
      .from("children")
      .select("id")
      .eq("parent_id", user.id)
      .eq("name", childName)
      .maybeSingle();

    let dbChildId = null;

    if (existingChild) {
      dbChildId = existingChild.id;
      await supabase.from("children").update(childData).eq("id", dbChildId);
    } else {
      const { data: child, error: childError } = await supabase
        .from("children")
        .insert({ parent_id: user.id, ...childData })
        .select()
        .single();

      if (childError || !child) {
        console.error("Child Insert Error:", childError);
        return NextResponse.json({ error: `Failed to save child: ${childError?.message || "Unknown error"}` }, { status: 500 });
      }
      dbChildId = child.id;
    }

    // 2. Update parent phone and WhatsApp on profile
    await supabase.from("profiles").update({ phone: parentPhone }).eq("id", user.id);

    const amount = 12000;

    // 3. Create Registration record
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .insert({
        parent_id: user.id,
        child_id: dbChildId,
        slot_1_sport: selectedSports.slot_1,
        slot_2_sport: selectedSports.slot_2,
        slot_3_sport: selectedSports.slot_3,
        amount,
        payment_status: "pending",
        transport_pickup: transportPoint,
        emergency_contact_name: emergencyName,
        emergency_contact_phone: emergencyPhone,
        whatsapp_number: whatsappNumber || parentPhone,
        full_address: fullAddress || null,
      })
      .select()
      .single();

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
