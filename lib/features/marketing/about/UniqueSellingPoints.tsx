import React from "react";
import { SectionTitle } from "@/lib/components/heading";
import { SellingPointCard } from "@/lib/components/card";
import { uniqueSellingPointsData } from "@/lib/utils/data";

const UniqueSellingPoints = () => {
  return (
    <div className="w-full px-[120px] py-[80px] flex flex-col items-start gap-[45px]">
      <SectionTitle
        title="What Makes Us Different?"
        className="max-w-[400px]"
      />

      <div className="flex items-start gap-[24px] flex-wrap">
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
