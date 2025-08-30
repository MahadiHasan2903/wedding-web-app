import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";

const UserManagement = dynamic(
  () => import("@/lib/features/dashboard/admin/user-management/UserManagement"),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const AllUsersPage = async ({ searchParams }: PropsType) => {
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));
  const name = getQueryParam(searchParams, "name", "");
  const joined = getQueryParam(searchParams, "joined", "");
  const accountType = getQueryParam(searchParams, "accountType", "");
  const accountStatus = getQueryParam(searchParams, "accountStatus", "");

  // Get the all user data based on the search parameters
  const allUsersData = await api.users.getAllUsers(page, pageSize, {
    name,
    joined,
    accountStatus,
    accountType,
  });

  return (
    <div className="w-full h-full py-0 lg:py-[45px]">
      <UserManagement allUsersData={allUsersData} />
    </div>
  );
};

export default AllUsersPage;
