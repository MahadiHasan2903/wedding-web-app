"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import PlanSummary from "./PlanSummary";
import { RxCross1 } from "react-icons/rx";
import PaymentMethod from "./PaymentMethod";
import BillingDetails from "./BillingDetails";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  PAYPAL_CLIENT_ID?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
}

const PaymentFormModal = ({
  open,
  setOpen,
  PAYPAL_CLIENT_ID,
  STRIPE_PUBLISHABLE_KEY,
}: PropsType) => {
  const [selectedMethod, setSelectedMethod] = useState<
    "credit-card" | "paypal"
  >("paypal");

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="w-full max-w-[95%] lg:max-w-[70%] max-h-[800px] overflow-y-auto rounded-[10px] bg-white p-[18px] pt-[20px] lg:p-[60px] relative">
        <RxCross1
          onClick={() => setOpen(false)}
          size={20}
          className="absolute cursor-pointer right-5 top-5 text-red"
        />
        <div className="w-full flex flex-col lg:flex-row items-start gap-[24px] lg:gap-[40px]">
          <PlanSummary />
          <div className="w-full lg:pl-[35px] lg:border-l border-[#E0E0E0] flex flex-col gap-[30px] lg:gap-[40px]">
            <div className="flex flex-col gap-[24px]">
              <h3 className="text-[12px] lg:text-[20px] text-primary font-normal">
                Billing Details
              </h3>
              <BillingDetails
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            </div>
            <div className="flex flex-col gap-[24px]">
              <h3 className="text-[12px] lg:text-[20px] text-primary font-normal">
                Payment Method
              </h3>
              <PaymentMethod
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
                PAYPAL_CLIENT_ID={PAYPAL_CLIENT_ID}
                STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormModal;
