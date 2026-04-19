import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/admin/whatsapp-history?phone=919977855965
// Returns conversation list or messages for a specific phone
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;
  if (!isValidAdminToken(adminToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");

  if (phone) {
    // Return full message history for a specific phone
    const { data: messages } = await supabase
      .from("whatsapp_messages")
      .select("*")
      .eq("phone", phone)
      .order("created_at", { ascending: true });

    return NextResponse.json({ messages: messages || [] });
  } else {
    // Return conversation list (latest message per phone)
    const { data: sessions } = await supabase
      .from("whatsapp_sessions")
      .select("phone, state, last_msg_at, name")
      .order("last_msg_at", { ascending: false })
      .limit(100);

    // For each session, get the last message
    const conversations = await Promise.all(
      (sessions || []).map(async (session: any) => {
        const { data: lastMsg } = await supabase
          .from("whatsapp_messages")
          .select("message, direction, created_at")
          .eq("phone", session.phone)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const { data: msgCount } = await supabase
          .from("whatsapp_messages")
          .select("id", { count: "exact" })
          .eq("phone", session.phone);

        return {
          phone: session.phone,
          localPhone: session.phone.replace(/^91/, ""),
          name: session.name || null,
          state: session.state,
          lastMessage: lastMsg?.message || "",
          lastDirection: lastMsg?.direction || "inbound",
          lastAt: lastMsg?.created_at || session.last_msg_at,
          messageCount: (msgCount as any)?.length || 0,
        };
      })
    );

    return NextResponse.json({ conversations });
  }
}
