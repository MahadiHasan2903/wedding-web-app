"use client";
import React, { useState } from "react";
import { PricingCard } from "@/lib/components/card";
import { SectionTitle, HeadingLine } from "@/lib/components/heading";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";
import PaymentFormModal from "./payment/PaymentFormModal";

interface PropsType {
  allMsPackages: MembershipPackage[];
}

const MembershipPlans = ({ allMsPackages }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [loadingPackageId, setLoadingPackageId] = useState<number | null>(null);

  // Calculate the percentage savings if the user buys the yearly plan
  const getYearlySavingsPercentage = (): number | null => {
    const monthly = allMsPackages.find(
      (pkg) => pkg.categoryInfo.category === "monthly"
    );
    const yearly = allMsPackages.find(
      (pkg) => pkg.categoryInfo.category === "yearly"
    );

    if (!monthly || !yearly) {
      return null;
    }

    const monthlyCostPerYear = monthly.categoryInfo.sellPrice * 12;
    const yearlyCost = yearly.categoryInfo.sellPrice;
    const savings = monthlyCostPerYear - yearlyCost;
    const percentage = (savings / monthlyCostPerYear) * 100;
    return Math.round(percentage);
  };

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
        {allMsPackages
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((plan) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              title={plan.title}
              setPaymentFormOpen={setOpen}
              description={plan.description}
              categoryInfo={plan.categoryInfo}
              loading={loadingPackageId === plan.id}
              setLoadingPackageId={setLoadingPackageId}
              yearlySavingsPercentage={getYearlySavingsPercentage()}
            />
          ))}
      </div>
      {open && <PaymentFormModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default MembershipPlans;
