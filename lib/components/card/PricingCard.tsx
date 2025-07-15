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
    <div className="w-[385px] min-h-[650px] relative flex flex-col items-start p-[30px] gap-[25px] border border-[#B0B1B3] my-[50px] rounded-[10px] overflow-hidden">
      {badge && (
        <div className="absolute right-0 top-[-10px] bg-rectangle bg-no-repeat bg-center bg-contain text-white pl-[56px] pr-[21px] py-[16px]">
          {badge}
        </div>
      )}

      <div
        className={`bg-${color} flex items-center justify-center w-[36px] h-[36px] rounded-full p-[8px]`}
      >
        <ImageWithFallback src={icon} width={18} height={18} alt={title} />
      </div>

      <p className="text-[24px] font-semibold">{title}</p>
      <HeadingLine color="primary" />

      <div className="flex items-end">
        <p className="text-[64px] font-normal leading-[100%]">{price}</p>
        {frequency && (
          <p className="text-[14px] font-normal leading-[21px]">
            &nbsp;/{frequency}
          </p>
        )}
      </div>

      <CommonButton
        label={isCurrent ? "Current Plan" : "Choose Plan"}
        type="button"
        className={`${
          isCurrent ? "bg-transparent" : `bg-${color} text-white`
        } w-full rounded-[5px] overflow-hidden border border-[#A1A1A1] p-[12px]`}
      />

      <div className="w-full flex flex-col items-start gap-[13px]">
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
    </div>
  );
};

export default PricingCard;
