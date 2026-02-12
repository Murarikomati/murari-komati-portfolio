'use server';
/**
 * @fileOverview An AI-powered skill matcher for recruiters.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MatchSkillsToJobDescriptionInputSchema = z.object({
  jobDescription: z.string().describe('The job description to match against.'),
});
export type MatchSkillsToJobDescriptionInput = z.infer<typeof MatchSkillsToJobDescriptionInputSchema>;

const MatchSkillsToJobDescriptionOutputSchema = z.object({
  matchedSkills: z.array(z.string()).describe('Top matching technical skills from the portfolio.'),
  matchedProjects: z.array(z.string()).describe('Specific project titles from the portfolio that are relevant.'),
  summary: z.string().describe('A professional summary of why the candidate is a fit for this role.'),
});
export type MatchSkillsToJobDescriptionOutput = z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;

export async function matchSkillsToJobDescription(input: MatchSkillsToJobDescriptionInput): Promise<MatchSkillsToJobDescriptionOutput> {
  return matchSkillsToJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchSkillsToJobDescriptionPrompt',
  input: { schema: MatchSkillsToJobDescriptionInputSchema },
  output: { schema: MatchSkillsToJobDescriptionOutputSchema },
  system: "You are a senior recruiter specializing in Data Engineering and AI. Your task is to analyze a job description and map it to Murari Komati's profile.",
  prompt: `
    Candidate Profile (Murari Komati):
    - Experience: Data Engineer at Data Master Consulting.
    - Cloud: Azure (ADF, Databricks), GCP (BigQuery).
    - AI: GenAI Chatbots, LangChain, CrewAI, RAG, LangGraph, Agentic AI.
    - Tools: Spark, Kafka, SQL, Python, Power BI, MLflow, Unity Catalog.
    - Projects: SQL Chatbot, CrewAI Job Assistant, Traffic Management (OpenCV).

    Job Description:
    {{{jobDescription}}}

    Tasks:
    1. Identify matching skills.
    2. Suggest which of Murari's projects are most relevant.
    3. Write a 2-sentence summary pitch.
  `,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ]
  }
});

const matchSkillsToJobDescriptionFlow = ai.defineFlow(
  {
    name: 'matchSkillsToJobDescriptionFlow',
    inputSchema: MatchSkillsToJobDescriptionInputSchema,
    outputSchema: MatchSkillsToJobDescriptionOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) {
        // Fallback in case of parsing issues
        return {
          matchedSkills: ["Python", "SQL", "Azure", "Databricks"],
          matchedProjects: ["SQL ChatBot", "CrewAI Assistant"],
          summary: "Based on the requirements, Murari's expertise in cloud data pipelines and GenAI automation makes him a strong contender."
        };
      }
      return output;
    } catch (error) {
      console.error("Flow failed:", error);
      throw new Error("AI Analysis failed. Please try again with a different description.");
    }
  }
);
