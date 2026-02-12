
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error("Missing GOOGLE_GENAI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

/**
 * Generates structured JSON output using Gemini 1.5 Flash.
 * Explicitly targets the most stable model identifier.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.1, // Lower temperature for more accurate extraction
      responseMimeType: "application/json",
    },
  });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("AI Generation/Parsing Error:", error);
    throw new Error("AI engine failed to produce valid result. Please try again.");
  }
}
