import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { MSG, parseIntent } from "@/lib/whatsapp-bot";

export const dynamic = "force-dynamic";

const TOKEN = process.env.META_WHATSAPP_TOKEN!;
const PHONE_ID = process.env.META_WHATSAPP_PHONE_NUMBER_ID!;
const VERIFY_TOKEN = process.env.META_WHATSAPP_VERIFY_TOKEN!;
const ADMIN_PHONE = process.env.ADMIN_WHATSAPP_PHONE || "919977855965"; // admin's WhatsApp

// ─── Supabase service role client ──────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Log a message to DB ───────────────────────────────────────────
async function logMessage(
  phone: string,
  direction: "inbound" | "outbound",
  message: string,
  intent?: string,
  waMsgId?: string
) {
  try {
    await supabase.from("whatsapp_messages").insert({
      phone,
      direction,
      message,
      intent: intent || null,
      wa_msg_id: waMsgId || null,
    });
  } catch (e) {
    console.error("[WA Bot] Failed to log message:", e);
  }
}

// ─── Send a WhatsApp text message ──────────────────────────────────
async function sendMessage(to: string, body: string, intent?: string) {
  if (!TOKEN || !PHONE_ID) {
    console.warn("[WA Bot] Missing credentials — cannot send message.");
    return;
  }
  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { preview_url: false, body },
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("[WA Bot] Send error:", JSON.stringify(data));
    } else {
      console.log(`[WA Bot] ✅ Sent to ${to}`);
      // Log outbound message
      await logMessage(to, "outbound", body, intent);
    }
  } catch (e) {
    console.error("[WA Bot] Network error:", e);
  }
}

// ─── Look up registration status by phone ──────────────────────────
async function lookupStatus(phone: string) {
  // Remove country code for DB lookup
  const localPhone = phone.replace(/^91/, "");
  
  // Check profiles table for parent with this phone
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name")
    .or(`phone.eq.${localPhone},phone.eq.91${localPhone}`)
    .maybeSingle();

  if (!profile) return null;

  // Get their latest registration
  const { data: reg } = await supabase
    .from("registrations")
    .select("payment_status, child:children(name)")
    .eq("parent_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!reg) return null;
  return { childName: (reg.child as any)?.name || "your child", status: reg.payment_status };
}

// ─── Fetch live seat availability from DB ─────────────────────────
async function lookupSeats() {
  // Sport metadata (name, emoji, total seats)
  const SPORT_META: Record<string, { name: string; emoji: string; total: number }> = {
    swimming:   { name: "Swimming",    emoji: "🏊", total: 40 },
    cricket:    { name: "Cricket",     emoji: "🏏", total: 40 },
    football:   { name: "Football",    emoji: "⚽", total: 40 },
    basketball: { name: "Basketball",  emoji: "🏀", total: 40 },
    badminton:  { name: "Badminton",   emoji: "🏸", total: 40 },
    self_defense: { name: "Self Defense", emoji: "🥋", total: 40 },
  };

  const { data: capacities } = await supabase
    .from("realtime_sport_capacity")
    .select("sport_id, total_seats_taken");

  const takenMap: Record<string, number> = {};
  (capacities || []).forEach((c: any) => {
    takenMap[c.sport_id] = parseInt(c.total_seats_taken || "0");
  });

  return Object.entries(SPORT_META).map(([id, meta]) => ({
    name: meta.name,
    emoji: meta.emoji,
    total: meta.total,
    remaining: Math.max(0, meta.total - (takenMap[id] || 0)),
  }));
}

// ─── Notify admin when customer wants to talk ──────────────────────
async function notifyAdmin(customerPhone: string, message: string) {
  const adminMsg =
    `⚠️ *Customer needs help!*\n\n` +
    `📞 Phone: +${customerPhone}\n` +
    `💬 Last message: "${message}"\n\n` +
    `Please reply to them on WhatsApp or call.`;
  await sendMessage(ADMIN_PHONE, adminMsg);
}

// ─── Update/create session ─────────────────────────────────────────
async function updateSession(phone: string, state: string) {
  await supabase.from("whatsapp_sessions").upsert(
    { phone, state, last_msg_at: new Date().toISOString() },
    { onConflict: "phone" }
  );
}

// ═══════════════════════════════════════════════════════════════════
// GET — Webhook verification (Meta calls this once to verify URL)
// ═══════════════════════════════════════════════════════════════════
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[WA Webhook] ✅ Verified by Meta");
    return new Response(challenge, { status: 200 });
  }

  console.warn("[WA Webhook] ❌ Verification failed — token mismatch");
  return new Response("Forbidden", { status: 403 });
}

