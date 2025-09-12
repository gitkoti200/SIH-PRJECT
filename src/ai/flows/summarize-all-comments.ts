'use server';

/**
 * @fileOverview Summarizes a list of stakeholder comments.
 *
 * - summarizeAllComments - A function that summarizes a list of comments.
 * - SummarizeAllCommentsInput - The input type for the summarizeAllComments function.
 * - SummarizeAllCommentsOutput - The return type for the summarizeAllComments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAllCommentsInputSchema = z.object({
  comments: z.array(z.string()).describe('A list of stakeholder comments to summarize.'),
});
export type SummarizeAllCommentsInput = z.infer<typeof SummarizeAllCommentsInputSchema>;

const SummarizeAllCommentsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of all the stakeholder comments.'),
});
export type SummarizeAllCommentsOutput = z.infer<typeof SummarizeAllCommentsOutputSchema>;

export async function summarizeAllComments(input: SummarizeAllCommentsInput): Promise<SummarizeAllCommentsOutput> {
  return summarizeAllCommentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAllCommentsPrompt',
  input: {schema: SummarizeAllCommentsInputSchema},
  output: {schema: SummarizeAllCommentsOutputSchema},
  prompt: `You are an expert policy analyst. Your task is to provide a high-level summary of the following stakeholder comments on a piece of draft legislation.
Identify the main themes, areas of consensus, and points of contention. The summary should be neutral and capture the essence of the collective feedback.

Here are the comments:
{{#each comments}}
- {{{this}}}
{{/each}}
`,
});

const summarizeAllCommentsFlow = ai.defineFlow(
  {
    name: 'summarizeAllCommentsFlow',
    inputSchema: SummarizeAllCommentsInputSchema,
    outputSchema: SummarizeAllCommentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
