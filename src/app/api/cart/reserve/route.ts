import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { SPORTS } from "@/data/camp";

export async function POST(request: Request) {
  try {
    const { action, sportId, slotId, sessionId } = await request.json();

    if (!sportId || !sessionId || !slotId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = await createClient();

    // Find the sport configuration locally to check totally capacity
    const sportConfig = SPORTS.find((s) => s.id === sportId);
    if (!sportConfig) {
      return NextResponse.json({ error: "Invalid sport selection" }, { status: 400 });
    }

    const slotCap = Math.floor(sportConfig.seats_total / 3);

    if (action === "reserve") {
      // 1. Check current capacity for THIS SPECIFIC SLOT
      const { data: capacityData, error: capacityError } = await supabase
        .from("realtime_sport_capacity")
        .select("total_seats_taken")
        .eq("sport_id", sportId)
        .eq("slot_id", slotId)
        .maybeSingle();

      // If it doesn't exist, it means 0 are taken.
      const taken = capacityData?.total_seats_taken || 0;

      // 2. Validate availability against the slot cap (not total cap)
      if (taken >= slotCap) {
        return NextResponse.json({ error: `No seats available in ${sportConfig.name} at this time slot` }, { status: 409 });
      }

      // 3. Insert reservation lock (10 minutes)
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      const { error: insertError } = await supabase
        .from("seat_reservations")
        .insert({
          sport_id: sportId,
          slot_id: slotId,
          session_id: sessionId,
          expires_at: expiresAt,
        });

      if (insertError) {
        throw insertError;
      }

      return NextResponse.json({ success: true, expiresAt });
    } else if (action === "release") {
      // Release logic: delete 1 reservation for this session/sport/slot
      const { error: deleteError } = await supabase
        .from("seat_reservations")
        .delete()
        .eq("sport_id", sportId)
        .eq("slot_id", slotId)
        .eq("session_id", sessionId);

      if (deleteError) {
        throw deleteError;
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    console.error("[Cart] Reserve Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
