import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with standard model routing.
 * Uses gemini-1.5-flash-latest for maximum reliability and speed.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
    }),
  ],
  // Using the latest flash model for optimal performance/reliability
  model: 'googleai/gemini-1.5-flash-latest',
  config: {
    temperature: 0.7,
  },
});
