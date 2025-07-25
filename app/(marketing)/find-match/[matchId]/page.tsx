import React from "react";
import api from "@/lib/api";
import { getServerSessionData } from "@/lib/config/auth";
import BasicInfo from "@/lib/features/dashboard/user/profile/BasicInfo";
import ContactInfo from "@/lib/features/dashboard/user/profile/ContactInfo";
import BackgroundInfo from "@/lib/features/dashboard/user/profile/BackgroundInfo";
import CulturalIdentity from "@/lib/features/dashboard/user/profile/CulturalIdentity";
import OtherInformation from "@/lib/features/dashboard/user/profile/OtherInformation";
import PersonalAttributes from "@/lib/features/dashboard/user/profile/PersonalAttributes";
import RelationshipPreferences from "@/lib/features/dashboard/user/profile/RelationshipPreferences";

interface PropsType {
  params: {
    matchId: string;
  };
}

const page = async ({ params }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  const matchedUserProfile = await api.users.getUserDetails(
    params.matchId,
    accessToken
  );

  return (
    <div className="w-full p-[18px] sm:px-[30px] lg:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[60px]">
      <div className="w-full h-full flex flex-col gap-[2px] lg:gap-[30px] items-start ">
        <BasicInfo userProfile={matchedUserProfile} />
        <ContactInfo userProfile={matchedUserProfile} />
        <BackgroundInfo userProfile={matchedUserProfile} />
        <RelationshipPreferences userProfile={matchedUserProfile} />
        <PersonalAttributes userProfile={matchedUserProfile} />
        <CulturalIdentity userProfile={matchedUserProfile} />
        <OtherInformation userProfile={matchedUserProfile} />
      </div>
    </div>
  );
};

export default page;
