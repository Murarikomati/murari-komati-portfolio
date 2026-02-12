import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with support for multiple API key environment variables.
 * Prioritizes GOOGLE_GENAI_API_KEY, then GOOGLE_API_KEY, then GEMINI_API_KEY.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-1.5-pro',
  config: {
    temperature: 0.5, // Reduced temperature for more consistent professional analysis
  },
});
