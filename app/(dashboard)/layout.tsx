import React, { ReactNode } from "react";
import { Sidebar, Navbar } from "@/lib/components/layout/dashboard";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-full h-screen flex items-start gap-[24px] overflow-hidden p-2">
      <div className="w-full max-w-[275px] hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col items-start overflow-hidden">
        <Navbar />
        <div className="overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
