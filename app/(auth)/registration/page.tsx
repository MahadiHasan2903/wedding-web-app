import React from "react";
import dynamic from "next/dynamic";

const RegistrationForm = dynamic(
  () => import("@/lib/features/auth/RegistrationForm"),
  {
    ssr: false,
  }
);

const RegistrationPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-[50px]">
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
