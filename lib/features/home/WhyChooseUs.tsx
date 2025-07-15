import React from "react";
import { whyChooseUsData } from "@/lib/utils/data";
import { WhyChooseUsCard } from "@/lib/components/card";
import { SectionTitle } from "@/lib/components/heading";

const WhyChooseUs = () => {
  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] flex flex-col items-center xl:items-start gap-[15px] sm:gap-[30px] xl:gap-[45px]">
      <SectionTitle
        title="Why Choose FrenchCubaWedding?"
        className="max-w-[180px] sm:max-w-[400px] text-center xl:text-left"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-[16px] xl:gap-[24px]">
        {whyChooseUsData.map((card, index) => (
          <WhyChooseUsCard
            key={index}
            icon={card.icon}
            alt={card.alt}
            primaryLine={card.primaryLine}
            secondaryLine={card.secondaryLine}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
