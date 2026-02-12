import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization forced to v1 API for maximum stability.
 * Using googleai/gemini-1.5-flash as the primary stable model.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow',
      apiVersion: 'v1', // 🔥 FORCE v1 (CRITICAL)
    }),
  ],
  model: 'googleai/gemini-1.5-flash', // ✅ this works on v1
  config: {
    temperature: 0.7,
  },
});
