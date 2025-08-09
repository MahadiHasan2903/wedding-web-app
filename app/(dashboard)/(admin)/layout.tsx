import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSessionData } from "@/lib/config/auth";

interface PropsType {
  children: ReactNode;
}

const AdminDashboardLayout = async ({ children }: Readonly<PropsType>) => {
  const { data } = await getServerSessionData();

  if (!data?.userRole || data.userRole !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
};

export default AdminDashboardLayout;
