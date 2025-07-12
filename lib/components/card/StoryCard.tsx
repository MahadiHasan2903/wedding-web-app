import React from "react";
import { ImageWithFallback } from "@/lib/components/image";
import { StaticImageData } from "next/image";

interface PropsType {
  thumbnail: string | StaticImageData;
  name: string;
  description: string;
  alt?: string;
}

const StoryCard = ({ thumbnail, name, description, alt }: PropsType) => {
  return (
    <div className="flex flex-col gap-[24px] w-[385px]">
      <div className="w-full h-[300px] relative overflow-hidden rounded-[10px]">
        <ImageWithFallback
          src={thumbnail}
          layout="fill"
          objectFit="cover"
          alt={alt || name}
        />
      </div>
      <div className="bg-white px-[40px] py-[30px] rounded-[10px]">
        <h2 className="text-[24px] font-semibold">{name}</h2>
        <p className="text-[14px] font-normal leading-[21px] max-w-[260px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
