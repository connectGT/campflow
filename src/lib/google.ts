import { google } from "googleapis";

/**
 * Appends a new paid registration to the configured Google Sheet.
 * Expects GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 to be a Base64 string of the service-account.json
 */
export async function appendRegistrationToSheet(data: {
  childName: string;
  childAge: number;
  childSchool: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
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
        data.childName,                                                        // B: Child Name
        data.childAge,                                                         // C: Age
        data.childSchool || "N/A",                                            // D: School/Grade
        data.parentName,                                                       // E: Parent Name
        data.parentEmail,                                                      // F: Parent Email
        data.parentPhone ? `'${data.parentPhone}` : "N/A",                   // G: Parent Phone (force text)
        data.emergencyName || "N/A",                                          // H: Emergency Contact Name
        data.emergencyPhone ? `'${data.emergencyPhone}` : "N/A",            // I: Emergency Phone (force text)
        data.transportPoint || "Self Drop",                                   // J: Transport
        data.sports.join(" | "),                                              // K: Sports (slot-wise)
        `₹${(data.amount || 12000).toLocaleString("en-IN")}`,               // L: Amount
        utrFormatted,                                                          // M: UTR (text forced)
        data.screenshotUrl || "N/A",                                          // N: Screenshot URL
        data.status || "Approved",                                            // O: Status
        data.orderId,                                                          // P: Order ID
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:P",
      valueInputOption: "USER_ENTERED",  // USER_ENTERED respects the ' prefix for text forcing
      requestBody: { values },
    });

    console.log("[GoogleSheets] Successfully synced registration for:", data.childName);
  } catch (error) {
    console.error("[GoogleSheets] Sync Error:", error);
  }
}
