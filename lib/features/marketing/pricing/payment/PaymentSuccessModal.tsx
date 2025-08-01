"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { CommonButton } from "@/lib/components/buttons";
import { successful } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";

const PaymentSuccessModal = () => {
  const handleLogout = useCallback(async () => {
    await signOut({ callbackUrl: "/login" });
    toast.success("Logout Successfully");
  }, []);

  return (
    <div className="w-full max-w-[800px] flex flex-col items-center justify-center bg-white shadow-lg rounded-[10px]">
      <div className="w-full max-w-[600px] flex flex-col items-center justify-center text-center gap-[30px] p-[20px] sm:p-[40px] lg:p-[60px]">
        <ImageWithFallback
          src={successful}
          width={54}
          height={54}
          alt="successful"
        />
        <div className="flex flex-col items-center gap-[12px]">
          <h2 className="text-[24px] sm:text-[32px] lg:text-[48px] font-normal">
            Payment Successful
          </h2>
          <p className="text-[12px] sm:text-[16px] lg:text-[24px] font-normal">
            Thank you for your payment. To see the updates, please log in again.
          </p>
        </div>
        <CommonButton
          onClick={handleLogout}
          label="Go to Login"
          className="w-fit bg-primary text-white font-semibold px-[50px] py-[14px] text-[14px] rounded-[5px]"
        />
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
