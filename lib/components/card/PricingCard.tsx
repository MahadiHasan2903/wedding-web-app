"use client";

import React from "react";
import { HeadingLine } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { tickCircle } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  icon: string;
  title: string;
  price: string;
  frequency?: string;
  features: string[];
  isCurrent?: boolean;
  color?: string;
  badge?: string;
}

const PricingCard = ({
  icon,
  title,
  price,
  frequency,
  features,
  isCurrent = false,
  color = "primary",
  badge,
}: PropsType) => {
  return (
    <div className="w-[300px] xl:w-[380px] h-auto lg:min-h-[650px] relative flex flex-col items-start px-[16px] pt-[16px] pb-[50px] lg:pb-0 lg:p-[30px] gap-[25px] border border-[#B0B1B3] rounded-[10px] overflow-hidden">
      {badge && (
        <div className="hidden lg:block absolute right-0 top-[-10px] bg-topRectangle bg-no-repeat bg-center bg-contain text-white pl-[56px] pr-[21px] py-[16px]">
          {badge}
        </div>
      )}

      <div className="w-full flex flex-row lg:flex-col items-center lg:items-start justify-between gap-[10px] lg:gap-[25px] ">
        <div className="w-full flex flex-col items-start gap-[10px] lg:gap-[25px]">
          <div
            className={`${
              frequency ? `bg-${color}` : "bg-black"
            } flex items-center justify-center w-[36px] h-[36px] rounded-full p-[8px]`}
          >
            <ImageWithFallback src={icon} width={18} height={18} alt={title} />
          </div>

          <p className="text-[12px] sm:text-[14px] lg:text-[24px] font-semibold">
            {title}
          </p>
        </div>
        <div className="hidden lg:block">
          <HeadingLine color="primary" />
        </div>

        <div className="flex flex-col lg:flex-row items-end">
          <p className="text-[32px] md:text-[42px] lg:text-[64px] font-normal leading-[100%]">
            {price}
          </p>
          {frequency && (
            <p className="text-[10px] md:text-[14px] font-normal leading-[21px]">
              &nbsp;/{frequency}
            </p>
          )}
        </div>
      </div>

      <CommonButton
        label={isCurrent ? "Current Plan" : "Choose Plan"}
        type="button"
        className={`${
          isCurrent
            ? "bg-transparent text-black"
            : color === "black"
            ? "!bg-black text-white"
            : `bg-${color} text-white`
        }


        w-full rounded-[5px] overflow-hidden border border-[#A1A1A1] p-[12px] text-[14px] font-semibold`}
      />

      <div className="w-full flex flex-col items-start gap-[13px] ">
        <p className="text-[14px] font-semibold leading-[21px]">
          What's Included:
        </p>
        <div className="flex flex-col items-start gap-1">
          {features.map((feature, idx) => (
            <div className="flex items-center gap-1" key={idx}>
              <ImageWithFallback
                src={tickCircle}
                width={20}
                height={20}
                alt="check"
              />
              <p className="text-[14px] font-normal leading-[21px]">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>

      {badge && (
        <div className="lg:hidden block absolute right-0 bottom-[-10px] bg-bottomRectangle bg-no-repeat bg-center bg-contain text-white pl-[56px] pr-[21px] py-[16px]">
          {badge}
        </div>
      )}
    </div>
  );
};

export default PricingCard;
