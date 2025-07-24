import React from "react";
import api from "@/lib/api";
import { getServerSessionData } from "@/lib/config/auth";
import BasicInfo from "@/lib/features/dashboard/user/profile/BasicInfo";
import ContactInfo from "@/lib/features/dashboard/user/profile/ContactInfo";
import BackgroundInfo from "@/lib/features/dashboard/user/profile/BackgroundInfo";
import PersonalAttributes from "@/lib/features/dashboard/user/profile/PersonalAttributes";
import RelationshipPreferences from "@/lib/features/dashboard/user/profile/RelationshipPreferences";

const page = async () => {
  const { accessToken } = await getServerSessionData();

  const loggedInUserProfile = await api.users.getLoggedInUserProfile(
    accessToken
  );

  return (
    <div className="w-full h-full flex flex-col gap-[30px] items-start py-0 lg:py-[30px]">
      <BasicInfo userProfile={loggedInUserProfile} />
      <ContactInfo userProfile={loggedInUserProfile} />
      <BackgroundInfo userProfile={loggedInUserProfile} />
      <RelationshipPreferences userProfile={loggedInUserProfile} />
      <PersonalAttributes userProfile={loggedInUserProfile} />
    </div>
  );
};

export default page;
