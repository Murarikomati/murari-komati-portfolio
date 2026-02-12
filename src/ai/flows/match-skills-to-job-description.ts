
'use server';

import { generateJSON } from '@/ai/gemini';
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

  const prompt = `You are a world-class technical recruiter and AI Architect. 
Analyze the candidate's profile against the provided Job Description (JD).

CRITICAL CANDIDATE STRENGTHS (MUST BE REFLECTED):
1. EXPERIENCE: Candidate has 2.5+ years of PROFESSIONAL experience (not 1 year).
2. PROJECTS: Prioritize the "Customer Service RAG Chatbot" and "Agentic AI Workflow Automation". These are master-level AI projects.
3. PROBLEM SOLVING: Over 880+ problems solved on LeetCode. This shows extreme technical competence.

Candidate Profile:
${profileData}

Job Description:
${input.jobDescription}

TASK:
1. Calculate a Fit Score (0-100).
2. Write a Value Proposition that highlights the 2.5+ years experience and 880+ LC achievements.
3. Map specific projects (RAG Chatbot, etc.) to JD requirements.
4. If JD mentions Python, SQL, or AI, highlight their specific GitHub repos.

Return ONLY JSON:
{
  "matchScore": number,
  "impactSummary": "Detailed summary (3-4 sentences) highlighting the 2.5+ years exp and LC stats",
  "matchedSkills": ["Skill 1", "Skill 2"],
  "matchedProjects": [{"title": "Project Name", "reason": "Why it fits"}],
  "relevantCertifications": ["Cert 1"],
  "recommendedLinks": [{"name": "GitHub/LinkedIn/LeetCode", "url": "url", "context": "What to look for"}]
}`;

  try {
    const output = await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);
    return MatchSkillsToJobDescriptionOutputSchema.parse(output);
  } catch (error: any) {
    console.error("Match Flow Error:", error);
    throw new Error("Analysis failed. Please try a different Job Description.");
  }
}
