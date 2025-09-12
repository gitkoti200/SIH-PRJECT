
'use client';

import type { AnalyzedComment } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from './icons';
import { Skeleton } from './ui/skeleton';

interface CommentCardProps {
  comment: AnalyzedComment;
}

const sentimentStyles = {
  positive: {
    icon: Icons.Positive,
    badge: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
    text: 'text-green-600 dark:text-green-400',
  },
  negative: {
    icon: Icons.Negative,
    badge: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
    text: 'text-red-600 dark:text-red-400',
  },
  neutral: {
    icon: Icons.Neutral,
    badge: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
    text: 'text-gray-600 dark:text-gray-400',
  },
};

export default function CommentCard({ comment }: CommentCardProps) {
  const styles = sentimentStyles[comment.sentiment];
  const SentimentIcon = styles.icon;
  const isOptimistic = comment.isOptimistic;

  return (
    <Card className={`transition-shadow duration-300 hover:shadow-lg ${isOptimistic ? 'opacity-60 animate-pulse' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                 <CardTitle className="text-base font-medium">{comment.author}</CardTitle>
                <CardDescription>
                  {new Date(comment.timestamp).toLocaleString()} | On Provision: <span className="font-semibold text-foreground">{comment.provision}</span>
                </CardDescription>
            </div>
             <Badge className={`capitalize ${styles.badge}`}>
                <SentimentIcon className={`mr-2 h-4 w-4 ${styles.text}`} />
                {comment.sentiment}
            </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{comment.comment}</p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Keywords:</span>
            {isOptimistic ? (
                <Skeleton className="h-5 w-24" />
            ) : (
                comment.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="font-normal">
                    {keyword}
                    </Badge>
                ))
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
