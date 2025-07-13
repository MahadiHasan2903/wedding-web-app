import React from "react";
import { StaticImageData } from "next/image";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  story: {
    name: string;
    description: string;
    thumbnail: string | StaticImageData;
  };
}
8;

const StoryCard = ({ story }: PropsType) => {
  return (
    <div className="flex flex-col gap-[24px] w-[385px]">
      <div className="w-full h-[300px] relative overflow-hidden rounded-[10px]">
        <ImageWithFallback
          src={story.thumbnail}
          layout="fill"
          objectFit="cover"
          alt={story.name}
        />
      </div>
      <div className="bg-white px-[40px] py-[30px] rounded-[10px]">
        <h2 className="text-[24px] font-semibold">{story.name}</h2>
        <p className="text-[14px] font-normal leading-[21px] max-w-[260px]">
          {story.description}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
