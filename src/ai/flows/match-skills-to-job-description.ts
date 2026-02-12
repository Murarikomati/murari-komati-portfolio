'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow
 * 
 * - matchSkillsToJobDescription: Analyzes candidate fit against a JD.
 * - Ingests full profile data including certifications and evidence links.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/* ==============================
   SCHEMAS
============================== */

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

/* ==============================
   PROMPT
============================== */

const prompt = ai.definePrompt({
  name: 'deepJdMatcherPrompt',
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
    You are an elite Technical Recruiter specializing in AI and Data Engineering.
    Analyze the provided Job Description against Murari Komati's profile.
    
    CRITICAL INSTRUCTIONS:
    1. Provide a professional 'Impact Summary' (pitch).
    2. Map 1-2 specific projects that prove he can do the job.
    3. Include his Databricks certifications if they relate to Cloud/AI.
    4. If the JD mentions algorithms, programming, or specific tech, provide the relevant Evidence Link.
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

/* ==============================
   FLOW
============================== */

export async function matchSkillsToJobDescription(
  input: MatchSkillsToJobDescriptionInput
): Promise<MatchSkillsToJobDescriptionOutput> {
  try {
    const { output } = await prompt(input);

    if (!output) {
      throw new Error("No analysis generated. Ensure the JD is relevant to engineering.");
    }

    return output;
  } catch (err: any) {
    console.error("AI MATCH ERROR:", err);
    
    // Explicitly check for API key errors to help the user
    if (err.message?.includes('API key not found') || err.message?.includes('API_KEY')) {
      throw new Error("AI Configuration Error: Please ensure you have added your GEMINI_API_KEY to the project environment variables.");
    }
    
    throw new Error(err.message || "The intelligence engine encountered a server-side error.");
  }
}
