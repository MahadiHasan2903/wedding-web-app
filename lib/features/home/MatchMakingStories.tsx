"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { stories } from "@/lib/utils/data";
import { StoryCard } from "@/lib/components/card";
import { quote } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const MatchMakingStories = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
    <div className="w-full px-[120px] py-[80px] bg-primary">
      <div className="w-full flex items-start gap-[60px]">
        <div className="w-full max-w-[820px]">
          <Slider ref={sliderRef} {...settings}>
            {stories.map((story, index) => (
              <div key={index}>
                <StoryCard story={story} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full">
          <div className="w-full h-full flex flex-col items-end justify-between">
            <div className="max-w-[341px] mb-[70px] flex flex-col gap-[25px] items-end justify-start text-white text-end">
              <ImageWithFallback
                src={quote}
                width={100}
                height={100}
                alt="quote"
              />
              <h1 className="text-[36px] font-semibold">
                Where Matches Turn Into Marriages
              </h1>
              <p className="text-[24px] font-normal">
                Discover how FrenchCubaWedding is creating beautiful beginnings
                for couples across cultures
              </p>
            </div>
            <div className="flex items-center gap-2">
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
    </div>
  );
};

export default MatchMakingStories;
