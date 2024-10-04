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
    let { data: comments, error } = await supabase
      .from("comment")
      .select("*")
      .eq("post_id", slug)
      .order("created_at", { ascending: true });

    if (error) {
      setError("댓글을 불러오는 데 실패했습니다.");
      setLoading(false);
      return;
    }

    setComments(comments || []);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const getNestedComments = (parentId: number) =>
    comments.filter((comment) => comment.parent_id === parentId);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">댓글</h2>

      <SubmitBox slug={slug} fetchComments={fetchComments} />

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
            />
          ))
      )}
    </>
  );
}
