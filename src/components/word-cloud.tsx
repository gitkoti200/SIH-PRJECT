'use client';

import type { AnalyzedComment } from '@/lib/types';
import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface WordCloudProps {
  comments: AnalyzedComment[];
}

interface WordStat {
  text: string;
  count: number;
  avgSentiment: number;
}

// Function to map sentiment score to a color
const getSentimentColor = (score: number): string => {
  if (score > 0.3) return 'text-green-600'; // Positive
  if (score < -0.3) return 'text-red-600'; // Negative
  return 'text-gray-600'; // Neutral
};

export default function WordCloud({ comments }: WordCloudProps) {
  const keywordStats = useMemo<WordStat[]>(() => {
    const stats: Record<string, { count: number; totalSentiment: number }> = {};
    comments.forEach((comment) => {
      comment.keywords.forEach((keyword) => {
        const lowerKeyword = keyword.toLowerCase();
        if (!stats[lowerKeyword]) {
          stats[lowerKeyword] = { count: 0, totalSentiment: 0 };
        }
        stats[lowerKeyword].count++;
        stats[lowerKeyword].totalSentiment += comment.sentimentScore;
      });
    });

    const processed = Object.entries(stats).map(([text, data]) => ({
      text,
      count: data.count,
      avgSentiment: data.totalSentiment / data.count,
    }));
    
    return processed.sort((a,b) => b.count - a.count).slice(0, 30);
  }, [comments]);
  
  const maxCount = Math.max(...keywordStats.map(s => s.count), 1);

  const getFontSize = (count: number) => {
    const minSize = 0.875; // rem (text-sm)
    const maxSize = 2.25; // rem (text-4xl)
    const size = minSize + (maxSize - minSize) * (count / maxCount);
    return `${size}rem`;
  };

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="font-headline">Keyword Cloud</CardTitle>
        <CardDescription>
          Frequently used words. Size indicates frequency. Color indicates average sentiment.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[250px]">
        {keywordStats.length > 0 ? (
          <TooltipProvider>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {keywordStats.map((word) => (
                <Tooltip key={word.text}>
                  <TooltipTrigger asChild>
                    <span
                      className={`font-medium capitalize transition-transform hover:scale-110 ${getSentimentColor(word.avgSentiment)}`}
                      style={{ fontSize: getFontSize(word.count), lineHeight: '1.2' }}
                    >
                      {word.text}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Mentioned {word.count} time{word.count > 1 ? 's' : ''}
                    </p>
                    <p>Avg. Sentiment: {word.avgSentiment.toFixed(2)}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Not enough data to generate a word cloud.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
