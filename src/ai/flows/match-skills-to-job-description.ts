'use server';

import { z } from 'zod';
import profileData from '@/ai/profile.json';
import { generateJSON } from '@/ai/groq';

/* =====================================================
   STRICT ZOD SCHEMA (NO DRIFT ALLOWED)
===================================================== */

const MatchSkillsToJobDescriptionOutputSchema = z.object({
  impactSummary: z
    .string()
    .max(600),

  matchedSkills: z
    .array(z.string())
    .min(5)
    .max(8),

  matchedProjects: z
    .array(
      z.object({
        title: z.string(),
        reason: z.string(),
        impact: z.string(),
      })
    )
    .length(3), // EXACTLY 3 projects required

  matchedCertifications: z
    .array(
      z.object({
        name: z.string(),
        relevance: z.string(),
      })
    )
    .max(3)
    .default([]),

  recommendedLinks: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        context: z.string(),
      })
    )
    .max(3),
})
.strict(); // 🚨 prevents extra keys from AI


export type MatchSkillsToJobDescriptionOutput =
  z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;


/* =====================================================
   MAIN FUNCTION
===================================================== */

export async function matchSkillsToJobDescription(input: {
  jobDescription: string;
}): Promise<MatchSkillsToJobDescriptionOutput> {

  if (!input.jobDescription?.trim()) {
    throw new Error("Job description is required.");
  }

  const profileDataString = JSON.stringify(profileData, null, 2);

  const prompt = `
You are a world-class technical recruiter generating a high-impact "Recruiter Cheat Sheet".

CRITICAL RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No extra keys.
- Follow schema EXACTLY.
- matchedProjects MUST contain EXACTLY 3 projects.

REQUIRED JSON STRUCTURE:

{
  "impactSummary": "string (max 600 chars)",
  "matchedSkills": ["5-8 strings"],
  "matchedProjects": [
    {
      "title": "string",
      "reason": "1 concise JD alignment sentence",
      "impact": "1 quantified measurable result"
    }
  ],
  "matchedCertifications": [
    {
      "name": "string",
      "relevance": "short JD alignment phrase"
    }
  ],
  "recommendedLinks": [
    {
      "name": "string",
      "url": "string",
      "context": "1-line why recruiter should open this"
    }
  ]
}

IMPACT SUMMARY REQUIREMENTS:
- Max 4 lines.
- Professional and confident.
- Mention years of experience.
- Mention strongest JD stack overlap.
- End with strong role-fit positioning.

CANDIDATE PROFILE:
${profileDataString}

JOB DESCRIPTION:
${input.jobDescription}

Return JSON now.
`;

  const rawOutput = await generateJSON(prompt);

  const validation =
    MatchSkillsToJobDescriptionOutputSchema.safeParse(rawOutput);

  if (!validation.success) {
    console.error("----- RAW AI OUTPUT -----");
    console.error(JSON.stringify(rawOutput, null, 2));
    console.error("----- VALIDATION ERROR -----");
    console.error(validation.error.format());

    throw new Error("AI output validation failed.");
  }

  return validation.data;
}