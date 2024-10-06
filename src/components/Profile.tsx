// Profile.tsx
import React from "react";
import Image from "next/image";

type ProfileProps = {
  imageSrc: string;
  alt?: string;
  width?: number;
  height?: number;
};

const Profile: React.FC<ProfileProps> = ({
  imageSrc,
  alt = "Profile",
  width = 28,
  height = 28,
}) => {
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className="rounded-full mr-2  border border-primary"
    />
  );
};

export default Profile;
