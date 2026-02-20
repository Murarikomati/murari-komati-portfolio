'use server';
import { z } from 'zod';
import profileData from '@/ai/profile.json';
import { generateJSON } from '@/ai/groq';

const MatchSkillsToJobDescriptionOutputSchema = z.object({
  // The matchScore has been temporarily commented out as requested.
  // matchScore: z.number().min(60).max(98),
  impactSummary: z.string(),
  matchedSkills: z.array(z.string()).max(8),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    })
  ).max(3),
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string(),
    })
  ).max(3),
});

export type MatchSkillsToJobDescriptionOutput =
  z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;

export async function matchSkillsToJobDescription(input: {
  jobDescription: string;
}): Promise<MatchSkillsToJobDescriptionOutput> {
  const profileDataString = JSON.stringify(profileData, null, 2);

  const prompt = `
You are a senior technical recruiter performing a structured relevance audit.

CRITICAL:
Return ONLY valid JSON.
Do NOT add explanations.
Do NOT add extra keys.
Do NOT rename fields.
Follow the schema EXACTLY.

REQUIRED JSON FORMAT:

{
  "impactSummary": "string (max 4 lines)",
  "matchedSkills": ["string"],
  "matchedProjects": [
    {
      "title": "string",
      "reason": "string"
    }
  ],
  "recommendedLinks": [
    {
      "name": "string",
      "url": "string",
      "context": "string"
    }
  ]
}

RULES:

- impactSummary = Start with a strong, confident statement declaring the candidate as a professional and an excellent fit for the role. Then, provide a concise, recruiter-friendly summary (max 4 lines total).
- matchedSkills = ONLY JD-aligned skills (max 8)
- matchedProjects = top 3 most relevant projects (most relevant first)
- recommendedLinks = top 3 links with 1-line context

Candidate Profile:
${profileDataString}

Job Description:
${input.jobDescription}

Return JSON now.
`;

  const rawOutput = await generateJSON(prompt);

  console.log('--- RAW AI OUTPUT ---');
  console.log(JSON.stringify(rawOutput, null, 2));
  console.log('--- END RAW AI OUTPUT ---');

  const validation =
    MatchSkillsToJobDescriptionOutputSchema.safeParse(rawOutput);

  if (!validation.success) {
    console.error('Validation Error:', validation.error.format());
    throw new Error('AI output validation failed.');
  }

  return validation.data;
}