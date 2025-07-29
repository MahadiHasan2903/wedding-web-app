import React from "react";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/lib/features/auth/LoginForm"), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[50px] px-[30px] lg:p-[50px]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
