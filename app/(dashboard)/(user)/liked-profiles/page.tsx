import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";

const AllLikedProfileList = dynamic(
  () =>
    import("@/lib/features/dashboard/user/liked-profiles/AllLikedProfileList"),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const LikedProfilePage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  // Get the current page number as string, then parse to number with fallback
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));

  const allLikedProfilesData = await api.users.getAllLikedUsers(
    accessToken,
    page,
    pageSize
  );

  return (
    <div className="w-full h-full flex flex-col gap-[2px] lg:gap-[30px] items-start py-0 lg:py-[30px]">
      <AllLikedProfileList allLikedProfilesData={allLikedProfilesData} />
    </div>
  );
};

export default LikedProfilePage;
