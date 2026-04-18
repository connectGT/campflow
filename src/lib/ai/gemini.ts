import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface PaymentExtraction {
  utr: string | null;
  amount: number | null;
  payeeVpa: string | null;
  timestamp: string | null;
  confidence: number;
}

export async function parsePaymentScreenshot(imageBuffer: Buffer, mimeType: string): Promise<PaymentExtraction> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert payment auditor. Analyze this UPI transaction screenshot and extract the following details in strict JSON format:
      1. utr: The 12-digit UTR (Unique Transaction Reference) or Transaction ID.
      2. amount: The numerical amount paid (e.g., 12000).
      3. payeeVpa: The UPI ID (VPA) of the person who RECEIVED the money.
      4. timestamp: Date and time of transaction if visible.
      
      Rules:
      - If a field is not found, return null.
      - Ensure the amount is a number.
      - The output MUST be a JSON object and nothing else.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    
    const parsed = JSON.parse(text);
    
    // Simple heuristic for confidence
    let confidence = 0;
    if (parsed.utr) confidence += 0.5;
    if (parsed.amount === 12000) confidence += 0.5;

    return {
      ...parsed,
      confidence,
    };
  } catch (error) {
    console.error("[Gemini AI] Error parsing screenshot:", error);
    throw new Error("AI failed to read the screenshot. Please try again or enter UTR manually.");
  }
}
