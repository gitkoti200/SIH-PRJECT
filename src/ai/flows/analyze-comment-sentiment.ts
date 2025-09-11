'use server';

/**
 * @fileOverview A sentiment analysis AI agent for stakeholder comments.
 *
 * - analyzeCommentSentiment - A function that analyzes the sentiment of a comment.
 * - AnalyzeCommentSentimentInput - The input type for the analyzeCommentSentiment function.
 * - AnalyzeCommentSentimentOutput - The return type for the analyzeCommentSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCommentSentimentInputSchema = z.object({
  comment: z.string().describe('The stakeholder comment to analyze.'),
});
export type AnalyzeCommentSentimentInput = z.infer<typeof AnalyzeCommentSentimentInputSchema>;

const AnalyzeCommentSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The sentiment of the comment.'),
  score: z.number().describe('The sentiment score of the comment.'),
});
export type AnalyzeCommentSentimentOutput = z.infer<typeof AnalyzeCommentSentimentOutputSchema>;

export async function analyzeCommentSentiment(
  input: AnalyzeCommentSentimentInput
): Promise<AnalyzeCommentSentimentOutput> {
  return analyzeCommentSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCommentSentimentPrompt',
  input: {schema: AnalyzeCommentSentimentInputSchema},
  output: {schema: AnalyzeCommentSentimentOutputSchema},
  prompt: `You are a sentiment analysis expert. Analyze the sentiment of the following comment and provide a sentiment and a score.

Comment: {{{comment}}}

Respond in JSON format with the following keys:
- sentiment: The sentiment of the comment (positive, negative, or neutral).
- score: A numerical score representing the sentiment strength.  Positive sentiments should have positive scores, negative sentiments should have negative scores, and neutral sentiments should have a score of 0.`,
});

const analyzeCommentSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeCommentSentimentFlow',
    inputSchema: AnalyzeCommentSentimentInputSchema,
    outputSchema: AnalyzeCommentSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
