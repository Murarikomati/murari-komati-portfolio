import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error("Missing GOOGLE_GENAI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

/* =====================================
   TEXT GENERATION (For summaries)
===================================== */

export async function generateText(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.5,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}

/* =====================================
   JSON GENERATION (If ever needed)
===================================== */

export async function generateJSON(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.3,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("No JSON found in Gemini response.");
  }

  return JSON.parse(jsonMatch[0]);
}
