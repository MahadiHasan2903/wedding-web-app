import React from "react";
import dynamic from "next/dynamic";
import { CardTitle } from "@/lib/components/heading";
import { MonthlyRegistration } from "@/lib/types/analytics/analytics.types";
const NewRegistrationChart = dynamic(() => import("./NewRegistrationChart"), {
  ssr: false,
});

interface PropsType {
  newRegistrationStats: {
    last24HoursCount: number;
    last7DaysCount: number;
    last30DaysCount: number;
    last90DaysCount: number;
    monthlyRegistrations: MonthlyRegistration[];
  };
}

const NewRegistrationStats = ({ newRegistrationStats }: PropsType) => {
  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px]">
          <CardTitle title="New Registrations" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 lg:gap-10 px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] ">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Last 24 Hours
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last24HoursCount}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Last 7 Days{" "}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last7DaysCount}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Last 30 Days
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last30DaysCount}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Last 90 Days
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last90DaysCount}
            </h2>
          </div>
        </div>
        <NewRegistrationChart
          data={newRegistrationStats.monthlyRegistrations}
        />
      </div>
    </div>
  );
};

export default NewRegistrationStats;
