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
    <div className="flex flex-col gap-[24px] w-[230px] md:w-[385px] mx-3">
      <div className="w-[225px] sm:w-full h-[175px] sm:h-[300px] relative overflow-hidden rounded-[10px]">
        <ImageWithFallback
          src={story.thumbnail}
          fill
          className="object-cover"
          alt={story.name}
        />
      </div>
      <div className="bg-white p-[14px] xl:px-[40px] xl:py-[30px] rounded-[10px] min-h-[85px]">
        <h2 className="text-[24px] font-semibold">{story.name}</h2>
        <p className="text-[14px] font-normal leading-[21px] max-w-[260px]">
          {story.description}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
