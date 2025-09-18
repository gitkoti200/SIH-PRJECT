'use client';

import type { AnalyzedComment } from '@/lib/types';
import { useState } from 'react';
import OverallSentimentIndicator from './overall-sentiment-indicator';
import WordCloud from './word-cloud';
import OverallSummary from './overall-summary';
import CommentList from './comment-list';
import NewCommentForm from './new-comment-form';
import { analyzeCommentSentiment } from '@/ai/flows/analyze-comment-sentiment';
import { extractRelevantKeywords } from '@/ai/flows/extract-relevant-keywords';
import { summarizeStakeholderComment } from '@/ai/flows/summarize-stakeholder-comments';


interface DashboardProps {
  initialComments: AnalyzedComment[];
}

export default function Dashboard({ initialComments }: DashboardProps) {
  const [comments, setComments] = useState<AnalyzedComment[]>(initialComments);

  const handleNewComment = async (comment: {
    author: string;
    provision: string;
    comment: string;
  }) => {
    const optimisticComment: AnalyzedComment = {
      id: `optimistic-${Date.now()}`,
      ...comment,
      timestamp: new Date().toISOString(),
      sentiment: 'neutral',
      sentimentScore: 0,
      summary: 'Analyzing...',
      keywords: [],
      isOptimistic: true,
    };

    setComments((prev) => [optimisticComment, ...prev]);

    try {
      const [sentiment, keywords, summary] = await Promise.all([
        analyzeCommentSentiment({ comment: comment.comment }),
        extractRelevantKeywords({ comment: comment.comment }),
        summarizeStakeholderComment({ comment: comment.comment }),
      ]);

      const newAnalyzedComment: AnalyzedComment = {
        ...optimisticComment,
        id: `comment-${Date.now()}`,
        sentiment: sentiment.sentiment,
        sentimentScore: sentiment.score,
        keywords: keywords.keywords,
        summary: summary.summary,
        isOptimistic: false,
      };
      
      setComments((prev) =>
        prev.map((c) =>
          c.id === optimisticComment.id ? newAnalyzedComment : c
        )
      );

    } catch (error) {
        console.error("Failed to analyze comment:", error);
        // Remove the optimistic comment if analysis fails
        setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 flex flex-col gap-8">
        <NewCommentForm onSubmit={handleNewComment} />
        <CommentList comments={comments} />
      </div>
      <div className="lg:col-span-2 space-y-8">
         <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <OverallSentimentIndicator comments={comments} />
            <WordCloud comments={comments} />
        </section>
        <OverallSummary comments={comments} />
      </div>
    </div>
  );
}
