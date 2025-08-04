import React, { ReactNode } from "react";
import {
  Sidebar,
  Navbar,
  BottomNavigation,
} from "@/lib/components/layout/dashboard";
import { SOCKET_ID } from "@/lib/config/constants";
import { getServerSessionData } from "@/lib/config/auth";
import { Header } from "@/lib/components/layout/marketing";
import { SocketProvider } from "@/lib/providers/SocketProvider";

interface PropsType {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: Readonly<PropsType>) => {
  const { data } = await getServerSessionData();

  return (
    <div className="w-full h-screen flex overflow-hidden gap-[24px] lg:p-[20px] relative">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <Navbar />
        <div className="w-full block lg:hidden">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto mb-[50px] lg:mb-0">
          <SocketProvider userId={data.id} SOCKET_ID={SOCKET_ID}>
            {children}
          </SocketProvider>
        </div>
      </div>

      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashboardLayout;
