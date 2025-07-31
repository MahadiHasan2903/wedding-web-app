"use client";

import React, { Dispatch, SetStateAction } from "react";
import PlanSummary from "./PlanSummary";
import { RxCross1 } from "react-icons/rx";
import BillingDetails from "./BillingDetails";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PaymentFormModal = ({ open, setOpen }: PropsType) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="w-full max-w-[70%] rounded-[10px] bg-white p-[18px] lg:p-[60px] relative">
        <RxCross1
          onClick={() => setOpen(false)}
          size={20}
          className="absolute cursor-pointer right-5 top-5 text-red"
        />
        <div className="w-full flex items-start gap-[40px]">
          <PlanSummary />
          <div className="w-full">
            <div className="flex flex-col gap-[24px]">
              <h3 className="text-[20px] text-primary font-normal">
                Billing Details
              </h3>
              <BillingDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormModal;
