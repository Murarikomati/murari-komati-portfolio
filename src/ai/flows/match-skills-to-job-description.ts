import { generate } from '@genkit-ai/ai';
import { ai, shutdown } from '@/ai/genkit'; // Import the shutdown function
import { z } from 'zod';
import profileData from '@/ai/profile.json';

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
  relevantCertifications: z.array(z.string()).describe('Only if explicitly relevant'),
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

  let output: MatchSkillsToJobDescriptionOutput | undefined;
  try {
    const llmResponse = await generate({
      model: ai.model,
      prompt: prompt,
      output: {
        format: 'json',
        schema: MatchSkillsToJobDescriptionOutputSchema,
      },
      config: {
        temperature: 0.1,
      },
    });

    output = llmResponse.output();

    if (!output) {
      throw new Error("AI returned an empty or invalid output.");
    }

    return output;
    
  } catch (error: any) {
    console.error("Genkit Generation Error:", error);
    throw new Error("The AI analysis failed. Please try again or contact support if the issue persists.");
  } finally {
    // CRITICAL: Shut down Genkit resources to ensure the serverless function exits cleanly.
    await shutdown();
  }
}
