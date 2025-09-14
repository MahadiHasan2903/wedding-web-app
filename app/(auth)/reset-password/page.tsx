import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";

const ResetPasswordForm = dynamic(
  () => import("@/lib/features/auth/ResetPasswordForm"),
  {
    ssr: false,
  }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPassword = async ({ searchParams }: PropsType) => {
  // Get email and otp from query params
  const email = getQueryParam(searchParams, "email", "");
  const otp = getQueryParam(searchParams, "otp", "");

  // Get user location details
  const userLocationDetails = await api.location.getUserLocationByIp();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[50px] px-[30px] lg:p-[50px]">
      <ResetPasswordForm
        email={email}
        otp={otp}
        userLocationDetails={userLocationDetails}
      />
    </div>
  );
};

export default ResetPassword;
