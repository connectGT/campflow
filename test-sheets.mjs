// Test script: verify Google Sheets sync is working
// Run with: node test-sheets.mjs

import { google } from "googleapis";
import * as fs from "fs";

// ── Read credentials from .env.local ──────────────────────────────
const envRaw = fs.readFileSync(".env.local", "utf-8");
const env = {};
for (const line of envRaw.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  if (!env[key]) env[key] = val; // first occurrence wins
}

const base64Key = env["GOOGLE_SERVICE_ACCOUNT_KEY_BASE64"];
let spreadsheetId = env["GOOGLE_SHEETS_SPREADSHEET_ID"];

console.log("─────────────────────────────────────────────");
console.log("🔍 Environment Check:");
console.log("  GOOGLE_SERVICE_ACCOUNT_KEY_BASE64:", base64Key ? `SET (${base64Key.length} chars)` : "❌ MISSING");
console.log("  GOOGLE_SHEETS_SPREADSHEET_ID:", spreadsheetId ? spreadsheetId.substring(0, 60) + "..." : "❌ MISSING");

if (!base64Key || !spreadsheetId) {
  console.error("\n❌ Missing credentials — aborting.");
  process.exit(1);
}

// Extract sheet ID from full URL if needed
if (spreadsheetId.includes("/d/")) {
  spreadsheetId = spreadsheetId.split("/d/")[1].split("/")[0];
}
console.log("  Extracted Sheet ID:", spreadsheetId);
console.log("─────────────────────────────────────────────\n");

// ── Decode service account key ─────────────────────────────────────
let jsonKey;
try {
  jsonKey = JSON.parse(Buffer.from(base64Key, "base64").toString("utf-8"));
  console.log("✅ Service account key decoded successfully");
  console.log("  Client email:", jsonKey.client_email);
  console.log("  Project ID:", jsonKey.project_id);
} catch (e) {
  console.error("❌ Failed to decode GOOGLE_SERVICE_ACCOUNT_KEY_BASE64:", e.message);
  process.exit(1);
}

// ── Auth ──────────────────────────────────────────────────────────
const auth = new google.auth.GoogleAuth({
  credentials: jsonKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// ── Test read first ───────────────────────────────────────────────
console.log("\n📖 Testing READ access to sheet...");
try {
  const readRes = await sheets.spreadsheets.get({ spreadsheetId });
  console.log("✅ Sheet accessible:", readRes.data.properties?.title);
} catch (e) {
  console.error("❌ Cannot read sheet:", e.message);
  console.error("   → Make sure the sheet is shared with:", jsonKey.client_email);
  process.exit(1);
}

// ── Dummy row write ───────────────────────────────────────────────
const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
const testUTR = `TEST${Date.now()}`;

const testRow = [
  now,                                // A: Date (IST)
  "TEST CHILD - Arjun Kumar",         // B: Child Name  
  13,                                 // C: Age
  "Class 8, DPS",                     // D: School/Grade
  "Suresh Kumar",                     // E: Parent Name
  "test@dheera.in",                   // F: Parent Email
  `'9876543210`,                      // G: Phone (text forced)
  "Ramesh Kumar",                     // H: Emergency Contact
  `'9876543211`,                      // I: Emergency Phone (text forced)
  "Maharaj Bada",                     // J: Transport
  "7-8AM: swimming | 8-9AM: football | 9-10AM: cricket", // K: Sports
  "₹12,000",                          // L: Amount
  `'${testUTR}`,                      // M: UTR (text forced, no sci notation)
  "N/A",                              // N: Screenshot
  "TEST - AUTO VERIFIED",             // O: Status
  "test-order-id-001",                // P: Order ID
];

console.log("\n✍️  Writing test row to Google Sheet...");
console.log("  UTR:", testUTR);

try {
  const writeRes = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:P",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [testRow] },
  });

  const updates = writeRes.data.updates;
  console.log("\n✅ SUCCESS! Row written to sheet.");
  console.log("  Updated range:", updates?.updatedRange);
  console.log("  Rows updated:", updates?.updatedRows);
  console.log("\n🎉 Google Sheets sync is WORKING correctly!");
  console.log("   → Check your sheet for a row with child name: 'TEST CHILD - Arjun Kumar'");
  console.log("   → UTR should show as text (not scientific notation):", testUTR);
} catch (e) {
  console.error("\n❌ WRITE FAILED:", e.message);
  if (e.code === 403) {
    console.error("   → The sheet is not shared with the service account.");
    console.error("   → Share the sheet with:", jsonKey.client_email);
    console.error("   → Give it 'Editor' access.");
  }
  process.exit(1);
}
