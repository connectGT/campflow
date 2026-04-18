import { google } from "googleapis";

/**
 * Appends a new paid registration to the configured Google Sheet.
 * Expects GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 to be a Base64 string of the service-account.json
 */
export async function appendRegistrationToSheet(data: {
  childName: string;
  childAge: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  sports: string[];
  amount: number;
  orderId: string;
}) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;

    if (!spreadsheetId || !base64Key) {
      console.warn("[GoogleSheets] Missing credentials, skipping sync.");
      return;
    }

    // Decode service account key
    const jsonKey = JSON.parse(Buffer.from(base64Key, "base64").toString("utf-8"));

    const auth = new google.auth.GoogleAuth({
      credentials: jsonKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const values = [
      [
        new Date().toISOString(),
        data.childName,
        data.childAge,
        data.parentName,
        data.parentEmail,
        data.parentPhone,
        data.sports.join(", "),
        data.amount,
        data.orderId,
        "Paid",
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:J",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    console.log("[GoogleSheets] Successfully synced registration for:", data.childName);
  } catch (error) {
    console.error("[GoogleSheets] Sync Error:", error);
    // We don't throw here to prevent bringing down the payment verification flow
  }
}
