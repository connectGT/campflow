/**
 * WhatsApp Notification Service (Mock)
 * In production, this would call a Meta Cloud API or Business API provider.
 */

export async function sendRegistrationWhatsApp(phone: string, childName: string) {
  console.log(`[WhatsApp] Sending success message to ${phone} for ${childName}`);
  
  // Simulation delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const message = `Hello! 👋 Your registration for ${childName} at CampFlow is confirmed. We've received your payment. See you at the camp! 🏏🏊⚽`;

  // Log the message for verification in dev
  console.log(`[WhatsApp Content]: ${message}`);

  return { success: true, messageId: `msg_${Date.now()}` };
}
