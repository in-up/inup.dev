import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SubmitBoxProps = {
  slug: string;
  fetchComments: () => void;
};

export default function SubmitBox({ slug, fetchComments }: SubmitBoxProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase.from("comment").insert([
      {
        post_id: slug,
        parent_id: null,
        content: newComment,
        password_hash: "",
        created_at: new Date().toISOString(),
        is_deleted: false,
        is_admin: false,
      },
    ]);

    if (error) {
      setError("댓글 작성에 실패했습니다.");
      return;
    }

    fetchComments();
    setNewComment("");
  };

  return (
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
