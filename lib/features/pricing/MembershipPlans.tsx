import React from "react";
import { membershipPlans } from "@/lib/utils/data";
import { PricingCard } from "@/lib/components/card";
import { SectionTitle, HeadingLine } from "@/lib/components/heading";

const MembershipPlans = () => {
  const currentPlan = "Free Forever";

  return (
    <div className="w-full px-[120px] pt-[80px]">
      <div className="w-full flex flex-col items-start gap-[48px]">
        <SectionTitle title="Membership Plans" />
        <HeadingLine color="primary" />
        <div className="text-[14px] flex flex-col gap-[5px]">
          <p className="font-bold">
            Find real connections. Stand out with confidence.
          </p>
          <br />
          <p>
            At FrenchCubaWedding, we believe in meaningful, long-term
            relationships. Our Premium Membership is designed to help serious
            individuals like you connect with genuine, like-minded partners —
            faster and with more confidence.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-[24px] flex-wrap my-[50px] ">
        {membershipPlans.map((plan, idx) => (
          <PricingCard
            key={idx}
            {...plan}
            isCurrent={currentPlan === plan.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipPlans;
