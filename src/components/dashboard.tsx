'use client';

import type { AnalyzedComment } from '@/lib/types';
import { useState } from 'react';
import OverallSentimentIndicator from './overall-sentiment-indicator';
import WordCloud from './word-cloud';
import OverallSummary from './overall-summary';

interface DashboardProps {
  initialComments: AnalyzedComment[];
}

export default function Dashboard({ initialComments }: DashboardProps) {
  const [comments] = useState<AnalyzedComment[]>(initialComments);

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <OverallSentimentIndicator comments={comments} />
        <WordCloud comments={comments} />
      </section>

      <OverallSummary comments={comments} />
    </div>
  );
}
