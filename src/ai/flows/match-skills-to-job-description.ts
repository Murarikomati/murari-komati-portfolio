'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow
 * 
 * - matchSkillsToJobDescription: Main function to analyze candidate-to-JD fit.
 * - Handles mapping of certifications, experience, and social links.
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
  matchScore: z.number().describe('A score from 0-100 indicating fit.'),
  extractedKeywords: z.array(z.string()).describe('Keywords found in the JD.'),
  matchedSkills: z.array(z.string()).describe('Candidate skills that match the JD.'),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string().describe('Why this project proves fit for this role.'),
    })
  ).describe('1-2 specific projects from the candidate profile.'),
  relevantCertifications: z.array(z.string()).describe('Certifications that validate candidate capability.'),
  gapAnalysis: z.array(z.string()).describe('Skills or requirements missing or needed.'),
  impactSummary: z.string().describe('A 2-sentence value proposition for a recruiter.'),
  recruiterTalkingPoints: z.array(z.string()).describe('Key points to bring up in an interview.'),
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string().describe('Why this link is relevant to this specific JD.'),
    })
  ).describe('Links to GitHub, LeetCode, or LinkedIn based on the JD needs.'),
});

export type MatchSkillsToJobDescriptionOutput = z.infer<typeof OutputSchema>;

/* ==============================
   PROMPT DEFINITION
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
    You are an elite Technical Recruiter and Headhunter specializing in Data Engineering and AI.
    Your task is to analyze a Job Description (JD) against the profile of Murari Komati.
    Provide a high-fidelity, professional analysis that maps his specific impact metrics, 
    certifications, and project evidence to the role.
    
    If the JD mentions algorithms, data structures, or optimization, prioritize his LeetCode link.
    If it mentions open-source or specific tech like Spark/Databricks, prioritize GitHub.
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

    JOB DESCRIPTION TO ANALYZE:
    {{{jobDescription}}}
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
      throw new Error("The intelligence engine could not generate a response. This might be due to an invalid Job Description.");
    }

    return response.output;
  } catch (err: any) {
    console.error("AI MATCH FLOW ERROR:", err);
    if (err.message?.includes('API_KEY')) {
      throw new Error("AI Configuration Error: Please ensure the GEMINI_API_KEY is correctly set in the environment.");
    }
    throw new Error(err.message || "The intelligence engine failed to process the request.");
  }
}
