import React from "react";
import api from "@/lib/api";
import { getServerSessionData } from "@/lib/config/auth";
import BasicInfo from "@/lib/features/dashboard/user/profile/basic-info/BasicInfo";
import ContactInfo from "@/lib/features/dashboard/user/profile/contact-info/ContactInfo";
import OtherInformation from "@/lib/features/dashboard/user/profile/other-info/OtherInformation";
import BackgroundInfo from "@/lib/features/dashboard/user/profile/background-info/BackgroundInfo";
import AdditionalPhotos from "@/lib/features/dashboard/user/profile/additionalPhotos/AdditionalPhotos";
import CulturalIdentity from "@/lib/features/dashboard/user/profile/cultural-identity/CulturalIdentity";
import PersonalAttributes from "@/lib/features/dashboard/user/profile/personal-attributes/PersonalAttributes";
import RelationshipPreferences from "@/lib/features/dashboard/user/profile/relationship-preferences/RelationshipPreferences";

interface PropsType {
  params: {
    userId: string;
  };
}

const UserDetailsPage = async ({ params }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  const userDetails = await api.users.getUserDetails(
    params.userId,
    accessToken
  );

  return (
    <div className="w-full h-full flex flex-col gap-[2px] lg:gap-[30px] items-start py-0 lg:py-[45px]">
      <BasicInfo userProfile={userDetails} />
      <ContactInfo userProfile={userDetails} />
      <BackgroundInfo userProfile={userDetails} />
      <RelationshipPreferences userProfile={userDetails} />
      <PersonalAttributes userProfile={userDetails} />
      <CulturalIdentity userProfile={userDetails} />
      <AdditionalPhotos userProfile={userDetails} />
      <OtherInformation userProfile={userDetails} />
    </div>
  );
};

export default UserDetailsPage;
