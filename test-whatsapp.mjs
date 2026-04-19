// Test script: verify WhatsApp token is working
// Run with: node test-whatsapp.mjs <phone_number>
// Example:  node test-whatsapp.mjs 9977855965

import * as fs from "fs";

// ── Read env ───────────────────────────────────────────────────────
const envRaw = fs.readFileSync(".env.local", "utf-8");
const env = {};
for (const line of envRaw.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  if (!env[key]) env[key] = val;
}

const TOKEN = env["META_WHATSAPP_TOKEN"];
const PHONE_ID = env["META_WHATSAPP_PHONE_NUMBER_ID"];
const TEST_PHONE = process.argv[2]; // pass as argument

console.log("─────────────────────────────────────────────");
console.log("🔍 WhatsApp Config Check:");
console.log("  META_WHATSAPP_TOKEN:", TOKEN ? `SET (${TOKEN.length} chars)` : "❌ MISSING");
console.log("  META_WHATSAPP_PHONE_NUMBER_ID:", PHONE_ID || "❌ MISSING");
console.log("  Test phone:", TEST_PHONE ? `+91${TEST_PHONE}` : "⚠️  Not provided (pass as argument)");
console.log("─────────────────────────────────────────────\n");

if (!TOKEN || !PHONE_ID) {
  console.error("❌ Missing credentials. Aborting.");
  process.exit(1);
}

if (!TEST_PHONE) {
  console.error("❌ Provide a phone number as argument: node test-whatsapp.mjs 9876543210");
  process.exit(1);
}

const phone = TEST_PHONE.replace(/\D/g, "");
const e164 = phone.startsWith("91") ? phone : `91${phone}`;

const body = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: e164,
  type: "text",
  text: {
    preview_url: false,
    body:
      `नमस्कार 🙏\n\n` +
      `यह एक *Test Message* है Dheera Sports Foundation की तरफ से।\n\n` +
      `✅ WhatsApp integration is working!\n\n` +
      `— Dheera Sports Team`,
  },
};

console.log(`📤 Sending test WhatsApp to +${e164}...`);

const res = await fetch(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const data = await res.json();

if (!res.ok) {
  console.error("\n❌ FAILED:", JSON.stringify(data, null, 2));
  if (data.error?.code === 190) {
    console.error("\n🔑 Token is INVALID or EXPIRED. Generate a new permanent token.");
  } else if (data.error?.code === 131030) {
    console.error("\n📵 Phone number not in allowed test recipients.");
    console.error("   → If using a Test number, go to Meta Developers → WhatsApp → API Setup → Add recipient.");
  }
} else {
  console.log("\n✅ SUCCESS! Message sent.");
  console.log("  Message ID:", data.messages?.[0]?.id);
  console.log("  Check your WhatsApp now!");
}
