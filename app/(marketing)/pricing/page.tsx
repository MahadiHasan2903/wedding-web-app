import React from "react";
import { FAQ, HeroBanner } from "@/lib/features/marketing/common";
import { MembershipPlans } from "@/lib/features/marketing/pricing";
import api from "@/lib/api";

const PricingPage = async () => {
  const allMsPackages = await api.msPackage.getAllMsPackages();

  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroBanner title="Pricing" />
      <MembershipPlans allMsPackages={allMsPackages} />
      <FAQ />
    </div>
  );
};

export default PricingPage;
