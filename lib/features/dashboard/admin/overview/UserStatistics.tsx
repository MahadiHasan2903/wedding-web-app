"use client";

import React from "react";
import { CardTitle } from "@/lib/components/heading";
import useLanguageStore from "@/lib/store/useLanguageStore";

const translations: Record<string, Record<string, string>> = {
  en: {
    totalUsers: "Total Users",
    active: "Active",
    inactive: "Inactive",
    banned: "Banned",
    vip: "Vip / Verified",
  },
  fr: {
    totalUsers: "Utilisateurs Totaux",
    active: "Actifs",
    inactive: "Inactifs",
    banned: "Bannis",
    vip: "Vip / Vérifié",
  },
  es: {
    totalUsers: "Usuarios Totales",
    active: "Activos",
    inactive: "Inactivos",
    banned: "Prohibidos",
    vip: "Vip / Verificado",
  },
};

interface PropsType {
  totalUserStats: {
    activeCount: number;
    inactiveCount: number;
    bannedCount: number;
    vipCount: number;
  };
}

const UserStatistics = ({ totalUserStats }: PropsType) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px]">
          <CardTitle title={t.totalUsers} />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-4 px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] gap-[16px] lg:gap-[25px]">
        <div className="flex flex-col items-start">
          <p className="text-[10px] lg:text-[14px] font-semibold">{t.active}</p>
          <h2 className="text-[24px] lg:text-[48px] font-normal">
            {totalUserStats.activeCount}
          </h2>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            {t.inactive}
          </p>
          <h2 className="text-[24px] lg:text-[48px] font-normal">
            {totalUserStats.inactiveCount}
          </h2>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[10px] lg:text-[14px] font-semibold">{t.banned}</p>
          <h2 className="text-[24px] lg:text-[48px] font-normal">
            {totalUserStats.bannedCount}
          </h2>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[10px] lg:text-[14px] font-semibold">{t.vip}</p>
          <h2 className="text-[24px] lg:text-[48px] font-normal">
            {totalUserStats.vipCount}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
