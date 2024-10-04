// components/CommentItem.tsx
import React from "react";
import { formatDate } from "@/lib/formatdate";

type Comment = {
  id: number;
  content: string;
  created_at: string;
  is_admin: boolean;
};

type CommentItemProps = {
  comment: Comment;
  isNested?: boolean;
  nestedComments?: Comment[];
};

export default function CommentItem({
  comment,
  isNested = false,
  nestedComments = [],
}: CommentItemProps) {
  return (
    <div
      className={`mb-4 ${isNested ? "ml-6" : "border-b border-gray-200 pb-4"}`}
    >
      <div className="flex justify-between items-center">
        <p>{comment.content}</p>
        <span className="text-sm text-gray-500">
          {formatDate(comment.created_at)}
        </span>
      </div>

      {/* 대댓글 */}
      {nestedComments.length > 0 && (
        <div className="ml-6 mt-2">
          {nestedComments.map((nestedComment) => (
            <CommentItem
              key={nestedComment.id}
              comment={nestedComment}
              isNested={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
