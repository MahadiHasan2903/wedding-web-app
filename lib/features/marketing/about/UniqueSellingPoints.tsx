import React from "react";
import { SectionTitle } from "@/lib/components/heading";
import { SellingPointCard } from "@/lib/components/card";
import { uniqueSellingPointsData } from "@/lib/utils/data";

const UniqueSellingPoints = () => {
  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] lg:py-[50px] xl:px-[120px] xl:py-[80px] flex flex-col items-center xl:items-start gap-[18px] xl:gap-[45px]">
      <SectionTitle
        title="What Makes Us Different?"
        className="max-w-full xl:max-w-[400px]"
      />

      <div className="flex items-start justify-center gap-[24px] flex-wrap">
        {uniqueSellingPointsData.map((card, index) => (
          <SellingPointCard
            key={index}
            icon={card.icon}
            alt={card.alt}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default UniqueSellingPoints;
