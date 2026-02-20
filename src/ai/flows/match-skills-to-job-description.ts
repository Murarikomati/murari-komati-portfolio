'use server';
import { z } from 'zod';
import profileData from '@/ai/profile.json';
import { generateJSON } from '@/ai/groq';

const MatchSkillsToJobDescriptionOutputSchema = z.object({
  impactSummary: z.string().max(600).describe("Core Value Proposition: A concise, professional summary aligned with the JD and resume."),

  matchedSkills: z.array(z.string())
    .min(5)
    .max(8)
    .describe("A list of 5-8 skills most relevant to the Job Description, drawn from the candidate's profile."),

  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string().describe("Why this project is relevant to the job description."),
      impact: z.string().describe("A quantified outcome or achievement for this project."),
    })
  )
  .min(3)
  .max(3)
  .describe("The top 3 most relevant projects, aligned with the job description."),

  matchedCertifications: z.array(
    z.object({
      name: z.string(),
      relevance: z.string().describe("A brief explanation of why this certification is relevant to the job."),
    })
  )
  .max(3)
  .describe("Up to 3 of the most relevant certifications."),

  // The comma was missing on the line above, causing the TypeScript errors.
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string(),
    })
  )
  .max(3),
});

export type MatchSkillsToJobDescriptionOutput =
  z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;

export async function matchSkillsToJobDescription(input: {
  jobDescription: string;
}): Promise<MatchSkillsToJobDescriptionOutput> {
  const profileDataString = JSON.stringify(profileData, null, 2);

  const prompt = `
    You are a world-class technical recruiter and career coach creating a compelling "Recruiter Cheat Sheet" for a candidate.

    **OBJECTIVE:**
    Your analysis must be sharp, concise, and professional. It must strictly align the candidate's profile with the provided Job Description (JD). The output MUST be a valid JSON object adhering EXACTLY to the specified schema.

    **CANDIDATE PROFILE:**
    ${profileDataString}

    **JOB DESCRIPTION:**
    ${input.jobDescription}

    **STRICT OUTPUT REQUIREMENTS:**

    1.  **`impactSummary` (Core Value Proposition):**
        - Write a polished, professional summary (max 600 chars). 
        - Start with a strong statement summarizing the candidate's professional identity (e.g., "Murari Komati is a seasoned Data Engineer...").
        - Directly address how the candidate's experience (e.g., "2.5+ years") and expertise align with the key requirements of the JD.
        - This is the candidate's elevator pitch.

    2.  **`matchedSkills`:**
        - Identify the top 5-8 most relevant technical skills from the candidate's profile that directly match the JD.

    3.  **`matchedProjects` (Evidence & Proof Points):**
        - Select EXACTLY 3 projects from the candidate's resume that best demonstrate their qualifications for this role.
        - For each project, provide:
            - `title`: The project name.
            - `reason`: A single, concise sentence explaining *why* this project is relevant to the JD.
            - `impact`: A specific, a quantified achievement (e.g., "Reduced data processing time by 30%," "Increased system reliability to 99.9%," "Supported X users...").

    4.  **`matchedCertifications`:**
        - From the candidate's certifications, select up to 3 that are most relevant to the JD.
        - For each certification, provide:
            - `name`: The certification name.
            - `relevance`: A brief phrase explaining its value for this specific role.

    5.  **`recommendedLinks` (Technical Deep Dive):**
        - Select the top 3 most relevant online links (e.g., GitHub, LeetCode, portfolio).
        - Provide context for each link.

    **FINAL INSTRUCTION:**
    Generate the JSON output now. Do not include any commentary outside of the JSON structure.
  `;

  const rawOutput = await generateJSON(prompt);

  const validation =
    MatchSkillsToJobDescriptionOutputSchema.safeParse(rawOutput);

  if (!validation.success) {
    console.error("--- RAW AI OUTPUT ---");
    console.error(JSON.stringify(rawOutput, null, 2));
    console.error('--- ZOD VALIDATION ERROR ---', validation.error.format());
    throw new Error('AI output validation failed.');
  }

  return validation.data;
}
