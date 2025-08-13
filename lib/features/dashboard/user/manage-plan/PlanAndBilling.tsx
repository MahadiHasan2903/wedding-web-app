"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { CardTitle } from "@/lib/components/heading";
import { change } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { hasActiveVipMembership } from "@/lib/utils/helpers";
import { formatDateString2 } from "@/lib/utils/date/dateUtils";

const PlanAndBilling = () => {
  const { data: session } = useSession();
  const membership = session?.user?.data?.purchasedMembership;
  const packageInfo = membership?.membershipPackageInfo;
  const categoryInfo = packageInfo?.categoryInfo;

  const planType = categoryInfo?.category;
  const rawFee = categoryInfo?.sellPrice ?? 0;
  const packageFee = Number(rawFee).toFixed(2);
  const isVipUser = hasActiveVipMembership(session?.user.data);
  const expiryDate = formatDateString2(membership?.expiresAt);

  //Function to get plan label
  const getPlanLabel = () => {
    switch (planType) {
      case "life_time":
        return "Forever";
      case "monthly":
        return "Monthly";
      case "yearly":
        return "Yearly";
      default:
        return "Custom";
    }
  };

  //Function to get price prefix
  const getPriceSuffix = () => {
    switch (planType) {
      case "monthly":
        return "/month";
      case "yearly":
        return "/year";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title="Password & Security" />
          <CommonButton
            label="Change Plan"
            href="/pricing"
            className="w-fit hidden  md:flex items-center gap-[10px] bg-primary border border-primaryBorder text-white text-[14px] font-normal rounded-full px-[20px] py-[10px]"
            startIcon={
              <ImageWithFallback
                src={change}
                width={14}
                height={14}
                alt="edit-icon"
              />
            }
          />
        </div>
      </div>

      {/* Plan Summary */}
      <div className="w-full py-[17px] lg:py-[25px] px-[17px] lg:px-[36px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full flex flex-col item-start gap-[10px] md:gap-[25px]">
          <div className="w-full flex items-center gap-4 justify-between">
            <h3 className="text-[14px] font-semibold">Change Plan</h3>
            <CommonButton
              label="Change Plan"
              href="/pricing"
              className="w-fit md:hidden flex items-center gap-[10px] bg-primary border border-primaryBorder text-white text-[14px] font-normal rounded-full px-[20px] py-[10px]"
              startIcon={
                <ImageWithFallback
                  src={change}
                  width={14}
                  height={14}
                  alt="edit-icon"
                />
              }
            />
          </div>
          <div className="w-full flex flex-col md:flex-row items-start gap-[10px] md:gap-[40px]">
            {/* Plan Info Card */}
            <div className="w-full md:w-auto md:min-w-[300px] flex flex-col gap-[10px] rounded-[5px] px-[20px] py-[17px] lg:p-[20px] border border-primaryBorder">
              <div className="w-full flex items-center gap-[10px] md:gap-[40px]">
                <p className="text-[14px] font-normal text-primaryBorder shrink-0">
                  {getPlanLabel()} Plan
                </p>
                <div className="w-full flex items-center justify-end gap-[6px]">
                  {isVipUser && (
                    <CommonButton
                      label="Premium"
                      className="w-fit bg-vipHeavy text-white text-[10px] font-normal rounded-full px-[10px] py-[5px]"
                    />
                  )}
                  <div
                    className={`${
                      membership?.membershipPackageInfo.id === 1
                        ? "text-green bg-[#D0FFEF]"
                        : isVipUser
                        ? "text-green bg-[#D0FFEF]"
                        : "text-primaryBorder bg-gray"
                    } w-fit flex items-center gap-1 text-[10px] font-normal rounded-full px-[10px] py-[5px]`}
                  >
                    <div
                      className={`${
                        membership?.membershipPackageInfo.id === 1
                          ? "bg-green"
                          : isVipUser
                          ? "bg-green"
                          : "bg-primaryBorder"
                      } w-[5px] h-[5px] rounded-full`}
                    />
                    <p>
                      {membership?.membershipPackageInfo.id === 1
                        ? "Active"
                        : isVipUser
                        ? "Active"
                        : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="text-[14px] md:text-[20px] font-medium text-primary">
                ${packageFee}
                {getPriceSuffix()}
              </h3>
            </div>

            {/* Expiry Card */}
            <div className="w-full md:w-auto md:min-w-[300px] flex flex-col gap-[13px] rounded-[5px] p-[20px] border border-primaryBorder">
              <p className="text-[14px] font-normal text-primaryBorder">
                Renew at
              </p>
              <h3 className="text-[14px] md:text-[20px] font-medium text-primary">
                {expiryDate || "N/A"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAndBilling;
