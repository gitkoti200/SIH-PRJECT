'use client';

import type { AnalyzedComment } from '@/lib/types';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';

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
  const sentimentData = useMemo(() => {
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
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Overall Sentiment</CardTitle>
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
              data={sentimentData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
            >
              {sentimentData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} className="transition-opacity outline-none focus:opacity-100 hover:opacity-90" />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
