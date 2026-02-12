import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with Forced Stable v1 API.
 * Uses gemini-1.5-pro-002 for maximum stability and reasoning quality.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
      apiVersion: 'v1', // 🔥 THIS FIXES 404 ERRORS
    }),
  ],
  // Using the stable model identifier as recommended
  model: 'googleai/gemini-1.5-pro-002',
  config: {
    temperature: 0.7,
  },
});
