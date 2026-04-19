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

// POST /api/admin/whatsapp-reply
// Sends a WhatsApp message to a customer from the business number
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;
  if (!isValidAdminToken(adminToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { phone, message } = await request.json();

  if (!phone || !message?.trim()) {
    return NextResponse.json({ error: "phone and message are required" }, { status: 400 });
  }

  const TOKEN = process.env.META_WHATSAPP_TOKEN;
  const PHONE_ID = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

  if (!TOKEN || !PHONE_ID) {
    return NextResponse.json({ error: "WhatsApp credentials not configured" }, { status: 500 });
  }

  // Ensure e164 format: 919977855965
  const e164 = phone.startsWith("91") ? phone : `91${phone}`;

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: e164,
        type: "text",
        text: { preview_url: false, body: message.trim() },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[Admin Reply] Meta API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to send message" },
        { status: 500 }
      );
    }

    // Log the outbound admin reply to DB
    await supabase.from("whatsapp_messages").insert({
      phone: e164,
      direction: "outbound",
      message: message.trim(),
      intent: "admin_reply",
      wa_msg_id: data.messages?.[0]?.id || null,
    });

    console.log(`[Admin Reply] ✅ Sent to +${e164}: ${message.substring(0, 60)}`);
    return NextResponse.json({ success: true, messageId: data.messages?.[0]?.id });

  } catch (err: any) {
    console.error("[Admin Reply] Network error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
