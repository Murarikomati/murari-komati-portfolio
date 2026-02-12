'use server';

/**
 * @fileOverview AI Utility to match job descriptions to candidate profile using direct Google AI SDK.
 */

import { generateJSON } from '@/ai/gemini';
import { z } from 'zod'; // Use standard zod
import fs from 'fs';
import path from 'path';

// Schema for validation and typing
const MatchSkillsToJobDescriptionOutputSchema = z.object({
  matchScore: z.number(),
  impactSummary: z.string(),
  matchedSkills: z.array(z.string()),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    })
  ),
  relevantCertifications: z.array(z.string()),
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
  const profilePath = path.join(process.cwd(), 'src/ai/profile.json');
  const profileData = fs.readFileSync(profilePath, 'utf-8');

  const prompt = `You are an expert technical recruiter analyzing a candidate's profile against a Job Description.

Candidate Profile (JSON):
${profileData}

Job Description:
${input.jobDescription}

Analyze the alignment and generate a "Recruiter Cheat Sheet". 
Be honest but highlight the candidate's strengths.
Ensure the matchScore reflects real technical overlap (0-100).
Limit matchedSkills to the 6 most relevant ones.
Only include projects and certifications that are actually relevant to the JD.

Return the output in the following JSON structure:
{
  "matchScore": number,
  "impactSummary": "2-sentence pitch",
  "matchedSkills": ["Skill 1", "Skill 2"],
  "matchedProjects": [{"title": "Name", "reason": "Why relevant"}],
  "relevantCertifications": ["Cert 1"],
  "recommendedLinks": [{"name": "LinkedIn/GitHub", "url": "link", "context": "Evidence description"}]
}`;

  try {
    const output = await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);
    return MatchSkillsToJobDescriptionOutputSchema.parse(output);
  } catch (error: any) {
    console.error("Match Skills Error:", error);
    throw new Error("AI failed to generate a matching report. Please check your network and try again.");
  }
}
