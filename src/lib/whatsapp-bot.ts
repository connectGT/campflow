/**
 * WhatsApp Bot — Messages & Flow Definitions
 * All auto-reply content for Dheera Sports Foundation
 */

export const MSG = {
  // ─── Main Welcome + Menu ────────────────────────────────────────
  WELCOME: (name?: string) =>
    `🏅 *नमस्कार${name ? ` ${name}` : ""}!*\n` +
    `Dheera Sports Foundation में आपका स्वागत है! 🙏\n\n` +
    `आप किस बारे में जानना चाहते हैं? नीचे से नंबर टाइप करें:\n\n` +
    `1️⃣  Registration & Admission\n` +
    `2️⃣  Sports & Time Schedule\n` +
    `3️⃣  Fees & Payment\n` +
    `4️⃣  Pickup & Drop Points\n` +
    `5️⃣  Camp Dates & Details\n` +
    `6️⃣  My Registration Status\n` +
    `7️⃣  🪑 Seats Availability (Live)\n` +
    `8️⃣  Talk to our Team\n\n` +
    `_किसी भी समय *menu* टाइप करें मुख्य मेनू के लिए।_`,

  MENU_PROMPT:
    `मुख्य मेनू:\n\n` +
    `1️⃣  Registration\n` +
    `2️⃣  Sports & Timings\n` +
    `3️⃣  Fees\n` +
    `4️⃣  Pickup Points\n` +
    `5️⃣  Camp Dates\n` +
    `6️⃣  My Status\n` +
    `7️⃣  🪑 Seats Availability (Live)\n` +
    `8️⃣  Talk to Team\n\n` +
    `नंबर टाइप करें 👆`,

  // ─── 1: Registration ────────────────────────────────────────────
  REGISTRATION:
    `📋 *Registration कैसे करें?*\n\n` +
    `✅ Step 1 — हमारी website पर जाएं:\n` +
    `👉 https://campflow-rho.vercel.app\n\n` +
    `✅ Step 2 — "Register Now" पर click करें\n\n` +
    `✅ Step 3 — बच्चे की details भरें:\n` +
    `   • नाम, जन्मतिथि, Gender\n` +
    `   • माता-पिता का नाम, School\n` +
    `   • Photo, Address\n\n` +
    `✅ Step 4 — 3 Sports चुनें (अलग-अलग slots में)\n\n` +
    `✅ Step 5 — ₹12,000 UPI से payment करें\n` +
    `   📱 UPI ID: *9977855965@ybl*\n\n` +
    `✅ Step 6 — Screenshot upload करें और UTR डालें\n\n` +
    `📞 Help के लिए: *8️⃣ Talk to Team*\n\n` +
    `_मुख्य मेनू के लिए *menu* टाइप करें।_`,

  // ─── 2: Sports & Timings ────────────────────────────────────────
  SPORTS:
    `🏊 *Sports & Time Schedule*\n\n` +
    `*Time Slots:*\n` +
    `⏰ Slot 1 — 7:00 AM – 8:00 AM\n` +
    `⏰ Slot 2 — 8:00 AM – 9:00 AM\n` +
    `⏰ Slot 3 — 9:00 AM – 10:00 AM\n\n` +
    `*Available Sports:*\n` +
    `🏊 Swimming\n` +
    `🏏 Cricket\n` +
    `⚽ Football\n` +
    `🏀 Basketball\n` +
    `🏸 Badminton\n` +
    `🥋 Self Defense\n\n` +
    `📌 हर बच्चा *3 अलग sports* choose कर सकता है — एक-एक हर slot में।\n` +
    `📌 एक ही sport दो slots में नहीं चुन सकते।\n\n` +
    `_मुख्य मेनू के लिए *menu* टाइप करें।_`,

  // ─── 3: Fees ────────────────────────────────────────────────────
  FEES:
    `💰 *Fees & Payment*\n\n` +
    `*Total Fees: ₹12,000*\n` +
    `(सभी 3 sports + transport शामिल)\n\n` +
    `*Payment Method:*\n` +
    `📱 UPI Payment\n` +
    `   • UPI ID: *9977855965@ybl*\n` +
    `   • Name: Dheera Sports Foundation\n\n` +
    `*Process:*\n` +
    `1. UPI से ₹12,000 transfer करें\n` +
    `2. Screenshot save करें\n` +
    `3. Website पर UTR number और screenshot upload करें\n` +
    `4. 24 घंटे में admin verify करेंगे\n` +
    `5. Confirmation WhatsApp पर मिलेगा ✅\n\n` +
    `⚠️ *Cash payment भी accepted है* — किसी team member से मिलें\n\n` +
    `_मुख्य मेनू के लिए *menu* टाइप करें।_`,

  // ─── 4: Pickup Points ───────────────────────────────────────────
  PICKUP:
    `🚌 *Pickup & Drop Points*\n\n` +
    `हम निम्न जगहों से pickup/drop करते हैं:\n\n` +
    `📍 *Maharaj Bada*\n` +
    `📍 *Chetakpuri*\n` +
    `📍 *Padav*\n` +
    `📍 *Collectorate*\n\n` +
    `🕕 सुबह 6:30 बजे तक pickup point पर पहुंचें\n` +
    `🕙 वापसी 10:15 AM के आसपास\n\n` +
    `📌 Registration के समय अपना pickup point select करें।\n` +
    `📌 अगर खुद लाना-ले जाना है तो *Self-Arrangement* choose करें।\n\n` +
    `_मुख्य मेनू के लिए *menu* टाइप करें।_`,

  // ─── 5: Camp Dates ──────────────────────────────────────────────
  CAMP_DATES:
    `📅 *Camp Dates & Details*\n\n` +
    `🗓️ *Summer Sports Camp 2025*\n\n` +
    `📌 Venue: Dheera Sports Academy, Gwalior\n` +
    `⏰ Time: 7:00 AM – 10:00 AM (Daily)\n` +
    `📆 Duration: 6 Weeks\n\n` +
    `*What's included:*\n` +
    `✅ Professional coaching in 3 sports\n` +
    `✅ Transport (for selected pickup points)\n` +
    `✅ Certificate of completion\n` +
    `✅ Progress report\n\n` +
    `*Age Group:* 5 – 22 years\n\n` +
    `⚠️ *Seats are limited — Register जल्दी करें!*\n` +
    `👉 https://campflow-rho.vercel.app\n\n` +
    `_मुख्य मेनू के लिए *menu* टाइप करें।_`,

  // ─── 6: Status Check (dynamic) ──────────────────────────────────
  STATUS_CHECKING: "🔍 आपका registration status check हो रहा है...",

  // ─── 7: Seats Availability (dynamic) ────────────────────────────
  SEATS_CHECKING: "🪑 Seats availability check हो रही है...",

  SEATS_AVAILABLE: (sports: { name: string; emoji: string; total: number; slot1Remaining: number; slot2Remaining: number; slot3Remaining: number }[]) => {
    const lines = sports.map(s => {
      const b = (n: number) => n <= 0 ? "🔴 FULL" : n <= 3 ? `🟡 ${n}` : `🟢 ${n}`;
      return `${s.emoji} *${s.name}*\n   7-8AM: ${b(s.slot1Remaining)}  |  8-9AM: ${b(s.slot2Remaining)}  |  9-10AM: ${b(s.slot3Remaining)}`;
    }).join("\n\n");

    const anyFull = sports.some(s => s.slot1Remaining <= 0 || s.slot2Remaining <= 0 || s.slot3Remaining <= 0);

    return (
      `🪑 *Seats Availability (Slot-wise Live)*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      lines +
      `\n\n` +
      (anyFull
        ? `⚠️ कुछ slots *Full* हो चुके हैं! जल्दी करें।\n`
        : `✅ अभी सभी slots में seats उपलब्ध हैं।\n`) +
      `\n👉 Register Now: https://campflow-rho.vercel.app\n\n` +
      `_मुख्य मेनू के लिए *menu* टाइप करें।_`
    );
  },

  STATUS_FOUND: (childName: string, status: string) => {
    const statusMap: Record<string, string> = {
      pending: "⏳ Payment pending — website पर screenshot upload करें",
      pending_approval: "⏳ Payment verification में है — 24 घंटे में confirm होगा",
      paid: "✅ Registration confirmed! Camp में आपका स्वागत है 🏅",
      rejected: "❌ Payment verify नहीं हो सका — team से संपर्क करें",
    };
    return (
      `📋 *Registration Status*\n\n` +
      `👦 Name: *${childName}*\n` +
      `Status: ${statusMap[status] || status}\n\n` +
      `किसी help के लिए *8* टाइप करें।\n` +
      `_मुख्य मेनू के लिए *menu* टाइप करें।_`
    );
  },

  STATUS_NOT_FOUND: (phone: string) =>
    `❌ इस नंबर (+91${phone}) से कोई registration नहीं मिली।\n\n` +
    `अगर आपने register किया है और यह message आ रहा है तो:\n` +
    `• किसी और नंबर से register किया हो\n` +
    `• Registration अभी complete नहीं हुई हो\n\n` +
    `Register करने के लिए *1* टाइप करें।\n` +
    `Team से बात करें — *8* टाइप करें।`,

  // ─── 8: Talk to Team ────────────────────────────────────────────
  TALK_TO_TEAM:
    `👨‍💼 *Team से बात करें*\n\n` +
    `आपकी request note हो गई है।\n` +
    `हमारा team जल्द ही आपसे संपर्क करेगा। 🙏\n\n` +
    `📞 Direct Call भी कर सकते हैं:\n` +
    `   *+91 99778 55965*\n\n` +
    `⏰ Available: 7 AM – 8 PM (Mon–Sat)\n\n` +
    `_मुख्य मेनू के लिए *menu* टाइप करें।_`,

  // ─── Fallback ────────────────────────────────────────────────────
  UNKNOWN:
    `🤔 माफ करें, मैं समझ नहीं पाया।\n\n` +
    `कृपया नीचे से एक नंबर टाइप करें:\n\n` +
    `1️⃣ Registration\n` +
    `2️⃣ Sports & Timings\n` +
    `3️⃣ Fees\n` +
    `4️⃣ Pickup Points\n` +
    `5️⃣ Camp Dates\n` +
    `6️⃣ My Status\n` +
    `7️⃣  🪑 Seats Availability (Live)\n` +
    `8️⃣ Talk to Team\n\n` +
    `या *menu* टाइप करें।`,
};

