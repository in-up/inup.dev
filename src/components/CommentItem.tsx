import React, { useState } from "react";
import { formatDate } from "@/lib/formatdate";
import Profile from "./Profile";
import SubmitBox from "./SubmitBox";
import { supabase } from "@/lib/supabaseClient";
import CommentMenu from "./CommentMenu";
import messages from "@/lib/messages";

type Comment = {
  id: number;
  content: string;
  created_at: string;
  is_admin: boolean;
  name: string;
  password_hash: string;
};

type CommentItemProps = {
  comment: Comment;
  isNested?: boolean;
  nestedComments?: Comment[];
  fetchComments: () => void;
  slug: string;
};

export default function CommentItem({
  comment,
  isNested = false,
  nestedComments = [],
  fetchComments,
  slug,
}: CommentItemProps) {
  const [showSubmitBox, setShowSubmitBox] = useState(false);

  const handleDelete = async () => {
    const deleteCode = prompt(messages.comment.promptInfo);
    if (!deleteCode) return;

    const { data: fetchedComment, error } = await supabase
      .from("comment")
      .select("password_hash")
      .eq("id", comment.id)
      .single();

    if (error || !fetchedComment) {
      alert(messages.comment.fetchError);
      return;
    }

    const { data: isValidResponse, error: hashError } = await supabase.rpc(
      "verify_password",
      {
        password: deleteCode,
        hash: fetchedComment.password_hash,
      }
    );

    if (hashError || !isValidResponse) {
      alert(messages.comment.deleteValidationFailed);
      return;
    }

    const { error: deleteError } = await supabase
      .from("comment")
      .update({ is_deleted: true })
      .eq("id", comment.id);

    if (deleteError) {
      alert(messages.comment.deleteError);
      return;
    }

    alert(messages.comment.deleted);
    fetchComments();
  };

  return (
    <div
      className={`my-2 rounded-[1.25rem] px-2 py-2 md:ml-2 ${isNested ? "bg-tertiary pl-4 py-4" : ""}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Profile
            imageSrc={comment.is_admin ? "/avatar.png" : "/profile.png"}
            alt={`${comment.name}'s profile`}
          />
          <p
            className={`text-sm font-bold mr-3 ${comment.is_admin ? "text-brand" : ""}`}
          >
            {comment.is_admin ? comment.name + " (글쓴이)" : comment.name}
          </p>

          <span className="text-sm text-gray-500">
            {formatDate(comment.created_at, true)}
          </span>
        </div>
        <CommentMenu
          isNested={isNested}
          onReply={() => setShowSubmitBox((prev) => !prev)}
          onDelete={handleDelete}
        />
      </div>
      <p className="mt-1 ml-9 text-sm">{comment.content}</p>

      {showSubmitBox && (
        <SubmitBox
          slug={slug}
          fetchComments={fetchComments}
          parentId={comment.id}
        />
      )}

      {/* nested comments */}
      {nestedComments.length > 0 && (
        <div className="ml-4 mt-4">
          {nestedComments.map((nestedComment) => (
            <CommentItem
              key={nestedComment.id}
              comment={nestedComment}
              isNested={true}
              fetchComments={fetchComments}
              slug={slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
