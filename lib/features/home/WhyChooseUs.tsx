import React from "react";
import { whyChooseUsData } from "@/lib/utils/data";
import { WhyChooseUsCard } from "@/lib/components/card";

const WhyChooseUs = () => {
  return (
    <div className="w-full px-[120px] pt-[75px] pb-[85px] flex flex-col items-start gap-[45px] bg-white">
      <h2 className="text-[36px] font-semibold max-w-[400px]">
        Why Choose FrenchCubaWedding?
      </h2>
      <div className="flex items-start gap-[24px] flex-wrap">
        {whyChooseUsData.map((card, index) => (
          <WhyChooseUsCard
            key={index}
            icon={card.icon}
            alt={card.alt}
            titleLine1={card.titleLine1}
            titleLine2={card.titleLine2}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
