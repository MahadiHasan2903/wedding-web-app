import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";

const PlanAndBilling = dynamic(
  () => import("@/lib/features/dashboard/user/manage-plan/PlanAndBilling")
);

const PaymentHistory = dynamic(
  () => import("@/lib/features/dashboard/user/manage-plan/PaymentHistory")
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManagePlanPage = async ({ searchParams }: PropsType) => {
  // Get the current page number as string, then parse to number with fallback
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));
  const { accessToken } = await getServerSessionData();

  const allPaymentHistoriesData =
    await api.payment.getLoggedInUserPaymentHistory(
      accessToken,
      page,
      pageSize
    );

  return (
    <div className="w-full h-full flex flex-col gap-0 lg:gap-[30px] items-start py-0 lg:py-[45px]">
      <PlanAndBilling />
      <PaymentHistory allPaymentHistoriesData={allPaymentHistoriesData} />
    </div>
  );
};

export default ManagePlanPage;
