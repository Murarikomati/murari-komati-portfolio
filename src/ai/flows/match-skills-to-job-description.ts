'use server';
/**
 * @fileOverview Deep-profile AI Matcher for Murari Komati.
 * Scans Experience, Projects, Certifications, and Social links.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MatchSkillsToJobDescriptionInputSchema = z.object({
  jobDescription: z.string().describe('The job description to match against.'),
});
export type MatchSkillsToJobDescriptionInput = z.infer<typeof MatchSkillsToJobDescriptionInputSchema>;

const MatchSkillsToJobDescriptionOutputSchema = z.object({
  matchedSkills: z.array(z.string()).describe('Top matching technical skills.'),
  matchedProjects: z.array(z.object({
    title: z.string(),
    reason: z.string().describe('Why this project proves the candidate can do the job.'),
  })).describe('Specific projects with proof points.'),
  relevantCertifications: z.array(z.string()).describe('Certifications that add credibility for this role.'),
  impactSummary: z.string().describe('A high-impact pitch focusing on measurable results (e.g. 90% automation).'),
  recommendedLinks: z.array(z.object({
    name: z.string(),
    url: z.string(),
    context: z.string().describe('Why the recruiter should click this link (e.g. "Check my Python logic on LeetCode").'),
  })).describe('Direct links to GitHub, LinkedIn, or LeetCode based on JD requirements.'),
});
export type MatchSkillsToJobDescriptionOutput = z.infer<typeof MatchSkillsToJobDescriptionOutputSchema>;

export async function matchSkillsToJobDescription(input: MatchSkillsToJobDescriptionInput): Promise<MatchSkillsToJobDescriptionOutput> {
  return matchSkillsToJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchSkillsToJobDescriptionPrompt',
  input: { schema: MatchSkillsToJobDescriptionInputSchema },
  output: { schema: MatchSkillsToJobDescriptionOutputSchema },
  system: "You are a Senior Technical Recruiter representing Murari Komati. Your task is to perform a Deep Scan of his entire profile and map it to the provided Job Description (JD).",
  prompt: `
    CANDIDATE PROFILE DATA (Murari Komati):
    
    EXPERIENCE:
    - Data Engineer @ Data Master Consulting (2023-Present): Scalable ETL pipelines (ADF, Databricks), Real-time (Kafka, Spark Streaming), GenAI (LangChain, CrewAI, RAG), Delta Lake (SCD Type 2), Power BI.
    - Achievements: 90% reduction in manual tasks, processed 100GB+ daily data, 20% increase in user engagement via AI.
    
    PROJECTS:
    1. SQL ChatBot: NLP to SQL interface via LangChain & Streamlit. Proves Python/SQL/LLM expertise.
    2. CrewAI Assistant: Multi-agent automation for job search. Proves Agentic AI & orchestration.
    3. Traffic Management: OpenCV & Python for real-time density. Proves Computer Vision & logic.
    
    CERTIFICATIONS:
    - Databricks Fundamentals (2025)
    - Databricks Generative AI Fundamentals (2025)
    - Python Basics for Data Science (EDX)
    
    RESOURCES:
    - GitHub: https://github.com/Murarikomati (Code quality, Project structure)
    - LinkedIn: https://linkedin.com/in/komati-murari (Professional network, Endorsements)
    - LeetCode: https://leetcode.com/u/komatimurari50/ (Problem-solving, DSA skills)

    JOB DESCRIPTION:
    {{{jobDescription}}}

    INSTRUCTIONS:
    1. Analyze the JD for specific requirements (Azure, Spark, GenAI, Programming, etc.).
    2. If the JD mentions "Coding", "Algorithms", or "Problem Solving", include the LeetCode link.
    3. Map the Databricks/GenAI certifications if the JD is cloud or AI-focused.
    4. Format the projects to explain exactly how they solve the JD's specific challenges.
    5. Write the impact summary to highlight the 90% automation metric if the JD mentions "Efficiency" or "Scaling".
  `,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ]
  }
});

const matchSkillsToJobDescriptionFlow = ai.defineFlow(
  {
    name: 'matchSkillsToJobDescriptionFlow',
    inputSchema: MatchSkillsToJobDescriptionInputSchema,
    outputSchema: MatchSkillsToJobDescriptionOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) throw new Error("No output from AI model");
      return output;
    } catch (error) {
      console.error("AI Deep Scan failed:", error);
      return {
        matchedSkills: ["Python", "SQL", "Databricks", "Azure", "LangChain"],
        matchedProjects: [{ title: "SQL ChatBot", reason: "Demonstrates production-ready RAG architecture." }],
        relevantCertifications: ["Databricks Generative AI Fundamentals"],
        impactSummary: "Murari has a proven track record of reducing manual data tasks by 90% and building high-performance GenAI solutions.",
        recommendedLinks: [{ name: "LinkedIn", url: "https://linkedin.com/in/komati-murari", context: "Connect for professional references." }],
      };
    }
  }
);