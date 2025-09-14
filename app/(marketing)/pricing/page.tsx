import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { FAQ, HeroBanner } from "@/lib/features/marketing/common";

import {
  PAYPAL_CLIENT_ID,
  STRIPE_PUBLISHABLE_KEY,
} from "@/lib/config/constants";

const MembershipPlans = dynamic(
  () => import("@/lib/features/marketing/pricing/MembershipPlans")
);

const PricingPage = async () => {
  const allMsPackages = await api.msPackage.getAllMsPackages();

  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroBanner titleKey="pricing" />
      <MembershipPlans
        allMsPackages={allMsPackages}
        PAYPAL_CLIENT_ID={PAYPAL_CLIENT_ID}
        STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY}
      />
      <FAQ />
    </div>
  );
};

export default PricingPage;
