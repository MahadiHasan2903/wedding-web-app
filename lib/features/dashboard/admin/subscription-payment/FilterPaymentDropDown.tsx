"use client";

import React, { useEffect, useState } from "react";
import { CommonButton } from "@/lib/components/buttons";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { Datepicker } from "@/lib/components/form-elements";
import { formatDateString1 } from "@/lib/utils/date/dateUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  setIsFilterOpen: (isOpen: boolean) => void;
}

// Translations
const translations = {
  en: {
    date: "Date",
    method: "Method",
    status: "Status",
    card: "Card",
    paypal: "Paypal",
    success: "Success",
    failed: "Failed",
    reset: "Reset",
    apply: "Apply",
  },
  fr: {
    date: "Date",
    method: "Méthode",
    status: "Statut",
    card: "Carte",
    paypal: "Paypal",
    success: "Succès",
    failed: "Échoué",
    reset: "Réinitialiser",
    apply: "Appliquer",
  },
  es: {
    date: "Fecha",
    method: "Método",
    status: "Estado",
    card: "Tarjeta",
    paypal: "Paypal",
    success: "Éxito",
    failed: "Fallido",
    reset: "Restablecer",
    apply: "Aplicar",
  },
};

const FilterPaymentDropDown = ({ setIsFilterOpen }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [gateway, setGateway] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  // Initialize state based on search params
  useEffect(() => {
    const dateRange = searchParams.get("dateRange");
    const gatewayParam = searchParams.get("gateway");
    const statusParam = searchParams.get("paymentStatus");

    if (dateRange) {
      const [start, end] = dateRange.split(" - ").map((d) => d.trim());
      setStartDate(start || "");
      setEndDate(end || "");
    }
    if (gatewayParam) setGateway(gatewayParam);
    if (statusParam) setPaymentStatus(statusParam);
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

    // Add gateway
    if (gateway) {
      params.set("gateway", gateway);
    } else {
      params.delete("gateway");
    }

    // Add status
    if (paymentStatus) {
      params.set("paymentStatus", paymentStatus);
    } else {
      params.delete("paymentStatus");
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
    setGateway("");
    setPaymentStatus("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("dateRange");
    params.delete("gateway");
    params.delete("paymentStatus");
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
                title="startDate"
                value={startDate}
                onChange={(date: string) => setStartDate(date)}
              />
              <p className="mr-1">-</p>
              <Datepicker
                className="w-full cursor-pointer px-0 py-2 text-[12px] font-normal outline-none"
                title="endDate"
                value={endDate}
                onChange={(date: string) => setEndDate(date)}
              />
            </div>
          </div>

          {/* Method Filter */}
          <div className="w-full flex flex-col gap-2 items-start">
            <p className="text-[14px] font-semibold">{t.method}</p>
            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-[30px]">
                <p className="text-[14px] font-normal">{t.card}</p>
                <input
                  type="checkbox"
                  checked={gateway === "stripe"}
                  onChange={() =>
                    setGateway(gateway === "stripe" ? "" : "stripe")
                  }
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-[30px]">
                <p className="text-[14px] font-normal">{t.paypal}</p>
                <input
                  type="checkbox"
                  checked={gateway === "paypal"}
                  onChange={() =>
                    setGateway(gateway === "paypal" ? "" : "paypal")
                  }
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full flex flex-col gap-2 items-start">
            <p className="text-[14px] font-semibold">{t.status}</p>
            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-[30px]">
                <p className="text-[14px] font-normal">{t.success}</p>
                <input
                  type="checkbox"
                  checked={paymentStatus === "paid"}
                  onChange={() =>
                    setPaymentStatus(paymentStatus === "paid" ? "" : "paid")
                  }
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-[30px]">
                <p className="text-[14px] font-normal">{t.failed}</p>
                <input
                  type="checkbox"
                  checked={paymentStatus === "failed"}
                  onChange={() =>
                    setPaymentStatus(paymentStatus === "failed" ? "" : "failed")
                  }
                  className="cursor-pointer"
                />
              </div>
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

export default FilterPaymentDropDown;
