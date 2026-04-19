/**
 * WhatsApp Notification Service
 * Integrates directly with Meta WhatsApp Cloud API
 */

export async function sendRegistrationWhatsApp(phone: string, childName: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

  const messageText = `नमस्कार 🙏\n\nYour registration for *${childName}* at Dheera Sports Foundation is securely confirmed! We have successfully received your payment.\n\nWe look forward to forging an Olympic spirit within ${childName} this summer.\n\n- The Dheera Team`;

  console.log(`[WhatsApp] Attempting to send message to ${formattedPhone} for ${childName}`);

  if (!token || !phoneNumberId) {
    console.warn("[WhatsApp] WARN: WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID missing in .env. Falling back to mock console log.");
    console.log(`[Mock WhatsApp Content]: ${messageText}`);
    return { success: true, mock: true };
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone,
        type: "text",
        text: {
          preview_url: false,
          body: messageText
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[WhatsApp] Meta API Error:", data);
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    console.log(`[WhatsApp] Successfully pushed to ${formattedPhone}`);
    return { success: true, messageId: data.messages?.[0]?.id };
  } catch (error) {
    console.error("[WhatsApp] Network/Parsing Error:", error);
    // Depending on strictness, we might throw or gracefully fail. 
    // Usually, notifications shouldn't crash the main verification pipeline.
    return { success: false, error };
  }
}
