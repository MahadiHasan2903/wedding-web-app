import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";

const LoginForm = dynamic(() => import("@/lib/features/auth/LoginForm"), {
  ssr: false,
});

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const LoginPage = async ({ searchParams }: PropsType) => {
  const callbackUrl = getQueryParam(searchParams, "callbackUrl", "");

  // Get user location details
  const userLocationDetails = await api.location.getUserLocationByIp();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[50px] px-[30px] lg:p-[50px]">
      <LoginForm
        callbackUrl={callbackUrl}
        userLocationDetails={userLocationDetails}
      />
    </div>
  );
};

export default LoginPage;
