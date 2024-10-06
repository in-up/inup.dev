import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Dices, ArrowRight } from "lucide-react";
import { generateName } from "@/lib/randomname";

type SubmitBoxProps = {
  slug: string;
  fetchComments: () => void;
  parentId?: number | null;
};

export default function SubmitBox({
  slug,
  fetchComments,
  parentId = null,
}: SubmitBoxProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    setNickname(generateName());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase.from("comment").insert([
      {
        post_id: slug,
        parent_id: parentId,
        content: newComment,
        password_hash: "",
        created_at: new Date().toISOString(),
        is_deleted: false,
        is_admin: false,
        name: nickname,
      },
    ]);

    if (error) {
      setError("An error occurred.");
      return;
    }

    fetchComments();
    setNewComment("");
  };

  const handleNicknameChange = () => {
    setNickname(generateName());
  };

  return (
    <div className="xl rounded-[1.5rem] border border-primary bg-primary p-4 mt-6 md:mr-3 flex flex-col justify-between h-full">
      <div className="flex items-center">
        <span className="font-bold text-md mx-2 my-1">{nickname}</span>
        <Dices
          className="ml-2 cursor-pointer text-secondary"
          size={18}
          onClick={handleNicknameChange}
        />
      </div>
      <div className="flex mt-2 items-center">
        <textarea
          className="flex-grow p-2 bg-transparent border-none focus:outline-none placeholder-gray-500 resize-none overflow-hidden"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={1}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="ml-2 flex items-center justify-center w-10 h-10 bg-alternative text-alternative rounded-full hover:bg-brand transition"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
