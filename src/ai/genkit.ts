import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization using v1beta.
 * v1beta is required for structured output (Zod schemas) as it supports 'responseMimeType'.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
      // Removed apiVersion: 'v1' because structured JSON output requires v1beta features
    }),
  ],
  model: 'googleai/gemini-1.5-flash',
  config: {
    temperature: 0.7,
  },
});
