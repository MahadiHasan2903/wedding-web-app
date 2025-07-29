import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";

const AllRecommendedUsersList = dynamic(
  () =>
    import(
      "@/lib/features/dashboard/user/recommended-matches/AllRecommendedUsersList"
    ),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const RecommendedUsersPage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));

  const loggedInUserProfile = await api.users.getLoggedInUserProfile(
    accessToken
  );

  const allRecommendedUsersData = await api.users.getAllUsers(page, pageSize, {
    age: loggedInUserProfile.preferredAgeRange ?? undefined,
    lookingFor: loggedInUserProfile.interestedInGender ?? undefined,
  });

  const allLikedProfilesData = await api.users.getAllLikedUsers(
    accessToken,
    page,
    pageSize
  );

  // Create a Set of liked user IDs for quick lookup
  const likedUserIds = new Set(
    allLikedProfilesData.likedProfiles.map((user) => user.id)
  );

  // Filter recommended users: exclude those who are liked already and also filter out the currently logged in user
  const filteredRecommendedUsers = {
    ...allRecommendedUsersData,
    users: allRecommendedUsersData.users.filter(
      (user) => user.id !== loggedInUserProfile.id && !likedUserIds.has(user.id)
    ),
  };

  return (
    <div className="w-full h-full flex flex-col gap-[2px] lg:gap-[30px] items-start py-0 lg:py-[30px]">
      <AllRecommendedUsersList
        allRecommendedUsersData={filteredRecommendedUsers}
      />
    </div>
  );
};

export default RecommendedUsersPage;