/**
 * Parse incoming message text to a known intent
 */
export function parseIntent(text: string): string {
  const t = text.trim().toLowerCase();

  // Menu
  if (["menu", "hi", "hello", "hii", "hey", "namaste", "नमस्ते", "start", "help", "0"].includes(t)) return "menu";

  // Number shortcuts
  if (t === "1") return "registration";
  if (t === "2") return "sports";
  if (t === "3") return "fees";
  if (t === "4") return "pickup";
  if (t === "5") return "camp_dates";
  if (t === "6") return "status";
  if (t === "7") return "seats";
  if (t === "8") return "talk_to_team";

  // Keyword matching
  if (/regist|admission|join|enroll|signup|register|form/.test(t)) return "registration";
  if (/sport|swim|cricket|football|basket|badmin|defense|time|slot|schedule|timing/.test(t)) return "sports";
  if (/fee|fees|pay|cost|price|payment|amount|rupee|upi|money|kitna/.test(t)) return "fees";
  if (/pickup|drop|bus|transport|point|location|address|kahan|kha se/.test(t)) return "pickup";
  if (/date|dates|when|camp|start|duration|kab|kitne din/.test(t)) return "camp_dates";
  if (/status|check|confirm|verify|mera|my status/.test(t)) return "status";
  if (/seat|seats|available|availab|kitni|space|capacity|bachi|remaining|left/.test(t)) return "seats";
  if (/talk|team|call|contact|help|human|person|agent|baat/.test(t)) return "talk_to_team";

  return "unknown";
}
