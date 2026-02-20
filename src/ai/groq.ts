'use server';

import Groq from 'groq-sdk';

/**
 * Generates structured JSON output using the Groq API.
 * Uses the specified Llama 3.3 70B model.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  // Use a project-specific environment variable name to avoid potential conflicts.
  const apiKey = process.env.PORTFOLIO_GROQ_API_KEY;

  // VERCEL DEBUGGING: Log the new key to see if it's available.
  console.log("--- VERCEL RUNTIME LOG (Final Attempt) ---");
  console.log("Checking for PORTFOLIO_GROQ_API_KEY...");
  console.log("Is key present?", apiKey ? "Yes, it exists." : "No, it is UNDEFINED.");
  console.log("--- END VERCEL RUNTIME LOG ---");

  // Provide a clear error message if the API key is missing at runtime.
  if (!apiKey) {
    throw new Error(
      'CRITICAL: PORTFOLIO_GROQ_API_KEY is not configured. Please check Vercel settings and ensure the project has been redeployed with the new variable name.'
    );
  }

  // Initialize the Groq client *inside* the function to ensure runtime access to env vars.
  const groq = new Groq({ apiKey });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates clean, valid JSON. Do not include any markdown formatting or extra text outside of the JSON structure.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.1,
    });

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned an empty response.");
    }

    return JSON.parse(content) as T;
  } catch (error) {
    console.error("Groq AI Generation Error:", error);
    throw error;
  }
}
