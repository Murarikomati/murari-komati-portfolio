import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization.
 * 
 * IMPORTANT: Ensure one of the following environment variables is set in your 
 * Firebase Project settings or .env file:
 * - GOOGLE_GENAI_API_KEY
 * - GOOGLE_API_KEY
 * - GEMINI_API_KEY
 */
const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("WARNING: No AI API Key found. The 'Deep Scan Matcher' will fail until a key is provided in environment variables.");
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-1.5-pro',
  config: {
    temperature: 0.4, // Balanced for precision in recruitment matching
  },
});
