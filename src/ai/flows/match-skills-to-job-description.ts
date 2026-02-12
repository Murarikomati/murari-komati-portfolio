'use server';

/**
 * @fileOverview AI Flow to match job descriptions to candidate profile using direct Google AI SDK.
 */

import { generateJSON } from '@/ai/gemini';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const MatchSkillsToJobDescriptionOutputSchema = {
  type: "object",
  properties: {
    matchScore: { type: "number", description: "A percentage score from 0-100 indicating fit." },
    impactSummary: { type: "string", description: "A concise 2-sentence pitch for the candidate." },
    matchedSkills: { type: "array", items: { type: "string" }, description: "Top technical skills that overlap." },
    matchedProjects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          reason: { type: "string" }
        },
        required: ["title", "reason"]
      }
    },
    relevantCertifications: { type: "array", items: { type: "string" } },
    recommendedLinks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          url: { type: "string" },
          context: { type: "string" }
        },
        required: ["name", "url", "context"]
      }
    }
  },
  required: ["matchScore", "impactSummary", "matchedSkills", "matchedProjects", "relevantCertifications", "recommendedLinks"]
};

export type MatchSkillsToJobDescriptionOutput = {
  matchScore: number;
  impactSummary: string;
  matchedSkills: string[];
  matchedProjects: { title: string; reason: string }[];
  relevantCertifications: string[];
  recommendedLinks: { name: string; url: string; context: string }[];
};

export async function matchSkillsToJobDescription(input: { jobDescription: string }): Promise<MatchSkillsToJobDescriptionOutput> {
  const profilePath = path.join(process.cwd(), 'src/ai/profile.json');
  const profileData = fs.readFileSync(profilePath, 'utf-8');

  const prompt = `You are an expert technical recruiter. Analyze the alignment between this Candidate Profile and the Job Description.
  
  Candidate Profile:
  ${profileData}

  Job Description:
  ${input.jobDescription}

  Generate a "Recruiter Cheat Sheet" in JSON format. 
  Limit matchedSkills to the 6 most relevant. 
  Ensure matchScore is realistic. 
  Only include projects and certifications that are relevant.`;

  try {
    const output = await generateJSON<MatchSkillsToJobDescriptionOutput>(prompt, MatchSkillsToJobDescriptionOutputSchema);
    return output;
  } catch (error) {
    console.error("Match Skills Error:", error);
    throw new Error("AI analysis failed. Please try a more detailed job description.");
  }
}
