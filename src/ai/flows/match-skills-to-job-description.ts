'use server';

/**
 * @fileOverview AI Flow to match job descriptions to candidate profile.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fs from 'fs';
import path from 'path';

const MatchSkillsToJobDescriptionInputSchema = z.object({
  jobDescription: z.string().describe('The full text of the job description.'),
});
export type MatchSkillsToJobDescriptionInput = z.infer<typeof MatchSkillsToJobDescriptionInputSchema>;

const MatchSkillsToJobDescriptionOutputSchema = z.object({
  matchScore: z.number().describe('A percentage score from 0-100 indicating fit.'),
  impactSummary: z.string().describe('A concise 2-sentence pitch for the candidate.'),
  matchedSkills: z.array(z.string()).describe('Top technical skills that overlap with the JD.'),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string().describe('Why this project proves the candidate fits the JD.'),
    })
  ).describe('Up to 3 relevant projects.'),
  relevantCertifications: z.array(z.string()).describe('Certifications mentioned or implied by the JD.'),
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string(),
    })
  ).describe('Links to evidence like LinkedIn or GitHub.'),
});
export type MatchSkillsToJobDescriptionOutput = z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;

const matchPrompt = ai.definePrompt({
  name: 'matchSkillsToJobDescriptionPrompt',
  input: { schema: MatchSkillsToJobDescriptionInputSchema },
  output: { schema: MatchSkillsToJobDescriptionOutputSchema },
  prompt: `You are an expert technical recruiter analyzing a candidate's profile against a Job Description.

Candidate Profile:
{{{profile}}}

Job Description:
{{{jobDescription}}}

Analyze the alignment and generate a "Recruiter Cheat Sheet". 
Be honest but highlight the candidate's strengths.
Ensure the matchScore reflects real overlap.
Limit matchedSkills to the 6 most relevant ones.
Only include projects and certifications that are actually relevant to the JD.`,
});

export async function matchSkillsToJobDescription(
  input: MatchSkillsToJobDescriptionInput
): Promise<MatchSkillsToJobDescriptionOutput> {
  const profilePath = path.join(process.cwd(), 'src/ai/profile.json');
  const profileData = fs.readFileSync(profilePath, 'utf-8');

  const { output } = await matchPrompt({
    ...input,
    profile: profileData,
  });

  if (!output) {
    throw new Error('AI failed to generate a matching report. Please try again.');
  }

  return output;
}

const matchSkillsToJobDescriptionFlow = ai.defineFlow(
  {
    name: 'matchSkillsToJobDescriptionFlow',
    inputSchema: MatchSkillsToJobDescriptionInputSchema,
    outputSchema: MatchSkillsToJobDescriptionOutputSchema,
  },
  async (input) => {
    return matchSkillsToJobDescription(input);
  }
);