import React from "react";
import dynamic from "next/dynamic";
import { CardTitle } from "@/lib/components/heading";
import { MonthlyRevenue } from "@/lib/types/analytics/analytics.types";
const SubscriptionRevenueChart = dynamic(
  () => import("./SubscriptionRevenueChart"),
  {
    ssr: false,
  }
);

interface PropsType {
  subscriptionRevenueStats: {
    thisWeek: number;
    thisMonth: number;
    thisQuarter: number;
    total: number;
    monthlyRevenue: MonthlyRevenue[];
  };
}

const SubscriptionRevenueStats = ({ subscriptionRevenueStats }: PropsType) => {
  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px]">
          <CardTitle title="Subscription Revenue" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 lg:gap-10 px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] ">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              This Week
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.thisWeek}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              This Month
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.thisMonth}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              This Quarter
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.thisQuarter}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">Total</p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.total}
            </h2>
          </div>
        </div>
        <SubscriptionRevenueChart
          data={subscriptionRevenueStats.monthlyRevenue}
        />
      </div>
    </div>
  );
};

export default SubscriptionRevenueStats;
