'use client';

import type { AnalyzedComment } from '@/lib/types';
import { useState } from 'react';
import OverallSentimentIndicator from './overall-sentiment-indicator';
import WordCloud from './word-cloud';
import OverallSummary from './overall-summary';
import CommentList from './comment-list';

interface DashboardProps {
  initialComments: AnalyzedComment[];
}

export default function Dashboard({ initialComments }: DashboardProps) {
  const [comments] = useState<AnalyzedComment[]>(initialComments);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
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
