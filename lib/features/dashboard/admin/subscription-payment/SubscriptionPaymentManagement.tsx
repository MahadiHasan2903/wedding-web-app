"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Pagination } from "@/lib/components/table";
import { CardTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import FilterPaymentDropDown from "./FilterPaymentDropDown";
import { filter, avatar } from "@/lib/components/image/icons";
import { formatDateString3 } from "@/lib/utils/date/dateUtils";
import { PaymentTransaction } from "@/lib/types/payment/payment.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  allPaymentsData: {
    payments: PaymentTransaction[];
    paginationInfo: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
      totalPages: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
  };
}

const SubscriptionPaymentManagement = ({ allPaymentsData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { currentPage, totalPages, prevPage, nextPage } =
    allPaymentsData.paginationInfo;

  // Memoize the payment list to prevent unnecessary re-renders
  const data = useMemo(
    () => allPaymentsData.payments || [],
    [allPaymentsData.payments]
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate a URL with updated page query param
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Automatically sync the current page in URL if it's not present
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace(getUrlWithPage(currentPage));
    }
  }, [searchParams, currentPage, pathname, router]);

  // Handler to update route with selected page
  const handlePageChange = (page: number | null) => {
    if (page && page !== currentPage) {
      router.push(getUrlWithPage(page));
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white rounded-none lg:rounded-[10px]">
        <div className="w-full py-[17px] lg:py-[25px] border-b-[1px] lg:border-b-[3px] border-light">
          <div className="w-full px-[17px] lg:px-[36px] flex items-center gap-6">
            <div className="w-full flex items-center gap-6">
              <CardTitle title="Subscriptions" className="shrink-0" />
            </div>
            <div className="w-fit shrink-0 relative" ref={dropdownRef}>
              <CommonButton
                label="Filter Payments"
                className="w-fit flex shrink-0 items-center gap-[5px] hover:bg-light text-[12px] font-normal p-[8px] lg:p-[10px] rounded-full border border-primaryBorder"
                startIcon={
                  <ImageWithFallback
                    src={filter}
                    width={13}
                    height={13}
                    alt="filter"
                  />
                }
                onClick={() => setIsFilterOpen((prev) => !prev)}
              />

              {isFilterOpen && (
                <FilterPaymentDropDown setIsFilterOpen={setIsFilterOpen} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  User
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Package
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Purchase Date
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Method
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Payment Status
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
                    No subscription found
                  </td>
                </tr>
              ) : (
                data
                  .filter(
                    (subscription) => subscription.paymentStatus !== "pending"
                  )
                  .map((subscription) => (
                    <tr
                      key={subscription.id}
                      className="border-b-[1px] lg:border-b-[3px] border-light transition hover:bg-light"
                    >
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[150px]">
                        <div className="flex items-tart gap-4">
                          <div className="w-[45px] h-[45px] relative rounded-full bg-gray overflow-hidden border border-black">
                            <ImageWithFallback
                              src={subscription.user.profilePicture?.url}
                              fallBackImage={avatar}
                              alt="user"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col item-start gap-1">
                            <p>
                              {subscription.user.firstName}{" "}
                              {subscription.user.lastName}
                            </p>
                            <p>{subscription.user.email}</p>
                            <p>{subscription.user.phoneNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left capitalize whitespace-nowrap min-w-[100px]">
                        {subscription.servicePurchaseId
                          .purchasePackageCategory === "monthly"
                          ? "Monthly Premium"
                          : " Yearly Premium"}
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[200px]">
                        {formatDateString3(
                          subscription.servicePurchaseId.purchasedAt
                        )}
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[120px] capitalize">
                        {subscription.gateway === "stripe" ? "Card" : "Paypal"}
                      </td>
                      <td className="px-[17px] lg:px-[36px] py-3 text-[14px] capitalize whitespace-nowrap min-w-[140px]">
                        <div
                          className={`${
                            subscription.paymentStatus === "paid"
                              ? "text-green bg-[#D0FFEF]"
                              : "text-red bg-[#FFE2E6]"
                          } w-fit flex items-center gap-1 text-[12px] font-normal rounded-full px-[15px] py-[6px]`}
                        >
                          <div
                            className={`${
                              subscription.paymentStatus === "paid"
                                ? "bg-green"
                                : "bg-red"
                            } w-[5px] h-[5px] rounded-full`}
                          />
                          <p className="whitespace-nowrap">
                            {subscription.paymentStatus}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            onPageClick={(page) => handlePageChange(page)}
            onPrevClick={() => handlePageChange(prevPage)}
            onNextClick={() => handlePageChange(nextPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPaymentManagement;
