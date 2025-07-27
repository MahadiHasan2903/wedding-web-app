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

const page = async () => {
  const { accessToken } = await getServerSessionData();

  const loggedInUserProfile = await api.users.getLoggedInUserProfile(
    accessToken
  );

  return (
    <div className="w-full h-full flex flex-col gap-[2px] lg:gap-[30px] items-start py-0 lg:py-[30px]">
      <BasicInfo userProfile={loggedInUserProfile} />
      <ContactInfo userProfile={loggedInUserProfile} />
      <BackgroundInfo userProfile={loggedInUserProfile} />
      <RelationshipPreferences userProfile={loggedInUserProfile} />
      <PersonalAttributes userProfile={loggedInUserProfile} />
      <CulturalIdentity userProfile={loggedInUserProfile} />
      <AdditionalPhotos userProfile={loggedInUserProfile} />
      <OtherInformation userProfile={loggedInUserProfile} />
    </div>
  );
};

export default page;
