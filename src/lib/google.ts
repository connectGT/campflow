import { google } from "googleapis";

/**
 * Appends a new paid registration to the configured Google Sheet.
 * Expects GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 to be a Base64 string of the service-account.json
 */
export async function appendRegistrationToSheet(data: {
  childName: string;
  childAge: number;
  childGender?: string;
  childDob?: string;
  fatherName?: string;
  motherName?: string;
  childSchool: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  whatsappNumber?: string;
  fullAddress?: string;
  emergencyName: string;
  emergencyPhone: string;
  transportPoint: string;
  sports: string[];
  amount: number;
  orderId: string;
  utrNumber?: string;
  screenshotUrl?: string;
  status?: string;
}) {
  try {
    let spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (spreadsheetId && spreadsheetId.includes("/d/")) {
      spreadsheetId = spreadsheetId.split("/d/")[1].split("/")[0];
    }
    const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;

    if (!spreadsheetId || !base64Key) {
      console.warn("[GoogleSheets] WARN: Missing credentials, skipping real-time sync.");
      return;
    }

    const jsonKey = JSON.parse(Buffer.from(base64Key, "base64").toString("utf-8"));

    const auth = new google.auth.GoogleAuth({
      credentials: jsonKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Prefix UTR with ' to force text format in sheets (prevents scientific notation)
    const utrFormatted = data.utrNumber ? `'${data.utrNumber}` : "N/A";

    const values = [
      [
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),   // A: Date & Time (IST)
        data.childName,                                                        // B: Swimmer Name
        data.childGender?.toUpperCase() || "N/A",                            // C: Gender
        data.childDob || "N/A",                                              // D: Date of Birth
        data.childAge || "N/A",                                              // E: Age (calculated)
        data.childSchool || "N/A",                                           // F: School
        data.fatherName || "N/A",                                            // G: Father's Name
        data.motherName || data.parentName || "N/A",                        // H: Mother's Name
        data.parentName,                                                      // I: Parent/Guardian Name
        data.parentEmail,                                                     // J: Email
        data.parentPhone ? `'${data.parentPhone}` : "N/A",                  // K: Mobile (force text)
        data.whatsappNumber ? `'${data.whatsappNumber}` : `'${data.parentPhone || "N/A"}`, // L: WhatsApp
        data.fullAddress || "N/A",                                           // M: Address
        data.emergencyName || "N/A",                                         // N: Emergency Contact
        data.emergencyPhone ? `'${data.emergencyPhone}` : "N/A",           // O: Emergency Phone
        data.transportPoint || "Self Drop",                                  // P: Transport
        data.sports.join(" | "),                                             // Q: Sports (slot-wise)
        `₹${(data.amount || 12000).toLocaleString("en-IN")}`,              // R: Amount
        utrFormatted,                                                         // S: UTR (text forced)
        data.screenshotUrl || "N/A",                                         // T: Screenshot URL
        data.status || "Approved",                                           // U: Status
        data.orderId,                                                         // V: Order ID
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:V",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    console.log("[GoogleSheets] Successfully synced registration for:", data.childName);
  } catch (error) {
    console.error("[GoogleSheets] Sync Error:", error);
  }
}
