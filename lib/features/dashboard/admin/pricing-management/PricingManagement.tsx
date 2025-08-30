"use client";

import React, { useMemo, useState } from "react";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import UpdateMsPackageForm from "./UpdateMsPackageForm";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";

interface PropsType {
  allMsPackages: MembershipPackage[];
}

// translations object for multi-language support
const translations: Record<string, Record<string, string>> = {
  en: {
    vipPlan: "Vip Plan",
    packageName: "Package Name",
    validity: "Validity",
    originalPrice: "Original Price",
    sellingPrice: "Selling Price",
    status: "Status",
    action: "Action",
    noPlanFound: "No plan found",
    days30: "30 Days",
    days365: "365 Days",
  },
  fr: {
    vipPlan: "Plan VIP",
    packageName: "Nom du package",
    validity: "Validité",
    originalPrice: "Prix original",
    sellingPrice: "Prix de vente",
    status: "Statut",
    action: "Action",
    noPlanFound: "Aucun plan trouvé",
    days30: "30 jours",
    days365: "365 jours",
  },
  es: {
    vipPlan: "Plan VIP",
    packageName: "Nombre del paquete",
    validity: "Validez",
    originalPrice: "Precio original",
    sellingPrice: "Precio de venta",
    status: "Estado",
    action: "Acción",
    noPlanFound: "No se encontró ningún plan",
    days30: "30 días",
    days365: "365 días",
  },
};

const PricingManagement = ({ allMsPackages }: PropsType) => {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<MembershipPackage | null>(null);

  // Memoized data to prevent unnecessary re-renders
  const data = useMemo(() => allMsPackages || [], [allMsPackages]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white rounded-none lg:rounded-[10px]">
        <div className="w-full py-[17px] lg:py-[25px] border-b-[1px] lg:border-b-[3px] border-light">
          <div className="w-full px-[17px] lg:px-[36px] flex items-center gap-6">
            <CardTitle title={t.vipPlan} className="shrink-0" />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  {t.packageName}
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  {t.validity}
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  {t.originalPrice}
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  {t.sellingPrice}
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  {t.status}
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  {t.action}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length <= 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-5 text-[14px] text-gray-500"
                  >
                    {t.noPlanFound}
                  </td>
                </tr>
              ) : (
                data
                  .filter((pack) => pack.categoryInfo.category !== "life_time")
                  .map((pack) => (
                    <tr
                      key={pack.id}
                      className="border-b-[1px] lg:border-b-[3px] border-light transition hover:bg-light"
                    >
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[150px]">
                        {pack.title}
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left capitalize whitespace-nowrap min-w-[100px]">
                        {pack.categoryInfo.category === "monthly"
                          ? t.days30
                          : t.days365}
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[200px]">
                        ${pack.categoryInfo.originalPrice}
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[120px]">
                        ${pack.categoryInfo.sellPrice}
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] capitalize whitespace-nowrap min-w-[140px]">
                        <div
                          className={`${
                            pack.status === "active"
                              ? "text-green bg-[#D0FFEF]"
                              : "text-red bg-[#FFE2E6]"
                          } w-fit flex items-center gap-1 text-[12px] font-normal rounded-full px-[15px] py-[6px]`}
                        >
                          <div
                            className={`${
                              pack.status === "active" ? "bg-green" : "bg-red"
                            } w-[5px] h-[5px] rounded-full`}
                          />
                          <p className="whitespace-nowrap">{pack.status}</p>
                        </div>
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[120px]">
                        <ImageWithFallback
                          src={editIcon}
                          width={15}
                          height={15}
                          alt="edit-icon"
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedPackage(pack);
                            setOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {open && selectedPackage && (
        <UpdateMsPackageForm
          open={open}
          setOpen={setOpen}
          msPackageDetails={selectedPackage}
        />
      )}
    </div>
  );
};

export default PricingManagement;
