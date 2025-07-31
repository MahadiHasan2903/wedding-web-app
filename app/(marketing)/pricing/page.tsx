import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { FAQ, HeroBanner } from "@/lib/features/marketing/common";

const MembershipPlans = dynamic(
  () => import("@/lib/features/marketing/pricing/MembershipPlans")
);

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
