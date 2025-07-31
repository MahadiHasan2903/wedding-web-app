import api from "@/lib/api";
import { getServerSessionData } from "@/lib/config/auth";
import { getQueryParam } from "@/lib/utils/helpers";
import dynamic from "next/dynamic";
import React from "react";

const AllBlockedUsers = dynamic(
  () => import("@/lib/features/dashboard/user/blocked-users/AllBlockedUsers"),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const AllBlockedUsersPage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  // Get the current page number as string, then parse to number with fallback
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));
  const name = getQueryParam(searchParams, "name", "");

  const allBlockedUsersData = await api.users.getAllBlockedUsers(
    accessToken,
    page,
    pageSize,
    name
  );

  return (
    <div className="w-full h-full py-0 lg:py-[45px]">
      <AllBlockedUsers allBlockedUsersData={allBlockedUsersData} />
    </div>
  );
};

export default AllBlockedUsersPage;
