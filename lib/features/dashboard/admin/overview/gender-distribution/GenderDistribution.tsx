"use client";

import React from "react";
import useLanguageStore from "@/lib/store/useLanguageStore";
import GenderDistributionChart from "./GenderDistributionChart";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    userTypeByGender: "User Type By Gender",
    activeByGender: "Active By Gender",
    inactiveByGender: "Inactive By Gender",
  },
  fr: {
    userTypeByGender: "Type d'utilisateur par sexe",
    activeByGender: "Actifs par sexe",
    inactiveByGender: "Inactifs par sexe",
  },
  es: {
    userTypeByGender: "Tipo de usuario por género",
    activeByGender: "Activos por género",
    inactiveByGender: "Inactivos por género",
  },
};

interface PropsType {
  genderDistributionStats: {
    male: number;
    female: number;
    other: number;
    active: {
      male: number;
      female: number;
      other: number;
    };
    inactive: {
      male: number;
      female: number;
      other: number;
    };
  };
}

const GenderDistribution = ({ genderDistributionStats }: PropsType) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full flex flex-wrap justify-between gap-16 px-[17px] lg:px-[36px] py-[25px]">
        {/* User Type By Gender */}
        <div className="w-full flex flex-col items-center justify-center gap-4 flex-1">
          <p className="w-full text-[14px] font-semibold text-center">
            {t.userTypeByGender}
          </p>

          <GenderDistributionChart
            male={genderDistributionStats.male}
            female={genderDistributionStats.female}
            other={genderDistributionStats.other}
          />
        </div>

        {/* Active By Gender */}
        <div className="w-full flex flex-col items-center justify-center gap-4 flex-1">
          <p className="w-full text-[14px] font-semibold text-center">
            {t.activeByGender}
          </p>

          <GenderDistributionChart
            male={genderDistributionStats.active.male}
            female={genderDistributionStats.active.female}
            other={genderDistributionStats.active.other}
          />
        </div>

        {/* Inactive By Gender */}
        <div className="w-full flex flex-col items-center justify-center gap-4 flex-1">
          <p className="w-full text-[14px] font-semibold text-center">
            {t.inactiveByGender}
          </p>

          <GenderDistributionChart
            male={genderDistributionStats.inactive.male}
            female={genderDistributionStats.inactive.female}
            other={genderDistributionStats.inactive.other}
          />
        </div>
      </div>
    </div>
  );
};

export default GenderDistribution;
