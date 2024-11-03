import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const HitCounter = ({ slug }: { slug: string }): JSX.Element => {
  const [hits, setHits] = useState<number | undefined>(undefined);

  useEffect(() => {
    // if (process.env.NODE_ENV !== "production") {
    //   return;
    // }

    const fetchAndUpdateHits = async () => {
      const { data: post, error: fetchError } = await supabase
        .from("post")
        .select("view_count")
        .eq("post_id", slug)
        .single();

      if (fetchError) {
        await supabase.from("post").insert({ post_id: slug, view_count: 1 });

        setHits(1);
      } else {
        const updatedViewCount = post.view_count + 1;
        await supabase
          .from("post")
          .update({ view_count: updatedViewCount })
          .eq("post_id", slug);

        setHits(updatedViewCount);
      }
    };

    fetchAndUpdateHits();
  }, [slug]);

  if (typeof hits === "undefined") {
    return <></>;
  }

  return (
    <>
      <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span> {hits} 읽음
    </>
  );
};

export default HitCounter;
