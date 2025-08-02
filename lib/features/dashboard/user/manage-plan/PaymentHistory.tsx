"use client";

import React, { useEffect, useMemo } from "react";
import { Pagination } from "@/lib/components/table";
import { CardTitle } from "@/lib/components/heading";
import { formatDateString3 } from "@/lib/utils/date/dateUtils";
import { PaymentTransaction } from "@/lib/types/payment/payment.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  allPaymentHistoriesData: {
    paymentHistories: PaymentTransaction[];
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

// Helper function to map package category to a readable label
const getPackageLabel = (category: string): string => {
  switch (category) {
    case "life_time":
      return "Free Package";
    case "monthly":
      return "Monthly Premium";
    case "yearly":
      return "Yearly Premium";
    default:
      return "Unknown";
  }
};

// Helper function to format numeric amount into USD currency
const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);

const PaymentHistory = ({ allPaymentHistoriesData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { currentPage, totalPages, prevPage, nextPage } =
    allPaymentHistoriesData.paginationInfo;

  // Memoize the data to prevent re-renders unless data changes
  const data = useMemo(
    () =>
      (allPaymentHistoriesData.paymentHistories || []).filter(
        (payment) => payment.servicePurchaseId.paymentStatus !== "pending"
      ),
    [allPaymentHistoriesData.paymentHistories]
  );

  // Generate URL with updated page query parameter
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Ensure the current page is synced to the URL when it isn't present
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
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] px-[17px] lg:px-[36px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <CardTitle title="Payment History" />
      </div>

      <div className="w-full h-full">
        <div className="max-w-[360px] sm:max-w-[640px] md:max-w-[768px] xl:max-w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                {[
                  "Date",
                  "Subscription Package",
                  "Payment Method",
                  "Amount",
                  "Status",
                  "",
                ].map((col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap text-[14px] font-medium px-[17px] lg:px-[36px] py-3 text-left"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-sm text-gray"
                  >
                    No payment history found.
                  </td>
                </tr>
              ) : (
                data.map((payment) => {
                  const purchase = payment.servicePurchaseId;
                  return (
                    <tr
                      key={payment.id}
                      className="border-b-[1px] lg:border-b-[3px] border-light hover:bg-light transition"
                    >
                      <td className="whitespace-nowrap px-[17px] lg:px-[36px] py-3 text-[14px]">
                        {formatDateString3(purchase.purchasedAt) || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-[17px] lg:px-[36px] py-3 text-[14px]">
                        {getPackageLabel(purchase.purchasePackageCategory)}
                      </td>
                      <td className="whitespace-nowrap px-[17px] lg:px-[36px] py-3 text-[14px] capitalize">
                        {payment.gateway}
                      </td>
                      <td className="whitespace-nowrap px-[17px] lg:px-[36px] py-3 text-[14px]">
                        {formatCurrency(Number(payment.payable))}
                      </td>
                      <td className="whitespace-nowrap px-[17px] lg:px-[36px] py-3 text-[14px] capitalize">
                        <div
                          className={`${
                            purchase.paymentStatus === "paid"
                              ? "text-green bg-[#D0FFEF]"
                              : "text-red bg-[#FFE2E6]"
                          } w-fit flex items-center gap-1 text-[12px] font-normal rounded-full px-[16px] py-[8px]`}
                        >
                          <div
                            className={`${
                              purchase.paymentStatus === "paid"
                                ? "bg-green"
                                : "bg-red"
                            } w-[5px] h-[5px] rounded-full`}
                          />
                          <p>{purchase.paymentStatus}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination with proper spacing */}
        <div className="w-full flex justify-center py-4">
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

export default PaymentHistory;
