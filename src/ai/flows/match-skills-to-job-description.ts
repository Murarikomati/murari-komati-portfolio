
'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow (Direct SDK Implementation)
 * 
 * - matchSkillsToJobDescription: Analyzes candidate fit against a JD using the official Google AI SDK for stability.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from 'zod';

const InputSchema = z.object({
  jobDescription: z.string().min(50),
});

export type MatchSkillsToJobDescriptionInput = z.infer<typeof InputSchema>;

const OutputSchema = z.object({
  matchScore: z.number(),
  extractedKeywords: z.array(z.string()),
  matchedSkills: z.array(z.string()),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    })
  ),
  relevantCertifications: z.array(z.string()),
  impactSummary: z.string(),
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string(),
    })
  ),
});

export type MatchSkillsToJobDescriptionOutput = z.infer<typeof OutputSchema>;

const API_KEY = "AIzaSyAfV2naMhnrAntUKM7fWD66tL9CeQQ16Ow";

export async function matchSkillsToJobDescription(
  input: MatchSkillsToJobDescriptionInput
): Promise<MatchSkillsToJobDescriptionOutput> {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
    Analyze the provided Job Description against Murari Komati's profile.
    
    CANDIDATE PROFILE:
    Name: Murari Komati
    Education: B.Tech in Electronics and Telecommunication, WIT Solapur (2019-2023)
    
    EXPERIENCE:
    - Data Engineer @ Data Master Consulting (Aug 2023 – Present): Azure Databricks, Spark, ETL, Medallion Architecture. Ingested data from SAP HANA, processed 100GB+ daily.
    - Intern @ Data Master Consulting (Jan 2023 – July 2023): Optimized cloud ETL and automated data quality checks.
    
    CERTIFICATIONS:
    - Databricks Fundamentals (2025)
    - Databricks Generative AI Fundamentals (2025)
    - EDX Python Basics for Data Science (2022)
    
    LINKS:
    - GitHub: https://github.com/Murarikomati
    - LinkedIn: https://linkedin.com/in/komati-murari
    - LeetCode: https://leetcode.com/u/komatimurari50/

    JOB DESCRIPTION:
    ${input.jobDescription}

    Return a JSON object with the following fields:
    - matchScore: number (0-100)
    - extractedKeywords: string[]
    - matchedSkills: string[]
    - matchedProjects: {title: string, reason: string}[]
    - relevantCertifications: string[]
    - impactSummary: string (Punchy recruiter pitch)
    - recommendedLinks: {name: string, url: string, context: string}[] (Link GitHub for code, LeetCode for DSA, LinkedIn for contact)
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text) as MatchSkillsToJobDescriptionOutput;
  } catch (error: any) {
    console.error("AI SDK Error:", error);
    throw new Error("Deep Scan failed. Please verify the JD and try again.");
  }
}
