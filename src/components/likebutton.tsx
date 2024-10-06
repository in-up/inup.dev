import { useEffect, useState } from "react";
import { safeLocalStorage as localStorage } from "@/lib/localstorage";
import { supabase } from "@/lib/supabaseClient";
import { IconHeart, IconHeartOutline } from "./Icons";
import Halo from "./Halo";
import FlipNumber from "./FlipNumber";

export default function LikeButton({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const [likes, setLikes] = useState<number | undefined>(undefined);
  const liked = localStorage.getItem(slug) === "true";

  useEffect(() => {
    const fetchLikes = async () => {
      const { data: post, error } = await supabase
        .from("post")
        .select("like_count")
        .eq("post_id", slug)
        .single();

      if (error) {
        console.error("Error fetching likes:", error);
      } else {
        setLikes(post?.like_count);
      }
    };

    fetchLikes();
    setMounted(true);
  }, [slug]);

  const onLike = async () => {
    const newLiked = !liked;

    localStorage.setItem(slug, newLiked ? "true" : "false");
    const updatedLikes = newLiked ? (likes || 0) + 1 : (likes || 0) - 1;

    const { error } = await supabase
      .from("post")
      .update({ like_count: updatedLikes })
      .eq("post_id", slug);

    if (error) {
      console.error("Error updating like count:", error);
    } else {
      setLikes(updatedLikes);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex justify-center">
      <button
        onClick={onLike}
        type="button"
        className="flex items-center justify-center h-10 gap-2 overflow-hidden text-white transition-transform rounded-full like-button hover:cursor-default active:scale-95"
      >
        <Halo
          className="flex items-center justify-center gap-2 px-4"
          size={120}
          strength={30}
        >
          {liked ? <IconHeart /> : <IconHeartOutline />}{" "}
          {typeof likes === "undefined" ? (
            "--"
          ) : (
            <FlipNumber>{likes}</FlipNumber>
          )}
        </Halo>
      </button>
    </div>
  );
}
