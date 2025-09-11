'use server';

/**
 * @fileOverview Extracts relevant keywords from stakeholder comments.
 *
 * - extractRelevantKeywords - A function that extracts keywords from comments.
 * - ExtractRelevantKeywordsInput - The input type for the extractRelevantKeywords function.
 * - ExtractRelevantKeywordsOutput - The return type for the extractRelevantKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractRelevantKeywordsInputSchema = z.object({
  comment: z.string().describe('The stakeholder comment to extract keywords from.'),
});
export type ExtractRelevantKeywordsInput = z.infer<typeof ExtractRelevantKeywordsInputSchema>;

const ExtractRelevantKeywordsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('The most relevant keywords extracted from the comment.'),
});
export type ExtractRelevantKeywordsOutput = z.infer<typeof ExtractRelevantKeywordsOutputSchema>;

export async function extractRelevantKeywords(input: ExtractRelevantKeywordsInput): Promise<ExtractRelevantKeywordsOutput> {
  return extractRelevantKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractRelevantKeywordsPrompt',
  input: {schema: ExtractRelevantKeywordsInputSchema},
  output: {schema: ExtractRelevantKeywordsOutputSchema},
  prompt: `You are an expert in extracting keywords from text. Your goal is to identify the most relevant keywords from the given stakeholder comment.

Comment: {{{comment}}}

Extract the keywords that best represent the main topics and concerns raised in the comment. Return the keywords as a JSON array of strings.  Do not include any surrounding text or explanation, just the array.
`,
});

const extractRelevantKeywordsFlow = ai.defineFlow(
  {
    name: 'extractRelevantKeywordsFlow',
    inputSchema: ExtractRelevantKeywordsInputSchema,
    outputSchema: ExtractRelevantKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
