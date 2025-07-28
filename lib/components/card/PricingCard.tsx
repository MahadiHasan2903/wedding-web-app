"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { HeadingLine } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { tickCircle, crown, star, heart } from "@/lib/components/image/icons";

interface PropsType {
  id: number;
  title: string;
  description: string[];
  categoryInfo: {
    category: string;
    originalPrice: number;
    sellPrice: number;
  };
}

const PricingCard = ({ id, title, description, categoryInfo }: PropsType) => {
  const { data: session } = useSession();
  const isCurrent =
    session?.user.data.purchasedMembership.membershipPackageInfo.id === id;
  const isYearly = categoryInfo.category === "yearly";
  const isLifeTime = categoryInfo.category === "life_time";
  const priceUnit = categoryInfo.category === "monthly" ? "month" : "year";
  const packageColor = id === 1 ? "black" : id === 2 ? "primary" : "red";
  const iconSrc = id === 1 ? star : id === 2 ? heart : crown;
  const formattedPrice = categoryInfo.sellPrice.toFixed(2);

  return (
    <div className="w-[300px] xl:w-[380px] h-auto lg:min-h-[650px] relative flex flex-col items-start px-4 pt-4 pb-[50px] lg:pb-0 lg:p-[30px] gap-[25px] border border-[#B0B1B3] rounded-[10px] overflow-hidden">
      {isYearly && (
        <div className="hidden lg:block absolute right-0 top-[-10px] bg-topRectangle bg-no-repeat bg-center bg-contain text-white pl-[56px] pr-[21px] py-[16px]">
          Save {"40"}%
        </div>
      )}

      <div className="w-full flex flex-row lg:flex-col items-center lg:items-start justify-between gap-[10px] lg:gap-[25px]">
        <div className="w-full flex flex-col items-start gap-[10px] lg:gap-[25px]">
          <div
            className={`${
              id === 1 && "bg-black"
            } bg-${packageColor} flex items-center justify-center w-9 h-9 rounded-full p-2`}
          >
            <ImageWithFallback
              src={iconSrc}
              width={18}
              height={18}
              alt={title}
            />
          </div>
          <p className="text-sm sm:text-base lg:text-2xl font-semibold">
            {title}
          </p>
        </div>

        <div className="hidden lg:block">
          <HeadingLine color="primary" />
        </div>

        <div className="flex flex-col lg:flex-row items-end">
          <p className="text-[32px] md:text-[42px] lg:text-[64px] font-normal leading-[100%]">
            {formattedPrice}
          </p>
          {!isLifeTime && (
            <p className="text-[10px] md:text-[14px] font-normal leading-[21px]">
              &nbsp;/ {priceUnit}
            </p>
          )}
        </div>
      </div>

      <CommonButton
        label={isCurrent ? "Current Plan" : "Choose Plan"}
        type="button"
        className={`w-full rounded-[5px] overflow-hidden border border-primaryBorder p-[12px] text-[14px] font-semibold ${
          isCurrent
            ? "bg-transparent text-black"
            : `bg-${packageColor} text-white`
        }`}
      />

      <div className="w-full flex flex-col items-start gap-[13px]">
        <p className="text-[14px] font-semibold leading-[21px]">
          What's Included:
        </p>
        <div className="flex flex-col items-start gap-1">
          {description.map((desc, idx) => (
            <div className="flex items-center gap-1" key={idx}>
              <ImageWithFallback
                src={tickCircle}
                width={20}
                height={20}
                alt="check"
              />
              <p className="text-[14px] font-normal leading-[21px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {isYearly && (
        <div className="lg:hidden block absolute right-0 bottom-[-10px] bg-bottomRectangle bg-no-repeat bg-center bg-contain text-white pl-[56px] pr-[21px] py-[16px]">
          Save {"40"}%
        </div>
      )}
    </div>
  );
};

export default PricingCard;
