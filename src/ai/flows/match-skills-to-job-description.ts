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

  const prompt = `You are a Senior AI & Data Engineering Recruiter. 
Analyze the candidate's profile against the provided Job Description (JD).

CRITICAL CONTEXT (MUST BE HIGHLIGHTED):
1. SENIORITY: The candidate has 2.5+ YEARS of professional experience. DO NOT refer to them as a fresher or junior.
2. DSA MASTERY: The candidate has solved over 880+ problems on LeetCode. This is a primary differentiator.
3. CORE PROJECTS: The candidate built the 'Customer Service RAG Chatbot' and 'Agentic AI Workflow Automation'. These are the flagship proofs of impact.
4. TECH STACK: Python (Advanced), FastAPI, Azure Databricks, PySpark, and SQL.

Candidate Profile:
${profileData}

Job Description:
${input.jobDescription}

TASK:
1. Calculate a Fit Score (0-100).
2. Write a professional Value Proposition. START by mentioning the 2.5+ years of experience and the 880+ LeetCode achievement.
3. Map the RAG Chatbot and Agentic AI projects specifically to JD requirements.
4. Identify matching skills from the JD.

Return ONLY JSON:
{
  "matchScore": number,
  "impactSummary": "Detailed summary (4-5 sentences) highlighting the 2.5+ years experience and 880+ LC mastery.",
  "matchedSkills": ["Skill 1", "Skill 2"],
  "matchedProjects": [{"title": "Project Name", "reason": "Why it fits"}],
  "relevantCertifications": ["Cert 1"],
  "recommendedLinks": [{"name": "GitHub/LinkedIn/LeetCode", "url": "url", "context": "What to look for"}]
}`;

  try {
    return await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);
  } catch (error: any) {
    console.error("Match Flow Error:", error);
    throw new Error("Analysis failed. Please try a different Job Description.");
  }
}