'use client';

import type { AnalyzedComment } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import CommentCard from './comment-card';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface CommentListProps {
  comments: AnalyzedComment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline">Stakeholder Feedback</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[calc(100vh-14rem)] pr-4">
                <div className="space-y-4">
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
                </div>
            </ScrollArea>
        </CardContent>
    </Card>
  );
}
