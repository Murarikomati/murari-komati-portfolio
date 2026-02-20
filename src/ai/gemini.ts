'use server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Keep the top-level client initialization but defer the API key check.
let genAI: GoogleGenerativeAI | null = null;
if (process.env.GOOGLE_GENAI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
}

/**
 * Generates structured JSON output using the direct Google AI SDK.
 * Uses gemini-1.5-flash for stable production usage in the free tier.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  // Add a specific check inside the function to provide a clear error message.
  if (!genAI) {
    throw new Error(
      'CRITICAL: GOOGLE_GENAI_API_KEY is not configured in the production environment. Please add it to your Vercel project settings.'
    );
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
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
    // Re-throw the original error to get more details if it's not the API key issue.
    throw error;
  }
}
