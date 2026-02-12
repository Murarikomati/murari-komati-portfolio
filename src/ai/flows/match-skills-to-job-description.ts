'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow
 * 
 * - matchSkillsToJobDescription: Analyzes candidate fit against a JD.
 * - Ingests full profile data including certifications, projects, and social evidence.
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
  model: 'googleai/gemini-1.5-pro',
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
    
    1. Impact Summary: A punchy pitch on why he is a strong technical fit.
    2. Projects: Map 1-2 specific projects from his portfolio to the JD.
    3. Certifications: Highlight his Databricks certifications.
    4. Evidence Linking: 
       - If the JD mentions DSA, Algorithms, LeetCode, or competitive programming, include the LeetCode link.
       - If it mentions open-source or specific tech stack contributions, include GitHub.
       - Always include LinkedIn for connection.
    5. Match Score: A percentage between 0-100 based on skill overlap.
  `,

  prompt: `
    CANDIDATE: Murari Komati
    EDUCATION: B.Tech in Electronics and Telecommunication, WIT Solapur (2019-2023)
    
    EXPERIENCE:
    - Data Engineer @ Data Master Consulting (Aug 2023 – Present): Expertise in Azure Databricks, Spark, ETL, Medallion Architecture. Built GenAI solutions with LangChain and CrewAI.
    - Intern @ Data Master Consulting (Jan 2023 – July 2023): Optimized cloud ETL patterns.
    
    CERTIFICATIONS:
    - Databricks Fundamentals
    - Databricks Generative AI Fundamentals
    - EDX Python Basics for Data Science
    
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
