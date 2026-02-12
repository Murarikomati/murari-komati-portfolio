import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-pro', // Use PRO model for structured stability
  config: {
    temperature: 0.7, // More dynamic responses
  },
});
