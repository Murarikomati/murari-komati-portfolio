'use server';

import { z } from "zod";
import fs from "fs";
import path from "path";
import { generateText } from "../gemini";


/* ================================
   SCHEMAS
================================ */

const InputSchema = z.object({
  jobDescription: z.string().min(50),
});

const SafeOutputSchema = z.object({
  matchScore: z.number().min(0).max(100).default(0),
  impactSummary: z.string().default("Relevant technical alignment found."),
  matchedSkills: z.array(z.string()).default([]),
  matchedProjects: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    })
  ).default([]),
  relevantCertifications: z.array(z.string()).default([]),
  recommendedLinks: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      context: z.string(),
    })
  ).default([])
});

export type MatchSkillsToJobDescriptionOutput =
  z.infer<typeof SafeOutputSchema>;

/* ================================
   MAIN FUNCTION
================================ */

export async function matchSkillsToJobDescription(
  input: { jobDescription: string }
): Promise<MatchSkillsToJobDescriptionOutput> {

  try {
    const validatedInput = InputSchema.parse(input);
    const jdText = validatedInput.jobDescription.toLowerCase();

    /* ================================
       LOAD PROFILE.JSON
    ================================= */

    const profilePath = path.join(
      process.cwd(),
      "src/ai/profile.json"
    );

    const profile = JSON.parse(
      fs.readFileSync(profilePath, "utf-8")
    );

    /* ================================
       FLATTEN ALL SKILLS
    ================================= */

    const allSkills = [
      ...profile.skills.data_engineering,
      ...profile.skills.cloud.azure,
      ...profile.skills.cloud.gcp,
      ...profile.skills.cloud.aws,
      ...profile.skills.streaming,
      ...profile.skills.data_modeling,
      ...profile.skills.machine_learning,
      ...profile.skills.genai,
      ...profile.skills.programming
    ];

    /* ================================
       MATCH SKILLS (STRICT OVERLAP)
    ================================= */

    const matchedSkills = allSkills.filter(skill =>
      jdText.includes(skill.toLowerCase())
    );

    /* ================================
       MATCH CERTIFICATIONS
    ================================= */

    const relevantCertifications = profile.certifications.filter(cert =>
      jdText.includes(cert.toLowerCase())
    );

    /* ================================
       MATCH PROJECTS
    ================================= */

    const matchedProjects = profile.projects
      .filter(project =>
        project.technologies.some(tech =>
          jdText.includes(tech.toLowerCase())
        )
      )
      .slice(0, 3) // 🔥 keep minimal
      .map(project => ({
        title: project.name,
        reason: "Uses technologies directly mentioned in JD."
      }));

    /* ================================
       CALCULATE MATCH SCORE
    ================================= */

    const uniqueJDMatches = matchedSkills.length +
      relevantCertifications.length +
      matchedProjects.length;

    const matchScore = Math.min(
      100,
      Math.round((uniqueJDMatches / 10) * 100)
    );

    /* ================================
       GENERATE SHORT SUMMARY (AI)
    ================================= */

    let impactSummary = "";

    if (matchedSkills.length > 0) {
      const summaryPrompt = `
Write a 2-line professional summary explaining why a candidate with these skills is relevant for this job:

Matched Skills: ${matchedSkills.join(", ")}

Be concise. No exaggeration.
      `;

      try {
        impactSummary = await generateText(summaryPrompt) || 
          "Relevant technical alignment found.";
      } catch {
        impactSummary = "Relevant technical alignment found.";
      }
    }

    /* ================================
       FINAL CLEAN OUTPUT
    ================================= */

    return SafeOutputSchema.parse({
      matchScore,
      impactSummary,
      matchedSkills: matchedSkills.slice(0, 6), // 🔥 limit clutter
      matchedProjects,
      relevantCertifications,
      recommendedLinks: [
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/komati-murari",
          context: "Professional profile overview."
        },
        {
          name: "GitHub",
          url: "https://github.com/Murarikomati",
          context: "Code repositories and projects."
        }
      ]
    });

  } catch (error) {
    console.error("Deep Scan Error:", error);

    return {
      matchScore: 0,
      impactSummary: "Analysis could not be completed.",
      matchedSkills: [],
      matchedProjects: [],
      relevantCertifications: [],
      recommendedLinks: []
    };
  }
}
