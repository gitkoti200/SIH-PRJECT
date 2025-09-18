export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface CommentAnalysis {
  sentiment: Sentiment;
  sentimentScore: number;
  summary: string;
  keywords: string[];
}

export interface StakeholderComment {
  id: string;
  author: string;
  timestamp: string;
  comment: string;
  provision: string;
}

export interface AnalyzedComment extends StakeholderComment, CommentAnalysis {}
