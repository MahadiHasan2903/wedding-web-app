"use client";

import React from "react";
import usePurchasePackageStore from "@/lib/store/usePurchaseStore";

const PlanSummary = () => {
  const { msPackagePurchaseData } = usePurchasePackageStore();

  const sellPrice =
    msPackagePurchaseData?.membershipPackage.categoryInfo.sellPrice ?? 0;
  const category =
    msPackagePurchaseData?.membershipPackage.categoryInfo.category ?? "";

  return (
    <div className="w-full">
      <h3 className="text-[12px] lg:text-[24px] font-normal">
        Subscribe to Premium Plan
      </h3>
      <div className="w-full flex items-end my-[20px] lg:mt-[40px] lg:mb-[60px]">
        <p className="text-[32px] md:text-[42px] lg:text-[64px] font-normal leading-[100%]">
          ${sellPrice.toFixed(2)}
        </p>
        <p className="text-[10px] md:text-[14px] font-normal leading-[21px]">
          &nbsp;/ {category}
        </p>
      </div>
      <div className="w-full flex flex-col items-start">
        <div className="w-full flex flex-col gap-[12px] py-[20px] lg:py-[24px] border-b border-[#E0E0E0]">
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p>Yearly Premium Subscription</p>
            <p>${sellPrice.toFixed(2)}</p>
          </div>
          <p className="text-[10px] font-normal">Billed annually</p>
        </div>
        <div className="w-full flex flex-col gap-[12px] py-[20px] lg:py-[24px] border-b border-[#E0E0E0]">
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p>Subtotal</p>
            <p>${sellPrice.toFixed(2)}</p>
          </div>
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p className="text-[10px] font-normal">Tax</p>
            <p className="text-[10px] font-normal">0.00</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[12px] py-[20px] lg:py-[24px] border-b border-[#E0E0E0]">
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p>Total</p>
            <p>${sellPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
