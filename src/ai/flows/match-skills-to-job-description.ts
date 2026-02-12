
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

  const prompt = `You are an elite technical recruiter. Analyze the following candidate profile against a Job Description.

CORE CANDIDATE STRENGTHS TO PRIORITIZE:
1. EXPERIENCE: 2.5+ years of Data Engineering (Azure/Databricks focus). Do NOT refer to them as a fresher.
2. PROBLEM SOLVING: 880+ LeetCode problems solved. This is a massive competitive advantage.
3. PROJECTS: "Customer Service RAG Chatbot" and "Agentic AI Workflow Automation". These showcase modern AI mastery.

Candidate Profile (JSON):
${profileData}

Job Description:
${input.jobDescription}

INSTRUCTIONS:
- Generate a "Recruiter Cheat Sheet" that highlights why this specific candidate is a top-tier fit.
- The "Value Proposition" must mention their 2.5+ years of experience and high LeetCode achievement.
- matchedSkills: Top 6 technical skills.
- matchedProjects: Match their specific Chatbot and Agentic AI projects if the JD mentions Python, AI, or Automation.
- matchScore: 0-100 based on technical alignment.

Return exactly this JSON format:
{
  "matchScore": number,
  "impactSummary": "2-3 sentence high-impact summary",
  "matchedSkills": ["Skill 1", "Skill 2"],
  "matchedProjects": [{"title": "Project Name", "reason": "Why it matches"}],
  "relevantCertifications": ["Cert 1"],
  "recommendedLinks": [{"name": "GitHub/LinkedIn/LeetCode", "url": "url", "context": "What to look for"}]
}`;

  try {
    const output = await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);
    return MatchSkillsToJobDescriptionOutputSchema.parse(output);
  } catch (error: any) {
    console.error("Match Flow Error:", error);
    throw new Error("Analysis engine encountered an error. Please try a different Job Description.");
  }
}
