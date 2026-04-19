import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cookies } from "next/headers";
import { createHmac } from "crypto";

export const dynamic = "force-dynamic";

function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const user = process.env.ADMIN_USERNAME || "";
  const pass = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_JWT_SECRET || "change-this-in-production";
  const expected = createHmac("sha256", secret).update(user + ":" + pass).digest("hex");
  return token === expected;
}

const VALID_SPORTS = ["swimming", "football", "cricket", "basketball", "badminton", "self_defence"];

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;
    if (!isValidAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const text = formData.get("text") as string | null;

    if (!image && !text) {
      return NextResponse.json({ error: "Provide an image or text" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are parsing a sports camp registration form. Extract the following fields and return ONLY valid JSON — no markdown, no explanation.

Return this exact JSON structure:
{
  "childName": "full name of child",
  "childAge": 12,
  "childGrade": "class/grade/school",
  "parentName": "parent/guardian name",
  "parentPhone": "10-digit phone number, digits only",
  "parentEmail": "email or empty string",
  "emergencyName": "emergency contact name",
  "emergencyPhone": "10-digit emergency phone, digits only",
  "transportPoint": "one of: Maharaj Bada, Chetakpuri, Padav, Collectorate, Self Drop",
  "slot1Sport": "one of: swimming, football, cricket, basketball, badminton, self_defence",
  "slot2Sport": "one of: swimming, football, cricket, basketball, badminton, self_defence",
  "slot3Sport": "one of: swimming, football, cricket, basketball, badminton, self_defence"
}

Rules:
- Sport fields must be exactly one of the valid options (lowercase with underscore). Map "self defence" → "self_defence", "Badminton" → "badminton", etc.
- Transport must be exactly one of the given options. If unclear, use "Self Drop".
- Phone numbers: digits only, no spaces, no +91 prefix.
- If a field is unclear or missing, use empty string "" or 0 for age.
- Slots: slot1 = 7-8 AM, slot2 = 8-9 AM, slot3 = 9-10 AM

${text ? `Text from form:\n${text}` : "Extract from the provided image of the registration form."}`;

    let result;
    if (image) {
      const bytes = await image.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      result = await model.generateContent([
        prompt,
        { inlineData: { mimeType: image.type || "image/jpeg", data: base64 } },
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    const rawText = result.response.text().trim();
    
    // Strip markdown code fences if present
    const jsonStr = rawText.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
    const parsed = JSON.parse(jsonStr);

    // Sanitize sports fields to valid values
    for (const key of ["slot1Sport", "slot2Sport", "slot3Sport"]) {
      if (!VALID_SPORTS.includes(parsed[key])) {
        parsed[key] = "swimming"; // default fallback
      }
    }

    // Sanitize transport
    const validTransport = ["Maharaj Bada", "Chetakpuri", "Padav", "Collectorate", "Self Drop"];
    if (!validTransport.includes(parsed.transportPoint)) {
      parsed.transportPoint = "Self Drop";
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("[Gemini Parse] Error:", error);
    return NextResponse.json({ error: "Failed to parse form: " + (error.message || "Unknown error") }, { status: 500 });
  }
}
