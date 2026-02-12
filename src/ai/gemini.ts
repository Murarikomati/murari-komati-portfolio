import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error("Missing GOOGLE_GENAI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

/* =====================================
   TEXT GENERATION
===================================== */
export async function generateText(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}

/* =====================================
   JSON GENERATION (Structured Output)
===================================== */
export async function generateJSON<T>(prompt: string, schema: any): Promise<T> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.4,
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text) as T;
}
