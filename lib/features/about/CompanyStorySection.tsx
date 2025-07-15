import React from "react";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";
import storyImage from "@/public/images/about/story.jpg";
import { ImageWithFallback } from "@/lib/components/image";

const CompanyStorySection = () => {
  return (
    <div className="w-full relative">
      <div className="w-full px-[120px] py-[80px]">
        <div className="max-w-[560px] flex flex-col items-start gap-[48px]">
          <SectionTitle title="Our Story" />
          <HeadingLine color="primary" />
          <p className="text-[14px]">
            At FrenchCubaWedding, we believe that love has no borders. Born from
            a passion for cultural connection and meaningful relationships, we
            created a platform that blends elegance, sincerity, and modern
            matchmaking — with a special touch inspired by the warmth of Cuban
            spirit and the romance of French charm.
          </p>
          <p className="text-[24px]">
            Whether you're in Paris, Havana, or anywhere in between,
            FrenchCubaWedding is a space where genuine people come together to
            build something real.
          </p>
        </div>
      </div>
      <div className="absolute top-[23%] right-0">
        <div className="w-[712px] h-[470px] relative overflow-hidden">
          <ImageWithFallback
            src={storyImage}
            layout="fill"
            objectFit="cover"
            alt="storyImage"
          />
        </div>
      </div>
      <div className="w-full px-[120px] py-[80px] bg-red text-white">
        <div className="w-full flex flex-col items-start gap-[48px]">
          <SectionTitle title="Our Mission" />
          <HeadingLine color="white" />
          <p className="text-[24px]">
            To connect sincere individuals from all backgrounds in a safe,
            respectful, and culturally rich environment helping them find
            lasting companionship built on trust, compatibility, and intent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyStorySection;
