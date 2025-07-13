import React from "react";
import { HeadingLine } from "@/lib/components/heading";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  icon: string;
  secondaryLine: string;
  primaryLine: string;
  description: string;
  alt?: string;
}

const WhyChooseUsCard = ({
  icon,
  secondaryLine,
  primaryLine,
  description,
  alt = "icon",
}: PropsType) => {
  return (
    <div className="w-full max-w-[384px] border border-[#B0B1B3] rounded-[10px] p-[40px] py-[35px]">
      <div className="bg-primary flex items-center justify-center w-[36px] h-[36px] rounded-full p-[8px] mb-[24px]">
        <ImageWithFallback src={icon} width={18} height={18} alt={alt} />
      </div>
      <div className="flex flex-col items-start gap-[15px]">
        <div>
          {secondaryLine && (
            <p className="text-[24px] font-normal">{secondaryLine}</p>
          )}
          <p className="text-[24px] font-semibold">{primaryLine}</p>
        </div>
        <HeadingLine color="primary" />

        <p className="text-[14px] leading-[21px] font-normal">{description}</p>
      </div>
    </div>
  );
};

export default WhyChooseUsCard;
