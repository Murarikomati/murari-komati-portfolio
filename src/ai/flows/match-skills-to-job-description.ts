'use server';

/**
 * @fileOverview Refactored AI Flow using direct Gemini SDK for maximum reliability.
 */

import { generateJSON } from '@/ai/gemini';
import fs from 'fs';
import path from 'path';

export interface MatchSkillsToJobDescriptionInput {
  jobDescription: string;
}

export interface MatchSkillsToJobDescriptionOutput {
  matchScore: number;
  impactSummary: string;
  matchedSkills: string[];
  matchedProjects: {
    title: string;
    reason: string;
  }[];
  relevantCertifications: string[];
  recommendedLinks: {
    name: string;
    url: string;
    context: string;
  }[];
}

export async function matchSkillsToJobDescription(
  input: MatchSkillsToJobDescriptionInput
): Promise<MatchSkillsToJobDescriptionOutput> {
  const profilePath = path.join(process.cwd(), 'src/ai/profile.json');
  const profileData = fs.readFileSync(profilePath, 'utf-8');

  const prompt = `You are an expert technical recruiter. Analyze the candidate's profile against the provided Job Description.
  
  Candidate Profile:
  ${profileData}
  
  Job Description:
  ${input.jobDescription}
  
  Return a JSON object with the following structure:
  {
    "matchScore": number (0-100),
    "impactSummary": "2-sentence high-impact pitch",
    "matchedSkills": ["Skill 1", "Skill 2", ...],
    "matchedProjects": [{"title": "Project Name", "reason": "Why it's relevant"}],
    "relevantCertifications": ["Cert 1", ...],
    "recommendedLinks": [{"name": "Link Name", "url": "URL", "context": "Why visit this"}]
  }
  
  Limit matchedSkills to 6. Only include relevant data. Be concise and professional.`;

  try {
    const result = await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt);
    return result;
  } catch (error) {
    console.error("AI SDK Matcher Error:", error);
    throw new Error("Deep Scan failed. Please check the Job Description and try again.");
  }
}
