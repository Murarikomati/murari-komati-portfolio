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

  const prompt = `You are a Senior Technical Recruiter and Engineering Manager. 
Analyze the candidate's profile against the provided Job Description (JD).

CRITICAL CONSTRAINTS (YOU MUST ADHERE TO THESE):
1. **SENIORITY**: Murari Komati has **2.5+ YEARS of professional experience** building data platforms. NEVER refer to him as a fresher or intern. He is a mid-level engineer.
2. **DSA MASTERY**: He has solved **880+ problems on LeetCode** (Top 17% worldwide). This is a top-tier differentiator.
3. **CORE PROJECTS**: 
   - 'Customer Service RAG Chatbot' (Python, FastAPI, LangChain, SQL)
   - 'Agentic AI Workflow Automation' (LangGraph, CrewAI, Databricks)
   - Focus on these as primary proof of technical impact.

Candidate Profile Data:
${profileData}

Job Description:
${input.jobDescription}

TASK:
1. Fit Score (0-100): High score if the JD matches Data Engineering or AI/LLM work.
2. Impact Summary: Write a 4-5 sentence professional summary. MUST start by mentioning the 2.5+ years of experience and 880+ LeetCode mastery.
3. Map Projects: Link his RAG and Agentic AI work to JD requirements.
4. Skills: Identify matched skills from both JD and profile.

Return ONLY JSON:
{
  "matchScore": number,
  "impactSummary": "Professional summary starting with 2.5+ years experience and 880+ LC mastery.",
  "matchedSkills": ["Skill 1", "Skill 2"],
  "matchedProjects": [{"title": "Project Name", "reason": "Why it fits this JD specifically"}],
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
