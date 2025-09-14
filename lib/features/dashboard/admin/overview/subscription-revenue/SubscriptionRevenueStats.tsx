"use client";

import React from "react";
import { CardTitle } from "@/lib/components/heading";
import useLanguageStore from "@/lib/store/useLanguageStore";
import SubscriptionRevenueChart from "./SubscriptionRevenueChart";
import { MonthlyRevenue } from "@/lib/types/analytics/analytics.types";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    subscriptionRevenue: "Subscription Revenue",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisQuarter: "This Quarter",
    total: "Total",
  },
  fr: {
    subscriptionRevenue: "Revenus d'Abonnement",
    thisWeek: "Cette Semaine",
    thisMonth: "Ce Mois",
    thisQuarter: "Ce Trimestre",
    total: "Total",
  },
  es: {
    subscriptionRevenue: "Ingresos por Suscripción",
    thisWeek: "Esta Semana",
    thisMonth: "Este Mes",
    thisQuarter: "Este Trimestre",
    total: "Total",
  },
};

interface PropsType {
  subscriptionRevenueStats: {
    total: number;
    thisWeek: number;
    thisMonth: number;
    thisQuarter: number;
    monthlyRevenue: MonthlyRevenue[];
  };
}

const SubscriptionRevenueStats = ({ subscriptionRevenueStats }: PropsType) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      {/* Header */}
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px]">
          <CardTitle title={t.subscriptionRevenue} />
        </div>
      </div>

      {/* Stats & Chart */}
      <div className="w-full flex flex-col gap-6 lg:gap-10 px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] ">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.thisWeek}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.thisWeek}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.thisMonth}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.thisMonth}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.thisQuarter}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.thisQuarter}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.total}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              ${subscriptionRevenueStats.total}
            </h2>
          </div>
        </div>

        {/* Chart */}
        <SubscriptionRevenueChart
          data={subscriptionRevenueStats.monthlyRevenue}
        />
      </div>
    </div>
  );
};

export default SubscriptionRevenueStats;
