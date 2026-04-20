import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { SPORTS as localSports } from "@/data/camp";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();

    // Ensure seats are taken if payment was made ("paid") OR if screenshot was uploaded ("pending_approval").
    // We also include active 15-minute temporary holds from the `seat_reservations` table!
    const { data: regs } = await supabase
      .from("registrations")
      .select("slot_1_sport, slot_2_sport, slot_3_sport")
      .in("payment_status", ["paid", "pending_approval"]);

    const { data: holds } = await supabase
      .from("seat_reservations")
      .select("sport_id, slot_id")
      .gt("expires_at", new Date().toISOString());

    const usageMap: Record<string, number> = {};

    regs?.forEach(r => {
      const s1 = r.slot_1_sport; const s2 = r.slot_2_sport; const s3 = r.slot_3_sport;
      if (s1) usageMap[`${s1}_slot_1`] = (usageMap[`${s1}_slot_1`] || 0) + 1;
      if (s2) usageMap[`${s2}_slot_2`] = (usageMap[`${s2}_slot_2`] || 0) + 1;
      if (s3) usageMap[`${s3}_slot_3`] = (usageMap[`${s3}_slot_3`] || 0) + 1;
    });

    holds?.forEach(h => {
      const key = `${h.sport_id}_${h.slot_id}`;
      usageMap[key] = (usageMap[key] || 0) + 1;
    });

    const slots = ["slot_1", "slot_2", "slot_3"];
    const availability: Record<string, any> = {};

    localSports.forEach((sport) => {
      availability[sport.id] = {};
      const slotCap = (sport as any).seats_per_slot || Math.floor(sport.seats_total / 3);

      slots.forEach((slot) => {
        const taken = usageMap[`${sport.id}_${slot}`] || 0;
        availability[sport.id][slot] = {
          taken,
          total: slotCap,
          remaining: Math.max(0, slotCap - taken)
        };
      });
    });

    return NextResponse.json({ availability });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
