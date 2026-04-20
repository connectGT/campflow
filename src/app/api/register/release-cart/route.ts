import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const supabase = await createClient();

    // Auth guard — must be logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Release only seats that belong to this user's session (prevents cross-user deletion)
    const { error } = await supabase
      .from("seat_reservations")
      .delete()
      .eq("session_id", sessionId)
      .eq("user_id", user.id);

    if (error) {
      console.error("[ReleaseCart] Failed to delete reservations:", error);
      return NextResponse.json({ error: "Failed to release seats" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

