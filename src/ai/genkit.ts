import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with Gemini 1.5 Pro.
 * Optimized for stability and complex reasoning tasks.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
    }),
  ],
  // Using the recommended stable model identifier
  model: 'googleai/gemini-1.5-pro',
});
