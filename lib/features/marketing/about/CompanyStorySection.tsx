import React from "react";
import storyImage from "@/public/images/about/story.jpg";
import { ImageWithFallback } from "@/lib/components/image";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const CompanyStorySection = () => {
  return (
    <div className="w-full relative">
      <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px]">
        <div className="max-w-full xl:max-w-[560px] flex flex-col items-center xl:items-start gap-[14px] sm:gap-[24px] xl:gap-[48px]">
          <SectionTitle title="Our Story" />
          <div className="hidden xl:block">
            <HeadingLine color="primary" />
          </div>
          <p className="text-[12px] sm:text-[14px] text-justify lg:text-left">
            At FrenchCubaWedding, we believe that love has no borders. Born from
            a passion for cultural connection and meaningful relationships, we
            created a platform that blends elegance, sincerity, and modern
            matchmaking — with a special touch inspired by the warmth of Cuban
            spirit and the romance of French charm.
          </p>
          <div className="block xl:hidden ">
            <div className="w-[240px] sm:w-[300px] xl:w-[712px] h-[160px] sm:h-[200px]  xl:h-[470px] relative overflow-hidden">
              <ImageWithFallback
                src={storyImage}
                fill
                className="object-cover"
                alt="storyImage"
              />
            </div>
          </div>
          <p className="text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[24px] text-justify lg:text-left">
            Whether you're in Paris, Havana, or anywhere in between,
            FrenchCubaWedding is a space where genuine people come together to
            build something real.
          </p>
        </div>
      </div>
      <div className="hidden xl:block absolute top-[23%] right-0">
        <div className="w-[240px] xl:w-[600px] h-[160px] xl:h-[470px] relative overflow-hidden">
          <ImageWithFallback
            src={storyImage}
            fill
            className="object-cover"
            alt="storyImage"
          />
        </div>
      </div>
      <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] bg-red text-white">
        <div className="w-full flex flex-col items-center xl:items-start gap-[14px] xl:gap-[48px]">
          <SectionTitle title="Our Mission" />
          <div className="hidden xl:block">
            <HeadingLine color="white" />
          </div>
          <p className="text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[24px] text-center lg:text-left">
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
