import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { SPORTS as localSports } from "@/data/camp";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: capacityData, error } = await supabase
      .from("realtime_sport_capacity")
      .select("*");

    if (error) {
      console.error("[Availability] Error fetching capacities:", error);
      return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
    }

    // Process local static targets vs current DB usage
    const slots = ["slot_1", "slot_2", "slot_3"];
    
    // We construct an object: { "swimming": { "slot_1": { taken: 10, total: 40 }, "slot_2": ... } }
    const availability: Record<string, any> = {};

    localSports.forEach((sport) => {
      availability[sport.id] = {};
      
      // seats_total in camp.ts = direct per-slot capacity
      // e.g. Swimming=40, Football=25, Cricket=25, Basketball=15, Badminton=10, Self-Defence=10
      const slotCap = sport.seats_total;

      slots.forEach((slot) => {
        // find usage in DB
        const usage = capacityData?.find((d) => d.sport_id === sport.id && d.slot_id === slot);
        const taken = usage ? Number(usage.total_seats_taken) : 0;
        
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
