import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error("Missing GOOGLE_GENAI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

/**
 * Generates structured JSON output using the direct Google AI SDK.
 * Uses gemini-2.5-flash for stable production usage in the free tier.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
    },
  });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) throw new Error("AI returned an empty response.");
    
    // Clean potential markdown code blocks if AI returns them
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanText) as T;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("The AI engine failed to produce a valid report. Please try again.");
  }
}
