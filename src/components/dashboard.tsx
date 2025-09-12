'use client';

import type { AnalyzedComment, Sentiment } from '@/lib/types';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import OverallSentimentIndicator from './overall-sentiment-indicator';
import WordCloud from './word-cloud';
import CommentCard from './comment-card';
import { Icons } from './icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverallSummary from './overall-summary';

type SortOption = 'sentiment_desc' | 'sentiment_asc' | 'date_desc';
type SentimentFilter = Sentiment | 'all';

interface DashboardProps {
  initialComments: AnalyzedComment[];
}

export default function Dashboard({ initialComments }: DashboardProps) {
  const [comments, setComments] = useState<AnalyzedComment[]>(initialComments);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] =
    useState<SentimentFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date_desc');

  const filteredAndSortedComments = useMemo(() => {
    let filtered = comments;

    if (sentimentFilter !== 'all') {
      filtered = filtered.filter((c) => c.sentiment === sentimentFilter);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.comment.toLowerCase().includes(lowercasedTerm) ||
          c.keywords.some((k) => k.toLowerCase().includes(lowercasedTerm))
      );
    }

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'sentiment_asc':
          return (a.sentimentScore ?? 0) - (b.sentimentScore ?? 0);
        case 'date_desc':
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'sentiment_desc':
        default:
          return (b.sentimentScore ?? 0) - (a.sentimentScore ?? 0);
      }
    });
  }, [comments, searchTerm, sentimentFilter, sortOption]);

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <OverallSentimentIndicator comments={comments} />
        <WordCloud comments={comments} />
      </section>

      <Tabs defaultValue="stakeholder-feedback">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stakeholder-feedback">
                Stakeholder Feedback
            </TabsTrigger>
            <TabsTrigger value="overall-summary">
                Overall Summary
            </TabsTrigger>
        </TabsList>
        <TabsContent value="stakeholder-feedback" className="mt-6">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Stakeholder Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                    <Label>Filter by Sentiment</Label>
                    <RadioGroup
                        defaultValue="all"
                        className="flex items-center space-x-4"
                        onValueChange={(value: SentimentFilter) =>
                        setSentimentFilter(value)
                        }
                    >
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="r-all" />
                        <Label htmlFor="r-all">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="positive" id="r-pos" />
                        <Label htmlFor="r-pos">Positive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="r-neu" />
                        <Label htmlFor="r-neu">Neutral</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="negative" id="r-neg" />
                        <Label htmlFor="r-neg">Negative</Label>
                        </div>
                    </RadioGroup>
                    </div>
                    <div className="relative space-y-2">
                    <Label htmlFor="search">Search by Keyword</Label>
                    <Icons.Search className="absolute bottom-2.5 left-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="search"
                        placeholder="e.g., 'privacy', 'cost'..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="sort">Sort by</Label>
                    <Select
                        value={sortOption}
                        onValueChange={(value: SortOption) => setSortOption(value)}
                    >
                        <SelectTrigger id="sort">
                        <SelectValue placeholder="Sort comments" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="date_desc">
                            Most Recent
                        </SelectItem>
                        <SelectItem value="sentiment_desc">
                            Sentiment: High to Low
                        </SelectItem>
                        <SelectItem value="sentiment_asc">
                            Sentiment: Low to High
                        </SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredAndSortedComments.length > 0 ? (
                    filteredAndSortedComments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                    ) : (
                    <div className="text-center text-muted-foreground py-12">
                        <p>No comments match the current filters.</p>
                    </div>
                    )}
                </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="overall-summary" className="mt-6">
            <OverallSummary comments={comments} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
