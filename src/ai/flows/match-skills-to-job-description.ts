'use server';

/**
 * @fileOverview Deep Scan AI Matcher Flow (Production Ready)
 * 
 * - matchSkillsToJobDescription: Directly utilizes the Google Generative AI SDK to bypass Genkit versioning issues.
 * - Extracts relevance between a Job Description and Murari Komati's profile.
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
  
  // Use gemini-1.5-flash for speed and free-tier compatibility
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
    You are an expert technical recruiter. Analyze the provided Job Description against Murari Komati's engineering profile.
    
    CANDIDATE PROFILE:
    Name: Murari Komati
    Current Role: Data Engineer @ Data Master Consulting
    Technical Arsenal: Azure Databricks, Spark, ETL, Medallion Architecture, LangChain, CrewAI, LangGraph, Python, SQL.
    Key Impact: Processed 100GB+ daily transactional data; built RAG architectures; optimized cloud ETL.
    
    EDUCATION:
    - B.Tech in Electronics and Telecommunication, WIT Solapur (2019-2023)
    
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

    INSTRUCTIONS:
    1. Calculate a matchScore (0-100) based on skills and experience overlap.
    2. Extract relevant keywords from the JD.
    3. Identify specific matched skills from Murari's profile.
    4. Link his projects (Customer Service ChatBot, CrewAI Job Assistant) to JD requirements.
    5. Write a punchy impactSummary for a hiring manager.
    6. Provide recommendedLinks with context (e.g., "Review his Spark implementation on GitHub").

    Return valid JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up markdown code blocks if present
    if (text.startsWith("```json")) {
      text = text.replace(/```json|```/g, "").trim();
    }
    
    const parsedData = JSON.parse(text);
    return OutputSchema.parse(parsedData);
  } catch (error: any) {
    console.error("AI SDK Production Error:", error);
    throw new Error("The deep scan encountered an error. Please ensure the Job Description is valid and try again.");
  }
}
