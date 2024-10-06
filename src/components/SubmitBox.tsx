import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Dices, ArrowUp, Check, Copy } from "lucide-react";
import { generateName } from "@/lib/randomname";
import { generateCode } from "@/lib/randomcode";
import { motion, AnimatePresence } from "framer-motion";
import messages from "@/lib/messages";

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
  const [deleteCode, setDeleteCode] = useState<string>("");
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);

  useEffect(() => {
    setNickname(generateName());
    setDeleteCode(generateCode());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (isReadyToSubmit) {
      const { data: hashedPassword, error: hashError } = await supabase.rpc(
        "hash_password",
        { password: deleteCode }
      );

      if (hashError) {
        setError(messages.comment.hashingError);
        return;
      }

      const { error } = await supabase.from("comment").insert([
        {
          post_id: slug,
          parent_id: parentId,
          content: newComment,
          password_hash: hashedPassword,
          created_at: new Date().toISOString(),
          is_deleted: false,
          is_admin: false,
          name: nickname,
        },
      ]);

      if (error) {
        setError(messages.comment.error);
        return;
      }

      fetchComments();
      setNewComment("");
      setIsReadyToSubmit(false);
    } else {
      setIsReadyToSubmit(true);
    }
  };

  const handleNicknameChange = () => {
    setNickname(generateName());
  };

  const copyToClipboard = () => {
    alert(messages.comment.copied);
    navigator.clipboard.writeText(deleteCode);
  };

  return (
    <div className="xl rounded-[1.5rem] border border-primary bg-primary p-4 mt-6 flex flex-col justify-between h-full">
      <div className="flex items-center">
        <span className="font-bold text-sm mx-2 my-1">{nickname}</span>
        <button
          onClick={handleNicknameChange}
          className="flex items-center justify-center p-2 rounded-full bg-transparent text-secondary active:bg-secondary transition-all duration-200"
        >
          <Dices size={16} />
        </button>
      </div>
      <div className="flex mt-1 items-center">
        <textarea
          className="flex-grow p-2 bg-transparent border-none focus:outline-none placeholder-gray-500 resize-none overflow-hidden"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={messages.comment.placeholder}
          rows={1}
        />
        <div className="flex items-center ml-2">
          <AnimatePresence>
            {isReadyToSubmit && (
              <motion.span
                className="text-sm mr-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
              >
                {deleteCode}
              </motion.span>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isReadyToSubmit && (
              <motion.button
                onClick={copyToClipboard}
                className="flex items-center justify-center p-2 mr-2 rounded-full bg-transparent text-secondary active:bg-secondary transition-all duration-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
              >
                <Copy size={14} />
              </motion.button>
            )}
          </AnimatePresence>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center w-10 h-10 bg-alternative text-alternative rounded-full hover:bg-brand transition"
          >
            {isReadyToSubmit ? (
              <Check size={16} strokeWidth={2.5} />
            ) : (
              <ArrowUp size={16} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
