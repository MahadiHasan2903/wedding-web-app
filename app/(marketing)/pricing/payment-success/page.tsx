import React from "react";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";

const PaymentSuccessModal = dynamic(
  () => import("@/lib/features/marketing/pricing/payment/PaymentSuccessModal"),
  {
    ssr: false,
  }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PaymentSuccessPage = ({ searchParams }: PropsType) => {
  const transactionId = Number(getQueryParam(searchParams, "transactionId", 1));

  return (
    <div className="w-full h-full flex items-center justify-center p-[32px] sm:p-[120px]">
      <PaymentSuccessModal />
    </div>
  );
};

export default PaymentSuccessPage;
