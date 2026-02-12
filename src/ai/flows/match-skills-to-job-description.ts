'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow
 * 
 * - matchSkillsToJobDescription: Main function to analyze candidate-to-JD fit.
 * - Handles mapping of certifications, experience, and social links (GitHub/LeetCode).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/* ==============================
   INPUT SCHEMA
============================== */

const InputSchema = z.object({
  jobDescription: z.string().min(50),
});

export type MatchSkillsToJobDescriptionInput = z.infer<typeof InputSchema>;

/* ==============================
   OUTPUT SCHEMA
============================== */

const OutputSchema = z.object({
  matchScore: z.number().min(0).max(100),
  extractedKeywords: z.array(z.string()),
  matchedSkills: z.array(z.string()),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    })
  ),
  relevantCertifications: z.array(z.string()),
  gapAnalysis: z.array(z.string()),
  impactSummary: z.string(),
  recruiterTalkingPoints: z.array(z.string()),
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
   PROMPT DEFINITION
============================== */

const prompt = ai.definePrompt({
  name: 'deepJdMatcherPrompt',
  input: { schema: InputSchema },
  output: { format: 'json' },
  
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
    You are an elite Technical Recruiter and Headhunter specializing in Data Engineering and AI.
    Analyze the Job Description against Murari Komati's profile.
    Return ONLY valid JSON.
  `,

  prompt: `
    CANDIDATE: Murari Komati
    EDUCATION: B.Tech in Electronics and Telecommunication, WIT Solapur (Ahilyabai Holkar University)
    
    EXPERIENCE HIGHLIGHTS:
    - Data Master Consulting: 2.5+ years building ETL (ADF, Databricks) and GenAI (LangChain, CrewAI).
    - Reduced manual tasks by 90% via automated pipelines.
    - Handled 100GB+ daily transactional data using Kafka & Spark.
    - Expert in Medallion Architecture (Bronze/Silver/Gold).
    
    CORE TECH STACK:
    - Cloud: Azure (ADF, Synapse, Databricks), AWS, GCP.
    - AI: LangGraph, CrewAI, RAG Systems, OpenAI, Gemini.
    - Data: PySpark, Delta Lake, SQL, Kafka, MLflow.
    
    CERTIFICATIONS:
    - Databricks Fundamentals
    - Databricks Generative AI Fundamentals
    - EDX Python for Data Science
    
    EVIDENCE LINKS:
    - GitHub: https://github.com/Murarikomati
    - LinkedIn: https://linkedin.com/in/komati-murari
    - LeetCode: https://leetcode.com/u/komatimurari50/

    JOB DESCRIPTION:
    {{{jobDescription}}}

    ANALYSIS REQUIREMENTS:
    1. Calculate a matchScore (0-100).
    2. Extract keywords from JD.
    3. Match Murari's skills to JD requirements.
    4. Pick 1-2 projects that prove his capability for this specific JD.
    5. List certifications that validate his skills for this role.
    6. If the JD mentions "Coding", "Algorithms", or "Optimization", include the LeetCode link.
    7. Provide a concise impactSummary for the recruiter.

    Return JSON matching this structure:
    {
      "matchScore": number,
      "extractedKeywords": [string],
      "matchedSkills": [string],
      "matchedProjects": [{ "title": string, "reason": string }],
      "relevantCertifications": [string],
      "gapAnalysis": [string],
      "impactSummary": string,
      "recruiterTalkingPoints": [string],
      "recommendedLinks": [{ "name": string, "url": string, "context": string }]
    }
  `,
});

/* ==============================
   FLOW WRAPPER
============================== */

export async function matchSkillsToJobDescription(
  input: MatchSkillsToJobDescriptionInput
): Promise<MatchSkillsToJobDescriptionOutput> {
  const validatedInput = InputSchema.parse(input);

  try {
    const response = await prompt(validatedInput);

    if (!response.output) {
      throw new Error("AI returned empty response");
    }

    // Genkit 1.x response.output is already parsed if format is 'json'
    const parsed = OutputSchema.parse(response.output);
    return parsed;
  } catch (err: any) {
    console.error("AI MATCH FLOW ERROR:", err);
    throw new Error(err.message || "Intelligence engine failed to process the request.");
  }
}
