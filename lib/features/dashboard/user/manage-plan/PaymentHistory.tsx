"use client";

import React from "react";
import { PaymentTransaction } from "@/lib/types/payment/payment.types";

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

const PaymentHistory = ({ allPaymentHistoriesData }: PropsType) => {
  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px] px-[18px] py-[12px] lg:px-[36px] lg:py-[20px]">
      PaymentHistory
    </div>
  );
};

export default PaymentHistory;
