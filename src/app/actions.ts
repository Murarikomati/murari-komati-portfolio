'use server';

import { matchSkillsToJobDescription } from '@/ai/flows/match-skills-to-job-description';

// This is the Server Action that the client will call.
export const matchSkillsAction = async (jobDescription: string) => {
  return await matchSkillsToJobDescription({ jobDescription });
};