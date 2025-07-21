import React from "react";
import { PricingCard } from "@/lib/components/card";
import { SectionTitle, HeadingLine } from "@/lib/components/heading";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";

interface PropsType {
  allMsPackages: MembershipPackage[];
}

const MembershipPlans = ({ allMsPackages }: PropsType) => {
  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:pt-[32px] xl:px-[120px] xl:pt-[80px]">
      <div className="w-full flex flex-col items-center lg:items-start gap-[14px] lg:gap-[48px]">
        <SectionTitle title="Membership Plans" />
        <div className="hidden lg:block">
          <HeadingLine color="primary" />
        </div>
        <div className="text-[12px] md:text-[14px] flex flex-col gap-[5px]">
          <p className="font-bold">
            Find real connections. Stand out with confidence.
          </p>
          <p>
            At FrenchCubaWedding, we believe in meaningful, long-term
            relationships. Our Premium Membership is designed to help serious
            individuals like you connect with genuine, like-minded partners —
            faster and with more confidence.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-[18px] lg:gap-[24px] my-[30px] lg:my-[50px] mx-auto">
        {allMsPackages.map((plan, idx) => (
          <PricingCard
            key={idx}
            id={plan.id}
            title={plan.title}
            description={plan.description}
            categoryInfo={plan.categoryInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipPlans;
