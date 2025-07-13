import React from "react";
import { whyChooseUsData } from "@/lib/utils/data";
import { WhyChooseUsCard } from "@/lib/components/card";
import { SectionTitle } from "@/lib/components/heading";

const WhyChooseUs = () => {
  return (
    <div className="w-full px-[120px] py-[80px] flex flex-col items-start gap-[45px]">
      <SectionTitle
        title="Why Choose FrenchCubaWedding?"
        className="max-w-[400px]"
      />
      <div className="flex items-start gap-[24px] flex-wrap">
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
