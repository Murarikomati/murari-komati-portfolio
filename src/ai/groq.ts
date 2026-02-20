'use server';

import Groq from 'groq-sdk';

// Initialize the Groq client, checking for the API key.
const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

/**
 * Generates structured JSON output using the Groq API.
 * Uses the specified Llama 3.3 70B model.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  // VERCEL DEBUGGING: Log all environment variable keys to see what is available.
  console.log("--- VERCEL RUNTIME LOG ---");
  console.log("Checking for GROQ_API_KEY...");
  console.log("Is key present?", process.env.GROQ_API_KEY ? "Yes" : "No");
  console.log("Available ENV Keys:", Object.keys(process.env));
  console.log("--- END VERCEL RUNTIME LOG ---");

  // Provide a clear error message if the API key is missing.
  if (!groq) {
    throw new Error(
      'CRITICAL: GROQ_API_KEY is not configured in the production environment. Please add it to your Vercel project settings.'
    );
  }

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
