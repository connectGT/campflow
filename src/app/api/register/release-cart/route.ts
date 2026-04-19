import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const supabase = await createClient();

    // Release all seats associated with this session
    const { error } = await supabase
      .from("seat_reservations")
      .delete()
      .eq("session_id", sessionId);

    if (error) {
      console.error("[ReleaseCart] Failed to delete reservations:", error);
      return NextResponse.json({ error: "Failed to release seats" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
