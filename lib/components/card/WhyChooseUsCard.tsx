import React from "react";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  icon: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  alt?: string;
}

const WhyChooseUsCard = ({
  icon,
  titleLine1,
  titleLine2,
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
          <p className="text-[24px] font-normal">{titleLine1}</p>
          <p className="text-[24px] font-semibold">{titleLine2}</p>
        </div>
        <div className="w-[26px] h-[5px] bg-primary" />
        <p className="text-[14px] leading-[21px] font-normal">{description}</p>
      </div>
    </div>
  );
};

export default WhyChooseUsCard;
