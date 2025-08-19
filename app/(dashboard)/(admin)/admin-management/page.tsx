import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";

const AdminManagement = dynamic(
  () =>
    import("@/lib/features/dashboard/admin/admin-management/AdminManagement"),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const AdminManagementPage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));

  // Get the all user data based on the search parameters
  const allAdminData = await api.users.getAllAdmins(
    accessToken,
    page,
    pageSize
  );

  return (
    <div className="w-full h-full py-0 lg:py-[45px]">
      <AdminManagement allAdminData={allAdminData} />
    </div>
  );
};

export default AdminManagementPage;
