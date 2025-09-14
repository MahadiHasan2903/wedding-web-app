"use client";

import React, { useEffect, useState } from "react";
import { CommonButton } from "@/lib/components/buttons";
import { Datepicker } from "@/lib/components/form-elements";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { formatDateString1 } from "@/lib/utils/date/dateUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  setIsFilterOpen: (isOpen: boolean) => void;
}

// translations object for multi-language support
const translations: Record<string, Record<string, string>> = {
  en: {
    date: "Date",
    reset: "Reset",
    apply: "Apply",
    startDate: "Start Date",
    endDate: "End Date",
  },
  fr: {
    date: "Date",
    reset: "Réinitialiser",
    apply: "Appliquer",
    startDate: "Date de début",
    endDate: "Date de fin",
  },
  es: {
    date: "Fecha",
    reset: "Restablecer",
    apply: "Aplicar",
    startDate: "Fecha de inicio",
    endDate: "Fecha de fin",
  },
};

const FilterReportDropdown = ({ setIsFilterOpen }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [endDate, setEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  // Initialize state based on search params
  useEffect(() => {
    const dateRange = searchParams.get("dateRange");

    if (dateRange) {
      const [start, end] = dateRange.split(" - ").map((d) => d.trim());
      setStartDate(start || "");
      setEndDate(end || "");
    }
  }, [searchParams]);

  // Function to apply filters and update the URL
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Add date range if both present
    if (startDate && endDate) {
      const start = formatDateString1(startDate);
      const end = formatDateString1(endDate);
      if (start && end) {
        params.set("dateRange", `${start} - ${end}`);
      }
    } else {
      params.delete("dateRange");
    }

    // Reset to first page
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  };

  // Function to reset all filters and update the URL
  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("dateRange");
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-[300px] absolute top-full right-0 mt-4 bg-white border border-light rounded-lg shadow-lg z-50">
      <div className="absolute w-[15px] h-[15px] bg-white rotate-45 right-8 -top-[8px] border-l border-t border-light" />
      <div className="w-full flex flex-col gap-[30px] p-[20px]">
        <div className="w-full flex flex-col gap-[20px]">
          {/* Date Filter */}
          <div className="w-full">
            <p className="text-[14px] font-semibold">{t.date}</p>
            <div className="w-full flex items-center gap-2">
              <Datepicker
                className="w-full cursor-pointer px-0 py-2 text-[12px] font-normal outline-none"
                title={t.startDate}
                value={startDate}
                onChange={(date: string) => setStartDate(date)}
              />
              <p className="mr-1">-</p>
              <Datepicker
                className="w-full cursor-pointer px-0 py-2 text-[12px] font-normal outline-none"
                title={t.endDate}
                value={endDate}
                onChange={(date: string) => setEndDate(date)}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 text-[12px] font-normal text-white">
          <CommonButton
            label={t.reset}
            className="w-full bg-red hover:bg-opacity-80 p-2 rounded-lg"
            onClick={handleResetFilters}
          />
          <CommonButton
            label={t.apply}
            className="w-full bg-primary hover:bg-opacity-80 p-2 rounded-lg"
            onClick={handleApplyFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterReportDropdown;
