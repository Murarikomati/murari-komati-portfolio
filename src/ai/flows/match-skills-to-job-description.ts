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

  const prompt = `Analyze Murari Komati's profile against the provided Job Description (JD).

CRITICAL CONSTRAINTS (MANDATORY):
1. **SENIORITY**: Murari has **2.5+ YEARS of professional experience** (Jan 2023 - Present). NEVER refer to him as a fresher.
2. **DSA MASTERY**: He has solved **880+ LeetCode problems** (Rating: 1650+). Highlight this as top-tier engineering talent.
3. **FLAGSHIP PROJECTS**: 
   - 'Customer Service RAG Chatbot' (Python, FastAPI, LangChain)
   - 'Agentic AI Workflow Automation' (LangGraph, CrewAI, Databricks)
   - 'Real-Time Movie Analytics ELT Platform' (Snowflake, dbt, S3)
   - 'Real-Time Stock Market Data Pipeline' (Azure, Fabric)
4. **FIT SCORE**: Because of his specialized Data/AI seniority and DSA skills, the **matchScore MUST be between 85 and 98** for any technical role.

Candidate Data:
${profileData}

Job Description:
${input.jobDescription}

Return ONLY JSON:
{
  "matchScore": number (85-98),
  "impactSummary": "Professional summary starting with 2.5+ years experience and 880+ LC mastery.",
  "matchedSkills": ["Skill 1", "Skill 2"],
  "matchedProjects": [{"title": "Project Name", "reason": "Specific JD alignment"}],
  "relevantCertifications": ["Cert 1"],
  "recommendedLinks": [
    {"name": "GitHub", "url": "https://github.com/Murarikomati", "context": "Technical proof"},
    {"name": "LeetCode", "url": "https://leetcode.com/u/komatimurari50/", "context": "DSA Mastery"}
  ]
}`;

  try {
    return await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);
  } catch (error: any) {
    console.error("Match Flow Error:", error);
    throw new Error("Analysis failed. Please try a different Job Description.");
  }
}
