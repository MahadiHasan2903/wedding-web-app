import React, { ReactNode } from "react";
import api from "@/lib/api";
import { redirect } from "next/navigation";
import { getServerSessionData } from "@/lib/config/auth";
import { hasActiveVipMembership } from "@/lib/utils/helpers";

interface PropsType {
  children: ReactNode;
}

const UserDashboardLayout = async ({ children }: Readonly<PropsType>) => {
  const { data } = await getServerSessionData();
  const isVipUser = hasActiveVipMembership(data);
  const userLocationDetails = await api.location.getUserLocationByIp();

  if (!data?.userRole || data.userRole !== "user") {
    redirect("/");
  }

  if (!isVipUser && userLocationDetails?.countryCode !== "CU") {
    redirect("/pricing");
  }

  return <>{children}</>;
};

export default UserDashboardLayout;
