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
    <div className="w-full h-screen flex overflow-hidden gap-[24px] lg:p-[20px] relative">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-0">
        <Navbar />
        <div className="w-full block lg:hidden">
          <Header />
        </div>
        <div className="flex-1 overflow-auto mb-[50px] lg:mb-0">{children}</div>
      </div>

      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashboardLayout;
