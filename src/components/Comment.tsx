import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Post } from ".contentlayer/generated";
import SubmitBox from "./SubmitBox";
import { IconLoading } from "./Icons";
import CommentItem from "./CommentItem";

type Comment = {
  id: number;
  post_id: string;
  parent_id: number | null;
  content: string;
  created_at: string;
  is_admin: boolean;
  name: string;
};

type CommentProps = {
  post: Post;
};

export default function CommentBox({ post }: CommentProps) {
  const { slug } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("comment")
      .select("*")
      .eq("post_id", slug)
      .order("created_at", { ascending: true });

    if (error) {
      setError("댓글을 불러오는 데 실패했습니다.");
      setLoading(false);
      return;
    }

    const comments = (data || []) as Comment[];

    const commentsWithNames = comments.map((comment) => ({
      ...comment,
      name: comment.name || "익명",
    }));

    setComments(commentsWithNames);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const getNestedComments = (parentId: number) =>
    comments.filter((comment) => comment.parent_id === parentId);

  return (
    <div className="mt-16">
      {loading ? (
        <IconLoading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        comments
          .filter((comment) => comment.parent_id === null)
          .map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              nestedComments={getNestedComments(comment.id)}
              fetchComments={fetchComments}
              slug={slug}
            />
          ))
      )}

      <SubmitBox slug={slug} fetchComments={fetchComments} />
    </div>
  );
}
