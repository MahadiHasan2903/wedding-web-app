import React from "react";
import { FAQ, HeroBanner } from "@/lib/features/common";
import { MembershipPlans } from "@/lib/features/pricing";

const PricingPage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroBanner title="Pricing" />
      <MembershipPlans />
      <FAQ />
    </div>
  );
};

export default PricingPage;
