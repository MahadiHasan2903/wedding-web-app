import React, { ReactNode } from "react";
import {
  Sidebar,
  Navbar,
  BottomNavigation,
} from "@/lib/components/layout/dashboard";
import { Header } from "@/lib/components/layout/marketing";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-full h-screen flex items-start gap-[24px] overflow-hidden lg:p-2">
      <Sidebar />
      <div className="w-full flex flex-col items-start overflow-hidden">
        <Navbar />
        <div className="w-full block lg:hidden">
          <Header />
        </div>
        <div className="overflow-y-auto px-[18px] lg:px-[26px] py-4">
          {children}
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashboardLayout;
