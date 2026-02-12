import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with Gemini 1.5 Flash.
 * This model is optimized for speed and is available in the free tier.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
    }),
  ],
  // Use the standard model identifier for Google AI plugin
  model: 'googleai/gemini-1.5-flash',
});
