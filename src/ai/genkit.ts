import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization.
 * 
 * Uses the provided Gemini API key for high-performance AI analysis.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
    }),
  ],
  // Set the default model globally to ensure consistent routing
  model: 'googleai/gemini-1.5-flash',
});
