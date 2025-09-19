
'use client';

import type { AnalyzedComment } from '@/lib/types';
import { useState } from 'react';
import OverallSentimentIndicator from './overall-sentiment-indicator';
import WordCloud from './word-cloud';
import OverallSummary from './overall-summary';
import CommentList from './comment-list';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Icons } from './icons';
import { ScrollArea } from './ui/scroll-area';


interface DashboardProps {
  initialComments: AnalyzedComment[];
}

export default function Dashboard({ initialComments }: DashboardProps) {
  const [comments] = useState<AnalyzedComment[]>(initialComments);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card className="h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icons.Comment className="h-6 w-6" />
                    Reviewed Comments
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <ScrollArea className="h-full pr-4">
                    <CommentList comments={comments} />
                </ScrollArea>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 space-y-8">
         <div>
          <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <OverallSentimentIndicator comments={comments} />
              <WordCloud comments={comments} />
          </section>
        </div>
        <div>
          <OverallSummary comments={comments} />
        </div>
      </div>
    </div>
  );
}
