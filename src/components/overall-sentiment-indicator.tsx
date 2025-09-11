'use client';

import type { AnalyzedComment } from '@/lib/types';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface OverallSentimentIndicatorProps {
  comments: AnalyzedComment[];
}

const chartConfig = {
  sentiment: {
    label: 'Sentiment',
  },
  positive: {
    label: 'Positive',
    color: 'hsl(var(--chart-2))',
  },
  neutral: {
    label: 'Neutral',
    color: 'hsl(var(--chart-3))',
  },
  negative: {
    label: 'Negative',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function OverallSentimentIndicator({
  comments,
}: OverallSentimentIndicatorProps) {
  const sentimentCounts = useMemo(() => {
    const counts = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };
    comments.forEach((comment) => {
      counts[comment.sentiment]++;
    });
    return [
      { name: 'Positive', value: counts.positive, fill: 'var(--color-positive)' },
      { name: 'Neutral', value: counts.neutral, fill: 'var(--color-neutral)' },
      { name: 'Negative', value: counts.negative, fill: 'var(--color-negative)' },
    ];
  }, [comments]);
  
  const totalComments = comments.length;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Overall Sentiment</CardTitle>
        <CardDescription>Distribution of all {totalComments} received comments.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={sentimentCounts}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {sentimentCounts.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
