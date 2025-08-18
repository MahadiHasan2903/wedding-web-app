import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";

const SubscriptionPaymentManagement = dynamic(
  () =>
    import(
      "@/lib/features/dashboard/admin/subscription-payment/SubscriptionPaymentManagement"
    ),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const SubscriptionPaymentPage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));
  const gateway = getQueryParam(searchParams, "gateway", "");
  const paymentStatus = getQueryParam(searchParams, "paymentStatus", "");
  const dateRange = getQueryParam(searchParams, "dateRange", "");

  // Get the all user data based on the search parameters
  const allPaymentsData = await api.payment.getAllPayments(
    accessToken,
    page,
    pageSize,
    {
      gateway,
      paymentStatus,
      dateRange,
    }
  );

  return (
    <div className="w-full h-full py-0 lg:py-[45px]">
      <SubscriptionPaymentManagement allPaymentsData={allPaymentsData} />
    </div>
  );
};

export default SubscriptionPaymentPage;
