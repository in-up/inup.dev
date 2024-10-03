import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Post } from ".contentlayer/generated";
import { formatDate } from "@/lib/formatdate";
import Section from "./Section";
import { motion } from "framer-motion";

type Comment = {
  id: number;
  post_id: string;
  nest_id: number | null;
  content: string;
  password_hash: string;
  created_at: string;
  is_deleted: boolean;
};

type CommentProps = {
  post: Post;
};

export default function CommentBox({ post }: CommentProps) {
  const { slug } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
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
    };

    fetchComments();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comment")
      .insert([
        {
          post_id: slug,
          nest_id: null,
          content: newComment,
          password_hash: "",
          created_at: new Date().toISOString(),
          is_deleted: false,
        },
      ])
      .single();

    if (error) {
      setError("댓글 작성에 실패했습니다.");
      return;
    }

    setComments([...comments, data]);
    setNewComment("");
  };

  const getNestedComments = (parentId: number) =>
    comments.filter((comment) => comment.nest_id === parentId);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">댓글</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          댓글 작성
        </button>
      </form>

      {loading ? (
        <p>댓글을 불러오는 중입니다</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        comments
          .filter((comment) => comment.nest_id === null)
          .map((comment) => (
            <div
              key={comment.id}
              className="mb-4 border-b border-gray-200 pb-4"
            >
              <div className="flex justify-between items-center">
                <p>{comment.content}</p>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.created_at)}
                </span>
              </div>

              {/* 답글(nested-comments) */}
              <div className="ml-6 mt-2">
                {getNestedComments(comment.id).map((nestedComment) => (
                  <div key={nestedComment.id} className="mb-2">
                    <div className="flex justify-between items-center">
                      <p>{nestedComment.content}</p>
                      <span className="text-sm text-gray-500">
                        {formatDate(nestedComment.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </>
  );
}
