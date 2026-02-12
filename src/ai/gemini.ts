
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error("Missing GOOGLE_GENAI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

/**
 * Generates structured JSON output using the direct Google AI SDK.
 * Optimized for production reliability and stable JSON parsing.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  // Using gemini-2.0-flash (the latest stable model in the 2.x family)
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Safety check for empty or invalid JSON
    if (!text) throw new Error("AI returned an empty response.");
    
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("The AI engine failed to produce a valid report. Please try again.");
  }
}
