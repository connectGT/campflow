import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { SPORTS } from "@/data/camp";

export async function POST(request: Request) {
  try {
    const { action, sportId, sessionId } = await request.json();

    if (!sportId || !sessionId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = await createClient();

    // Find the sport configuration locally to check totally capacity
    const sportConfig = SPORTS.find((s) => s.id === sportId);
    if (!sportConfig) {
      return NextResponse.json({ error: "Invalid sport selection" }, { status: 400 });
    }

    if (action === "reserve") {
      // 1. Check current capacity
      const { data: capacityData, error: capacityError } = await supabase
        .from("realtime_sport_capacity")
        .select("total_seats_taken")
        .eq("sport_id", sportId)
        .single();

      // If it doesn't exist, it means 0 are taken.
      const taken = capacityData?.total_seats_taken || 0;

      // 2. Validate availability
      if (taken >= sportConfig.seats_total) {
        return NextResponse.json({ error: "No seats available in " + sportConfig.name }, { status: 409 });
      }

      // 3. Insert reservation lock (10 minutes)
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      const { error: insertError } = await supabase
        .from("seat_reservations")
        .insert({
          sport_id: sportId,
          session_id: sessionId,
          expires_at: expiresAt,
        });

      if (insertError) {
        throw insertError;
      }

      return NextResponse.json({ success: true, expiresAt });
    } else if (action === "release") {
      // Release logic: delete 1 reservation for this session/sport
      // We limit to 1 using ctid or just deleting relying on constraints, but standard delete by session + sport works
      const { error: deleteError } = await supabase
        .from("seat_reservations")
        .delete()
        .eq("sport_id", sportId)
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
