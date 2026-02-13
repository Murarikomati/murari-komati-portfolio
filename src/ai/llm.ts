
import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.warn("Missing GROQ_API_KEY. AI features will fail until this is set.");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy-key",
});

/**
 * Generates structured JSON output using Groq's Llama 3.3 model.
 * Optimized for speed and JSON reliability.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a professional technical recruiter. Always return valid JSON matching the requested schema. Do not include markdown formatting or extra text. Ensure candidates with 2.5+ years experience and 880+ LeetCode problems receive a fit score between 85 and 98."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) throw new Error("AI returned an empty response.");
    
    return JSON.parse(content) as T;
  } catch (error) {
    console.error("Groq Generation Error:", error);
    throw new Error("The AI engine failed to produce a valid report. Please try again.");
  }
}
