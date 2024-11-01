import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import { EllipsisVertical } from "lucide-react";
import cn from "clsx";

type CommentMenuProps = {
  isNested: boolean;
  onReply: () => void;
  onDelete: () => void;
};

export default function CommentMenu({
  isNested,
  onReply,
  onDelete,
}: CommentMenuProps) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={cn(
              "relative w-8 h-8 cursor-default rounded-full flex items-center justify-center focus:outline-none",
              open && "bg-secondaryA"
            )}
          >
            <EllipsisVertical size={16} className="text-slate-400" />
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
                            onClick={onReply}
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
                            onClick={onDelete}
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
                          onClick={onDelete}
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
  );
}
