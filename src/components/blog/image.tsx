import Image from "next/image";
import cn from "clsx";

type CustomImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  breakout?: boolean;
  rounded?: boolean;
  priority?: boolean;
  center?: boolean;
  full?: boolean;
};

export default function CustomImage({
  src,
  width,
  height,
  alt,
  caption,
  breakout,
  rounded,
  priority,
  center,
  full,
}: CustomImageProps) {
  return (
    <div
      className={cn(
        "not-prose w-full",
        breakout ? "bg-tertiary" : "",
        (rounded || breakout) && "rounded-2xl overflow-hidden",
        center ? "flex justify-center" : ""
      )}
    >
      <figure className={cn("flex flex-col", breakout ? "gap-4" : "gap-2")}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className={cn("h-auto rounded-md overflow-hidden", {
            "w-full": full,
          })}
          priority={priority}
        />
        {caption && (
          <figcaption
            className={cn(
              "text-sm text-secondary",
              breakout && "max-w-[700px] px-6 w-full mx-auto "
            )}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
