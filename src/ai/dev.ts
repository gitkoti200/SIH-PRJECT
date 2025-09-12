import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-stakeholder-comments.ts';
import '@/ai/flows/analyze-comment-sentiment.ts';
import '@/ai/flows/extract-relevant-keywords.ts';
import '@/ai/flows/summarize-all-comments.ts';
