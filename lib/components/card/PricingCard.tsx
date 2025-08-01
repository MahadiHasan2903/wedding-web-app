"use client";

import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { HeadingLine } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { tickCircle, crown, star, heart } from "@/lib/components/image/icons";
import { msPackagePurchaseAction } from "@/lib/action/ms-purchase/msPurchase.action";
import usePurchasePackageStore from "@/lib/store/usePurchaseStore";

interface PropsType {
  id: number;
  title: string;
  description: string[];
  categoryInfo: {
    category: string;
    originalPrice: number;
    sellPrice: number;
  };
  loading: boolean;
  yearlySavingsPercentage: number | null;
  setLoadingPackageId: (id: number | null) => void;
  setPaymentFormOpen: Dispatch<SetStateAction<boolean>>;
}

const PricingCard = ({
  id,
  title,
  loading,
  description,
  categoryInfo,
  setPaymentFormOpen,
  setLoadingPackageId,
  yearlySavingsPercentage,
}: PropsType) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setMsPackagePurchaseData } = usePurchasePackageStore();

  // Extract the current user's purchased package ID from session
  const currentPackageId =
    session?.user.data.purchasedMembership.membershipPackageInfo.id;

  // Check if this card represents the user's current purchased package
  const isCurrent = currentPackageId === id;

  // Determine package category flags for conditional rendering
  const isYearly = categoryInfo.category === "yearly";
  const isLifeTime = categoryInfo.category === "life_time";

  // Determine unit of price display (monthly or yearly)
  const priceUnit = categoryInfo.category === "monthly" ? "month" : "year";

  // Define button and icon colors based on package ID (custom logic)
  const packageColor = id === 1 ? "black" : id === 2 ? "primary" : "red";

  // Assign corresponding icon to package based on ID
  const iconSrc = id === 1 ? star : id === 2 ? heart : crown;

  // Format the selling price to 2 decimal places for display
  const formattedPrice = categoryInfo.sellPrice.toFixed(2);

  // Handler function for initiating package purchase
  const handleMsPackagePurchaseInitialization = async () => {
    if (!session || !session.user.accessToken) {
      toast.error("Please log in to purchase a new membership plan.");
      router.push("/login");
      return;
    }

    // Prevent purchase if already current package or no current package info
    if (!currentPackageId || isCurrent) {
      return;
    }

    setLoadingPackageId(id);

    const payload = {
      msPackageId: id,
      purchasePackageCategory: categoryInfo.category,
    };

    // Call purchase action API
    const msPackagePurchaseResponse = await msPackagePurchaseAction(payload);

    if (!msPackagePurchaseResponse.status) {
      toast.error(msPackagePurchaseResponse.message);
    }

    if (msPackagePurchaseResponse.status && msPackagePurchaseResponse.data) {
      if (payload.msPackageId === 1) {
        toast.success(
          "Purchase Completed. Please log in again to see the updated changes."
        );
        router.push("/pricing/payment-success");
      } else {
        setMsPackagePurchaseData({
          membershipPackage:
            msPackagePurchaseResponse.data.membershipPackageInfo,
          msPackagePurchaseId: msPackagePurchaseResponse.data.id,
        });
        setPaymentFormOpen(true);
      }
    }

    // Reset loading state
    setLoadingPackageId(null);
  };

  return (
    <div className="w-[300px] xl:w-[380px] h-auto lg:min-h-[650px] relative flex flex-col items-start px-4 pt-4 pb-[50px] lg:pb-0 lg:p-[30px] gap-[25px] border border-[#B0B1B3] rounded-[10px] overflow-hidden">
      {isYearly && (
        <div className="hidden lg:block absolute right-0 top-[-10px] bg-topRectangle bg-no-repeat bg-center bg-contain text-white pl-[56px] pr-[21px] py-[16px]">
          Save {yearlySavingsPercentage}%
        </div>
      )}

      <div className="w-full flex flex-row lg:flex-col items-center lg:items-start justify-between gap-[10px] lg:gap-[25px]">
        <div className="w-full flex flex-col items-start gap-[10px] lg:gap-[25px]">
          <div
            className={`${
              id === 1 && "bg-black"
            } bg-${packageColor} flex items-center justify-center w-9 h-9 rounded-full p-2`}
          >
            <ImageWithFallback
              src={iconSrc}
              width={18}
              height={18}
              alt={title}
            />
          </div>
          <p className="text-sm sm:text-base lg:text-2xl font-semibold">
            {title}
          </p>
        </div>

        <div className="hidden lg:block">
          <HeadingLine color="primary" />
        </div>

        <div className="flex flex-col lg:flex-row items-end">
          <p className="text-[32px] md:text-[42px] lg:text-[64px] font-normal leading-[100%]">
            {formattedPrice}
          </p>
          {!isLifeTime && (
            <p className="text-[10px] md:text-[14px] font-normal leading-[21px]">
              &nbsp;/ {priceUnit}
            </p>
          )}
        </div>
      </div>

      <CommonButton
        label={
          loading
            ? "Processing Purchase..."
            : isCurrent
            ? "Current Plan"
            : "Choose Plan"
        }
        type="button"
        disabled={loading}
        onClick={handleMsPackagePurchaseInitialization}
        className={`w-full rounded-[5px] overflow-hidden border border-primaryBorder p-[12px] text-[14px] font-semibold ${
          isCurrent
            ? "bg-transparent text-black !cursor-not-allowed"
            : `bg-${packageColor} text-white cursor-pointer`
        }`}
      />

      <div className="w-full flex flex-col items-start gap-[13px]">
        <p className="text-[14px] font-semibold leading-[21px]">
          What's Included:
        </p>
        <div className="flex flex-col items-start gap-1">
          {description.map((desc, idx) => (
            <div className="flex items-center gap-1" key={idx}>
              <ImageWithFallback
                src={tickCircle}
                width={20}
                height={20}
                alt="check"
              />
              <p className="text-[14px] font-normal leading-[21px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {isYearly && (
        <div className="lg:hidden block absolute right-0 bottom-[-10px] bg-bottomRectangle bg-no-repeat bg-center bg-contain text-white pl-[56px] pr-[21px] py-[16px]">
          Save {yearlySavingsPercentage}%
        </div>
      )}
    </div>
  );
};

export default PricingCard;
