'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow
 * 
 * - matchSkillsToJobDescription: Analyzes candidate fit against a JD using forced stable v1 API.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InputSchema = z.object({
  jobDescription: z.string().min(50),
});

export type MatchSkillsToJobDescriptionInput = z.infer<typeof InputSchema>;

const OutputSchema = z.object({
  matchScore: z.number().describe('A score from 0 to 100'),
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

  prompt: `
    SYSTEM INSTRUCTIONS:
    You are an elite Technical Recruiter. Analyze the provided JD against Murari Komati's profile.
    
    CRITICAL OBJECTIVES:
    1. Impact Summary: A punchy pitch on why he is a strong technical fit.
    2. Projects: Map 1-2 specific projects from his portfolio to the JD.
    3. Certifications: Highlight his Databricks and Python certifications.
    4. Evidence Linking: 
       - If the JD mentions DSA, Algorithms, or LeetCode, include the LeetCode link.
       - If it mentions open-source or tech stack contributions, include GitHub.
       - Always include LinkedIn for connection.

    CANDIDATE PROFILE:
    Name: Murari Komati
    Education: B.Tech in Electronics and Telecommunication, WIT Solapur (2019-2023)
    
    EXPERIENCE:
    - Data Engineer @ Data Master Consulting (Aug 2023 – Present): Azure Databricks, Spark, ETL, Medallion Architecture. Ingested data from SAP HANA, processed 100GB+ daily.
    - Intern @ Data Master Consulting (Jan 2023 – July 2023): Optimized cloud ETL and automated data quality checks.
    
    CERTIFICATIONS & LICENSES:
    - Databricks Fundamentals (2025)
    - Databricks Generative AI Fundamentals (2025)
    - EDX Python Basics for Data Science (2022)
    
    LINKS:
    - GitHub: https://github.com/Murarikomati
    - LinkedIn: https://linkedin.com/in/komati-murari
    - LeetCode: https://leetcode.com/u/komatimurari50/

    JOB DESCRIPTION:
    {{{jobDescription}}}

    Produce a high-fidelity recruiter cheat sheet in structured JSON format.
  `,
});

export async function matchSkillsToJobDescription(
  input: MatchSkillsToJobDescriptionInput
): Promise<MatchSkillsToJobDescriptionOutput> {
  const { output } = await prompt(input);
  if (!output) throw new Error("AI analysis failed to generate. Please check your network or try a different JD.");
  return output;
}
