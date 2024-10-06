import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { formatDate } from "@/lib/formatdate";
import { EllipsisVertical } from "lucide-react";
import { Menu } from "@headlessui/react";
import cn from "clsx";
import Profile from "./Profile";
import SubmitBox from "./SubmitBox";

type Comment = {
  id: number;
  content: string;
  created_at: string;
  is_admin: boolean;
  name: string;
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

  return (
    <div
      className={cn("my-2 rounded-[1.25rem] px-2 py-3", {
        "bg-tertiary pl-4 py-4": isNested,
      })}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Profile imageSrc="/profile.png" alt={`${comment.name}'s profile`} />
          <p className="font-bold mr-3">
            {comment.is_admin ? "Admin" : comment.name}
          </p>
          <span className="text-sm text-gray-500">
            {formatDate(comment.created_at, true)}
          </span>
        </div>
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                className={cn(
                  "relative w-8 h-8 cursor-default rounded-full flex items-center justify-center focus:outline-none",
                  open && "bg-secondaryA"
                )}
              >
                <EllipsisVertical size={16} />
              </Menu.Button>
              <AnimatePresence>
                {open && (
                  <motion.ul
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                    className="absolute right-0 text-base origin-top-right shadow-lg max-h-60 w-30 whitespace-nowrap rounded-xl bg-blur backdrop-blur-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
                  >
                    <Menu.Items static>
                      {!isNested && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`relative cursor-default select-none py-2 px-4 rounded-t-xl z-20 ${active ? "bg-secondaryA" : "text-primary"}`}
                                onClick={() =>
                                  setShowSubmitBox((prev) => !prev)
                                }
                              >
                                답글 달기
                              </button>
                            )}
                          </Menu.Item>
                          <div className="border-l border-primary" />
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`relative cursor-default text-left select-none py-2 px-4 rounded-b-xl z-20 w-full ${active ? "bg-secondaryA" : "text-primary"}`}
                                onClick={() => {
                                  // 삭제
                                }}
                              >
                                삭제
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      )}
                      {isNested && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`relative cursor-default select-none py-2 px-4 rounded-xl z-20 ${active ? "bg-secondaryA" : "text-primary"}`}
                              onClick={() => {
                                // 삭제
                              }}
                            >
                              삭제
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          )}
        </Menu>
      </div>
      <p className="mt-2">{comment.content}</p>

      {showSubmitBox && (
        <SubmitBox
          slug={slug}
          fetchComments={fetchComments}
          parentId={comment.id}
        />
      )}

      {/* 대댓글 */}
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
