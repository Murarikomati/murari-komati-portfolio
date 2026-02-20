'use server';

import { generateJSON } from '@/ai/llm';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

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
- If testing, CI/CD, backend, or automation is mentioned — include Pytest, Unit Testing, CI/CD if relevant.

STEP 3 — Project Scoring & Ranking
- Evaluate ALL projects.
- Score each project (0–10) based on direct JD alignment.
- Rank projects in descending order.
- Return minimum 3 most relevant projects.
- If fewer than 3 are strongly aligned, include moderately aligned ones.

STEP 4 — Realistic Fit Score
- Calculate realistic overlap percentage.
- DO NOT inflate score.
- Range 60–98 depending on relevance.

STEP 5 — Executive Summary
- Maximum 4 short lines.
- No fluff.
- No generic praise.
- Direct JD alignment language.
- Start with years of experience.
- Mention DSA only if role is engineering-heavy.

DO NOT:
- Add technologies not in profile.json
- Use exaggerated language
- Repeat static phrases
- Mention skills not in JD
- Return long paragraphs

Candidate Profile:
${profileData}

Job Description:
${input.jobDescription}

Return STRICT JSON ONLY:

{
  "matchScore": number,
  "impactSummary": "Concise JD-aligned summary (max 4 lines).",
  "matchedSkills": ["Top relevant skills only (max 8)"],
  "matchedProjects": [
    {"title": "Most relevant project first", "reason": "1-line JD alignment explanation"}
  ],
  "relevantCertifications": ["Only if explicitly relevant"],
  "recommendedLinks": [
    {"name": "LinkedIn", "url": "https://www.linkedin.com/in/murarikomati/", "context": "Professional profile"},
    {"name": "GitHub", "url": "https://github.com/Murarikomati", "context": "Technical implementations"},
    {"name": "LeetCode", "url": "https://leetcode.com/u/komatimurari50/", "context": "DSA proficiency"}
  ]
}
`;


  try {
    return await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);
  } catch (error: any) {
    console.error("Match Flow Error:", error);
    throw new Error("Analysis failed. Please try a different Job Description.");
  }
}
