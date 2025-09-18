'use client';

import type { AnalyzedComment } from '@/lib/types';
import CommentCard from './comment-card';

interface CommentListProps {
  comments: AnalyzedComment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
    {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
    ))}
    </div>
  );
}
