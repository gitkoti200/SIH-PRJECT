'use client';

import { summarizeAllComments } from '@/ai/flows/summarize-all-comments';
import type { AnalyzedComment } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Icons } from './icons';

interface OverallSummaryProps {
    comments: AnalyzedComment[];
}

export default function OverallSummary({ comments }: OverallSummaryProps) {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSummary() {
            setLoading(true);
            const allCommentsText = comments.map(c => c.comment);
            const result = await summarizeAllComments({ comments: allCommentsText });
            setSummary(result.summary);
            setLoading(false);
        }
        getSummary();
    }, [comments]);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icons.Bot className="h-6 w-6" />
                    AI-Generated Overall Summary
                </CardTitle>
                <CardDescription>
                    A high-level summary of all stakeholder comments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/5" />
                    </div>
                ) : (
                    <div className="prose prose-sm max-w-none text-foreground/80 dark:text-foreground/70 whitespace-pre-wrap">
                        {summary}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
