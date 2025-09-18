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
    <Card className="flex-1 flex flex-col">
        <CardHeader>
            <CardTitle>Stakeholder Comments</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 -mr-4">
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
