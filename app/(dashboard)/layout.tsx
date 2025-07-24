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
    <div className="w-full h-screen flex overflow-hidden gap-[24px] lg:p-[40px]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-0">
        <Navbar />
        <div className="w-full block lg:hidden">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashboardLayout;
