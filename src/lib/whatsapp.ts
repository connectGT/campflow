/**
 * WhatsApp Notification Service
 * Sends via Meta WhatsApp Cloud API directly (no Chatwoot)
 */

export async function sendRegistrationWhatsApp(phone: string, childName: string) {
  // Fix: use META_ prefixed env vars (matches .env.local and Vercel config)
  const token = process.env.META_WHATSAPP_TOKEN;
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

  if (!phone) {
    console.warn("[WhatsApp] No phone number provided, skipping.");
    return { success: false, reason: "no_phone" };
  }

  // Ensure 91XXXXXXXXXX format
  const formattedPhone = phone.replace(/\D/g, "");
  const e164Phone = formattedPhone.startsWith("91") ? formattedPhone : `91${formattedPhone}`;

  const messageText =
    `नमस्कार 🙏\n\n` +
    `*${childName}* का Dheera Sports Foundation में Registration हो गया है!\n\n` +
    `✅ Payment Confirmed\n` +
    `🏅 Camp starts soon — we'll notify you with the schedule.\n\n` +
    `किसी भी सहायता के लिए हमसे संपर्क करें।\n\n` +
    `— Dheera Sports Team`;

  console.log(`[WhatsApp] Sending to +${e164Phone} for child: ${childName}`);

  if (!token || !phoneNumberId) {
    console.warn("[WhatsApp] META_WHATSAPP_TOKEN or META_WHATSAPP_PHONE_NUMBER_ID not set. Logging mock message.");
    console.log(`[WhatsApp MOCK]:\n${messageText}`);
    return { success: true, mock: true };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: e164Phone,
          type: "text",
          text: {
            preview_url: false,
            body: messageText,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[WhatsApp] Meta API Error:", JSON.stringify(data, null, 2));
      return { success: false, error: data.error?.message || "API error" };
    }

    console.log(`[WhatsApp] ✅ Sent to +${e164Phone}, messageId: ${data.messages?.[0]?.id}`);
    return { success: true, messageId: data.messages?.[0]?.id };

  } catch (error: any) {
    console.error("[WhatsApp] Network Error:", error.message);
    return { success: false, error: error.message };
  }
}
