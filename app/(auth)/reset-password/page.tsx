import React from "react";
import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(
  () => import("@/lib/features/auth/ResetPasswordForm"),
  {
    ssr: false,
  }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPassword = ({ searchParams }: PropsType) => {
  // Determine the email, if provided
  const email =
    typeof searchParams.email === "string" &&
    searchParams.email.trim().length > 0
      ? searchParams.email
      : "";

  // Determine the otp, if provided
  const otp =
    typeof searchParams.otp === "string" && searchParams.otp.trim().length > 0
      ? searchParams.otp
      : "";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-[50px]">
      <ResetPasswordForm email={email} otp={otp} />
    </div>
  );
};

export default ResetPassword;
