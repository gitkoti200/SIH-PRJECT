'use server';
/**
 * @fileOverview Summarizes stakeholder comments to provide a quick understanding of the main points.
 *
 * - summarizeStakeholderComment - A function that summarizes a stakeholder comment.
 * - SummarizeStakeholderCommentInput - The input type for the summarizeStakeholderComment function.
 * - SummarizeStakeholderCommentOutput - The return type for the summarizeStakeholderComment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStakeholderCommentInputSchema = z.object({
  comment: z
    .string()
    .describe('The stakeholder comment to be summarized.'),
});
export type SummarizeStakeholderCommentInput = z.infer<typeof SummarizeStakeholderCommentInputSchema>;

const SummarizeStakeholderCommentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the stakeholder comment.'),
});
export type SummarizeStakeholderCommentOutput = z.infer<typeof SummarizeStakeholderCommentOutputSchema>;

export async function summarizeStakeholderComment(input: SummarizeStakeholderCommentInput): Promise<SummarizeStakeholderCommentOutput> {
  return summarizeStakeholderCommentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStakeholderCommentPrompt',
  input: {schema: SummarizeStakeholderCommentInputSchema},
  output: {schema: SummarizeStakeholderCommentOutputSchema},
  prompt: `Summarize the following stakeholder comment in a concise manner:\n\nComment: {{{comment}}}`,
});

const summarizeStakeholderCommentFlow = ai.defineFlow(
  {
    name: 'summarizeStakeholderCommentFlow',
    inputSchema: SummarizeStakeholderCommentInputSchema,
    outputSchema: SummarizeStakeholderCommentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
