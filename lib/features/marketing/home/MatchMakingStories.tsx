"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { stories } from "@/lib/utils/data";
import { StoryCard } from "@/lib/components/card";
import { quote } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { SectionTitle } from "@/lib/components/heading";

const MatchMakingStories = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full px-[18px] xl:px-[120px] py-[25px] md:py-[40px] xl:py-[80px] bg-primary">
      <div className="w-full flex flex-col-reverse xl:flex-row items-center  xl:items-start gap-[20px] xl:gap-[60px]">
        <div className="xl:hidden flex items-center gap-2 py-3">
          <button
            type="button"
            className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <RiArrowLeftSLine />
          </button>
          <button
            type="button"
            className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <RiArrowRightSLine />
          </button>
        </div>
        <div className="w-full max-w-[820px]">
          <Slider ref={sliderRef} {...settings}>
            {stories.map((story, index) => (
              <div key={index}>
                <StoryCard story={story} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full h-full flex flex-col item-center xl:items-end">
          <div className="max-w-full xl:max-w-[341px] mb-0 xl:mb-[70px] flex flex-col gap-[10px] xl:gap-[25px] items-center xl:items-end justify-start text-white text-center xl:text-end">
            <div className="w-[50px] xl:w-[100px] h-[50px] xl:h-[100px] relative overflow-hidden">
              <ImageWithFallback
                src={quote}
                fill
                className="object-contain"
                alt="quote"
              />
            </div>
            <SectionTitle
              title="Where Matches Turn Into Marriages"
              className="max-w-[250px] xl:max-w-full w-full"
            />
            <p className="mx-w-[320px] sm:max-w-[450px] xl:max-w-full w-full text-[10px] sm:text-[14px] xl:text-[24px] font-normal">
              Discover how FrenchCubaWedding is creating beautiful beginnings
              for couples across cultures
            </p>
          </div>
          <div className="hidden xl:flex items-center gap-2">
            <button
              type="button"
              className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <RiArrowLeftSLine />
            </button>
            <button
              type="button"
              className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <RiArrowRightSLine />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchMakingStories;
