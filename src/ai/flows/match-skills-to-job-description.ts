import { z } from 'zod';
import profileData from '@/ai/profile.json';
import { generateJSON } from '@/ai/gemini';

// CORRECTED SCHEMA: Removed 'relevantCertifications' as it is not requested from the AI.
const MatchSkillsToJobDescriptionOutputSchema = z.object({
  matchScore: z.number().describe('The match score between 60 and 98'),
  impactSummary: z.string().describe('Concise JD-aligned summary (max 4 lines)'),
  matchedSkills: z.array(z.string()).describe('Top relevant skills only (max 8)'),
  matchedProjects: z.array(
    z.object({
      title: z.string().describe('Most relevant project first'),
      reason: z.string().describe('1-line JD alignment explanation'),
    })
  ),
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string(),
    })
  ),
});

export type MatchSkillsToJobDescriptionOutput = z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;

export async function matchSkillsToJobDescription(input: { jobDescription: string }): Promise<MatchSkillsToJobDescriptionOutput> {
  const profileDataString = JSON.stringify(profileData, null, 2);

  const prompt = `
    You are a senior technical recruiter performing a structured relevance audit.

    OBJECTIVE:
    Deliver a concise, JD-specific evaluation optimized for recruiters scanning in under 5 seconds.
    Your output MUST be a JSON object that strictly adheres to the provided schema.

    STRICT ANALYSIS PROCESS:

    STEP 1 — Extract Top Technical Requirements
    Identify the top 10 core technical requirements from the Job Description.

    STEP 2 — Skill Relevance Mapping
    From the candidate profile:
    - Select ONLY skills directly matching the JD.
    - Do NOT include unrelated skills.

    STEP 3 — Project Scoring & Ranking
    - Evaluate ALL projects and score each (0–10) based on direct JD alignment.
    - Return the top 3 most relevant projects.

    STEP 4 — Realistic Fit Score
    - Calculate a realistic overlap percentage. Do NOT inflate the score. Range: 60–98.

    STEP 5 — Executive Summary
    - Maximum 4 short lines, no fluff. Start with years of experience.

    Candidate Profile:
    ${profileDataString}

    Job Description:
    ${input.jobDescription}

    Provide your analysis in the specified JSON format.
  `;

  const output = await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);

  // CORRECTED VALIDATION: Directly parse against the corrected schema.
  const validation = MatchSkillsToJobDescriptionOutputSchema.safeParse(output);

  if (!validation.success) {
    // The error now includes detailed validation issues for easier debugging if it ever fails again.
    const errorMessage = `AI output validation failed: ${JSON.stringify(validation.error, null, 2)}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  
  return validation.data;
}
