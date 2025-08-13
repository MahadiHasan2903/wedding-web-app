import React from "react";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";

const LoginForm = dynamic(() => import("@/lib/features/auth/LoginForm"), {
  ssr: false,
});

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: PropsType) => {
  const callbackUrl = getQueryParam(searchParams, "callbackUrl", "");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[50px] px-[30px] lg:p-[50px]">
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
};

export default LoginPage;
