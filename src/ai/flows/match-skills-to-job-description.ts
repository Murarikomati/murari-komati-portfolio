'use server';
/**
 * @fileOverview An AI-powered skill matcher for recruiters. It takes a job description
 * and highlights relevant skills and projects from the Data Engineer's portfolio.
 *
 * - matchSkillsToJobDescription - A function that handles the skill matching process.
 * - MatchSkillsToJobDescriptionInput - The input type for the matchSkillsToJobDescription function.
 * - MatchSkillsToJobDescriptionOutput - The return type for the matchSkillsToJobDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MatchSkillsToJobDescriptionInputSchema = z.object({
  jobDescription: z.string().describe('The job description to match against the Data Engineer\u0027s portfolio.'),
});
export type MatchSkillsToJobDescriptionInput = z.infer<typeof MatchSkillsToJobDescriptionInputSchema>;

const MatchSkillsToJobDescriptionOutputSchema = z.object({
  matchedSkills: z.array(z.string()).describe('A list of skills from the Data Engineer\u0027s profile that are highly relevant to the job description.'),
  matchedProjects: z.array(z.string()).describe('A list of projects from the Data Engineer\u0027s portfolio that are highly relevant to the job description.'),
  summary: z.string().describe('A concise summary highlighting how the Data Engineer\u0027s profile aligns with the job description, focusing on key strengths and experiences.'),
});
export type MatchSkillsToJobDescriptionOutput = z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;

export async function matchSkillsToJobDescription(input: MatchSkillsToJobDescriptionInput): Promise<MatchSkillsToJobDescriptionOutput> {
  return matchSkillsToJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchSkillsToJobDescriptionPrompt',
  input: { schema: MatchSkillsToJobDescriptionInputSchema },
  output: { schema: MatchSkillsToJobDescriptionOutputSchema },
  prompt: `You are an expert HR assistant specializing in Data Engineering roles. Your task is to analyze a job description and identify the most relevant skills and projects from a candidate's portfolio. The candidate is a Data Engineer with the following profile:

**Data Engineer Profile:**
- **Cloud Platforms:** Azure, AWS, GCP
- **Tools:** Databricks, ADF, Synapse, Spark, Kafka
- **Languages:** Python, SQL, PySpark
- **Projects/Experience:** ETL pipelines, real-time systems, data platforms, analytics solutions

Analyze the provided job description and extract the most relevant skills and projects from the candidate's profile that directly match the requirements. Provide a concise summary explaining the alignment.

**Job Description:**
{{{jobDescription}}}`,
});

const matchSkillsToJobDescriptionFlow = ai.defineFlow(
  {
    name: 'matchSkillsToJobDescriptionFlow',
    inputSchema: MatchSkillsToJobDescriptionInputSchema,
    outputSchema: MatchSkillsToJobDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate output from prompt.');
    }
    return output;
  }
);
