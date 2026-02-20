import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

export const ai = configureGenkit({
  plugins: [
    googleAI({ apiVersion: 'v1beta' }),
  ],
  logSinks: ['json'], 
  enableTracingAndMetrics: true, 
});

/**
 * Ensures that Genkit resources are properly shut down after an operation.
 * This is CRITICAL in a serverless environment like Vercel.
 */
export async function shutdown() {
  await ai.shutdown();
}
