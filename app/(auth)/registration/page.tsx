import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";

const RegistrationForm = dynamic(
  () => import("@/lib/features/auth/RegistrationForm"),
  {
    ssr: false,
  }
);

const RegistrationPage = async () => {
  // Get user location details
  const userLocationDetails = await api.location.getUserLocationByIp();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[50px] px-[30px] lg:p-[50px]">
      <RegistrationForm userLocationDetails={userLocationDetails} />
    </div>
  );
};

export default RegistrationPage;
