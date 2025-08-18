import React from "react";
import dynamic from "next/dynamic";

const ChangePassword = dynamic(
  () => import("@/lib/features/dashboard/user/settings/ChangePassword")
);

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-0 lg:gap-[30px] items-start py-0 lg:py-[45px]">
      <ChangePassword />
    </div>
  );
};

export default page;
