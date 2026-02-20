'''
import Groq from "groq-sdk";

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  console.warn("Missing GROQ_API_KEY. AI features will fail until this is set.");
}

const groq = new Groq({
  apiKey: groqApiKey,
});

/**
 * Generates structured JSON output using Groq's Llama 3 model.
 * Optimized for speed and JSON reliability.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  if (!groqApiKey) {
    console.error("Groq Generation Error: GROQ_API_KEY is not set in the environment.");
    throw new Error("AI service is not configured on the server. Missing API key.");
  }
  
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
      model: "llama-3.1-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
      timeout: 25000, // 25-second timeout to prevent serverless function from crashing
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      console.error("Groq Generation Error: AI returned an empty response.");
      throw new Error("AI returned an empty response.");
    }
    
    try {
      return JSON.parse(content) as T;
    } catch (parseError) {
      console.error("Groq JSON Parsing Error:", parseError, "--- Original Content:", content);
      throw new Error("AI returned an invalid JSON format.");
    }
  } catch (error) {
    if (error instanceof Groq.APIError) {
      console.error(`Groq API Error (${error.status}):`, error.error);
    } else {
      console.error("Groq Generation Error:", error);
    }
    throw new Error("The AI engine failed to produce a valid report. Please try again.");
  }
}
'''