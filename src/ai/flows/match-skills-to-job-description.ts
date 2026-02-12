'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow
 * 
 * - matchSkillsToJobDescription: Analyzes candidate fit against a JD.
 * - Ingests full profile data including certifications and evidence links.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InputSchema = z.object({
  jobDescription: z.string().min(50),
});

export type MatchSkillsToJobDescriptionInput = z.infer<typeof InputSchema>;

const OutputSchema = z.object({
  matchScore: z.number(),
  extractedKeywords: z.array(z.string()),
  matchedSkills: z.array(z.string()),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    })
  ),
  relevantCertifications: z.array(z.string()),
  impactSummary: z.string(),
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string(),
    })
  ),
});

export type MatchSkillsToJobDescriptionOutput = z.infer<typeof OutputSchema>;

const prompt = ai.definePrompt({
  name: 'deepJdMatcherPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ],
  },

  system: `
    You are an elite Technical Recruiter. Analyze the JD against Murari Komati's profile.
    
    1. Impact Summary: A short pitch on why he fits.
    2. Map 1-2 specific projects.
    3. Include Databricks certifications.
    4. If the JD mentions DSA, algorithms, or code, provide the LeetCode link.
    5. Always return a valid JSON object matching the requested schema.
  `,

  prompt: `
    CANDIDATE: Murari Komati
    EDUCATION: B.Tech in Electronics and Telecommunication, WIT Solapur
    
    EXPERIENCE:
    - Data Engineer @ Data Master Consulting: 2.5+ years. 
    - Expert in Azure Databricks, Spark, ETL, Medallion Arch.
    - Built GenAI solutions with LangChain, CrewAI, and RAG.
    
    CERTIFICATIONS:
    - Databricks Fundamentals
    - Databricks Generative AI Fundamentals
    - EDX Python for Data Science
    
    LINKS:
    - GitHub: https://github.com/Murarikomati
    - LinkedIn: https://linkedin.com/in/komati-murari
    - LeetCode: https://leetcode.com/u/komatimurari50/

    JOB DESCRIPTION:
    {{{jobDescription}}}
  `,
});

export async function matchSkillsToJobDescription(
  input: MatchSkillsToJobDescriptionInput
): Promise<MatchSkillsToJobDescriptionOutput> {
  const { output } = await prompt(input);
  if (!output) throw new Error("AI analysis failed to generate. Please check your network or try a different JD.");
  return output;
}
