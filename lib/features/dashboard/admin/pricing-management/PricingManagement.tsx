"use client";

import React, { useMemo, useState } from "react";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";
import UpdateMsPackageForm from "./UpdateMsPackageForm";

interface PropsType {
  allMsPackages: MembershipPackage[];
}

const PricingManagement = ({ allMsPackages }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<MembershipPackage | null>(null);
  const data = useMemo(() => allMsPackages || [], [allMsPackages]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white rounded-none lg:rounded-[10px]">
        <div className="w-full py-[17px] lg:py-[25px] border-b-[1px] lg:border-b-[3px] border-light">
          <div className="w-full px-[17px] lg:px-[36px] flex items-center gap-6">
            <CardTitle title="Vip Plan" className="shrink-0" />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Package Name
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Validity
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Original Price
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Selling Price
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Status
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length <= 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-5 text-[14px] text-gray-500"
                  >
                    No plan found
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
                          ? "30 Days"
                          : "365 Days"}
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