// ═══════════════════════════════════════════════════════════════════
// POST — Incoming messages from customers
// ═══════════════════════════════════════════════════════════════════
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Meta sends a test ping — acknowledge it
    if (!body?.entry?.[0]?.changes?.[0]?.value?.messages) {
      return NextResponse.json({ status: "ok" });
    }

    const value = body.entry[0].changes[0].value;
    const messages = value.messages;
    const contacts = value.contacts || [];

    for (const msg of messages) {
      // Only handle text messages
      if (msg.type !== "text") {
        await sendMessage(msg.from, "🙏 अभी हम केवल text messages handle कर सकते हैं। कृपया text में लिखें।");
        continue;
      }

      const from = msg.from; // e164 format: 919977855965
      const text = msg.text?.body || "";
      const contactName = contacts[0]?.profile?.name;
      const localPhone = from.replace(/^91/, ""); // 10-digit local number

      console.log(`[WA Bot] Message from +${from}: "${text}"`);

      // Log inbound message to DB for admin history view
      await logMessage(from, "inbound", text, undefined, msg.id);

      // Get or create session
      const { data: session } = await supabase
        .from("whatsapp_sessions")
        .select("state, last_msg_at")
        .eq("phone", from)
        .maybeSingle();

      const isNewUser = !session;
      const intent = parseIntent(text);

      // ── Route to response ──────────────────────────────────────
      switch (intent) {
        case "menu":
          if (isNewUser) {
            await sendMessage(from, MSG.WELCOME(contactName));
          } else {
            await sendMessage(from, MSG.MENU_PROMPT);
          }
          await updateSession(from, "menu");
          break;

        case "registration":
          await sendMessage(from, MSG.REGISTRATION);
          await updateSession(from, "registration");
          break;

        case "sports":
          await sendMessage(from, MSG.SPORTS);
          await updateSession(from, "sports");
          break;

        case "fees":
          await sendMessage(from, MSG.FEES);
          await updateSession(from, "fees");
          break;

        case "pickup":
          await sendMessage(from, MSG.PICKUP);
          await updateSession(from, "pickup");
          break;

        case "camp_dates":
          await sendMessage(from, MSG.CAMP_DATES);
          await updateSession(from, "camp_dates");
          break;

        case "status": {
          await sendMessage(from, MSG.STATUS_CHECKING, "status");
          const result = await lookupStatus(localPhone);
          if (result) {
            await sendMessage(from, MSG.STATUS_FOUND(result.childName, result.status), "status");
          } else {
            await sendMessage(from, MSG.STATUS_NOT_FOUND(localPhone), "status");
          }
          await updateSession(from, "status");
          break;
        }


        case "seats": {
          await sendMessage(from, MSG.SEATS_CHECKING, "seats");
          const sportsData = await lookupSeats();
          await sendMessage(from, MSG.SEATS_AVAILABLE(sportsData), "seats");
          await updateSession(from, "seats");
          break;
        }

        case "talk_to_team":
          await sendMessage(from, MSG.TALK_TO_TEAM, "talk_to_team");
          await notifyAdmin(from, text);
          await updateSession(from, "talk_to_team");
          break;

        case "unknown":
        default:
          // New user gets welcome, existing gets unknown prompt
          if (isNewUser) {
            await sendMessage(from, MSG.WELCOME(contactName));
            await updateSession(from, "menu");
          } else {
            await sendMessage(from, MSG.UNKNOWN);
            await updateSession(from, "unknown");
          }
          break;
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("[WA Webhook] Error:", err);
    // Always return 200 to Meta — otherwise it retries
    return NextResponse.json({ status: "ok" });
  }
}
