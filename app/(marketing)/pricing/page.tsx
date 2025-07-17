import React from "react";
import { FAQ, HeroBanner } from "@/lib/features/marketing/common";
import { MembershipPlans } from "@/lib/features/marketing/pricing";

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
