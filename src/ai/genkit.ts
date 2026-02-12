import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with Gemini 1.5 Flash.
 * Optimized for speed and stability by forcing the stable v1 API.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
      apiVersion: 'v1', // Force stable API to resolve 404 errors
    }),
  ],
  // Using the safest stable version for the free tier
  model: 'googleai/gemini-1.5-flash-002',
});
