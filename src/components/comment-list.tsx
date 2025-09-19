'use client';

import type { AnalyzedComment } from '@/lib/types';
import AnimatedDiv from '@/components/animated-div';
import CommentCard from './comment-card';

interface CommentListProps {
  comments: AnalyzedComment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
    {comments.map((comment, index) => (
        <AnimatedDiv key={comment.id} delay={index * 0.1}>
            <CommentCard comment={comment} />
        </AnimatedDiv>
    ))}
    </div>
  );
}
