"use client";

import React from "react";
import { CardTitle } from "@/lib/components/heading";
import NewRegistrationChart from "./NewRegistrationChart";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { MonthlyRegistration } from "@/lib/types/analytics/analytics.types";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    newRegistrations: "New Registrations",
    last24Hours: "Last 24 Hours",
    last7Days: "Last 7 Days",
    last30Days: "Last 30 Days",
    last90Days: "Last 90 Days",
  },
  fr: {
    newRegistrations: "Nouvelles Inscriptions",
    last24Hours: "Dernières 24 heures",
    last7Days: "Derniers 7 jours",
    last30Days: "Derniers 30 jours",
    last90Days: "Derniers 90 jours",
  },
  es: {
    newRegistrations: "Nuevas Inscripciones",
    last24Hours: "Últimas 24 horas",
    last7Days: "Últimos 7 días",
    last30Days: "Últimos 30 días",
    last90Days: "Últimos 90 días",
  },
};

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
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      {/* Header */}
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px]">
          <CardTitle title={t.newRegistrations} />
        </div>
      </div>

      {/* Stats & Chart */}
      <div className="w-full flex flex-col gap-6 lg:gap-10 px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] ">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.last24Hours}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last24HoursCount}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.last7Days}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last7DaysCount}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.last30Days}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last30DaysCount}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.last90Days}
            </p>
            <h2 className="text-[24px] lg:text-[48px] font-normal">
              {newRegistrationStats.last90DaysCount}
            </h2>
          </div>
        </div>

        {/* Chart */}
        <NewRegistrationChart
          data={newRegistrationStats.monthlyRegistrations}
        />
      </div>
    </div>
  );
};

export default NewRegistrationStats;
