import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";

const AdvanceSearch = dynamic(
  () =>
    import("@/lib/features/marketing/find-match").then(
      (mod) => mod.AdvanceSearch
    ),
  { ssr: false }
);

const MatchedProfilesList = dynamic(
  () =>
    import("@/lib/features/marketing/find-match").then(
      (mod) => mod.MatchedProfilesList
    ),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const MatchFinderPage = async ({ searchParams }: PropsType) => {
  // Get the current page number as string, then parse to number with fallback
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 50));

  //filter options
  const lookingFor = getQueryParam(searchParams, "lookingFor");
  const ageRange = getQueryParam(searchParams, "age");
  const heightRange = getQueryParam(searchParams, "height");
  const weightRange = getQueryParam(searchParams, "weight");
  const maritalStatus = getQueryParam(searchParams, "maritalStatus");
  const haveChildren = getQueryParam(searchParams, "haveChildren");
  const religion = getQueryParam(searchParams, "religion");
  const politicalView = getQueryParam(searchParams, "politicalView");
  const countryLiving = getQueryParam(searchParams, "country");
  const spokenLanguage = getQueryParam(searchParams, "languageSpoken");
  const education = getQueryParam(searchParams, "education");
  const profession = getQueryParam(searchParams, "profession");
  const monthlyIncome = getQueryParam(searchParams, "monthlyIncome");
  const livingArrangement = getQueryParam(searchParams, "livingArrangement");
  const familyMembers = getQueryParam(searchParams, "familyMember");
  const havePet = getQueryParam(searchParams, "hasPet");
  const dietaryPreference = getQueryParam(searchParams, "dietaryPreference");
  const smokingHabit = getQueryParam(searchParams, "smokingHabit");
  const drinkingHabit = getQueryParam(searchParams, "drinkingHabit");
  const healthCondition = getQueryParam(searchParams, "healthCondition");
  const accountType = getQueryParam(searchParams, "accountType");

  const allUsersData = await api.users.getAllUsers(page, pageSize, {
    age: ageRange ?? undefined,
    height: heightRange ?? undefined,
    weight: weightRange ?? undefined,
    lookingFor: lookingFor ?? undefined,
    maritalStatus: maritalStatus ?? undefined,
    hasChildren: haveChildren === "true" ? true : undefined,
    monthlyIncome: monthlyIncome ?? undefined,
    religion: religion ?? undefined,
    education: education ?? undefined,
    politicalView: politicalView ?? undefined,
    country: countryLiving ?? undefined,
    languageSpoken: spokenLanguage ?? undefined,
    profession: profession ?? undefined,
    livingArrangement: livingArrangement ?? undefined,
    familyMember: familyMembers ?? undefined,
    hasPet: havePet === "true" ? true : undefined,
    dietaryPreference: dietaryPreference ?? undefined,
    smokingHabit: smokingHabit ?? undefined,
    drinkingHabit: drinkingHabit ?? undefined,
    healthCondition: healthCondition ?? undefined,
    accountType: accountType ?? undefined,
  });

  // ✅ Filter out users with role 'admin'
  const filteredUsers = allUsersData.users.filter(
    (user) => user.userRole !== "admin"
  );

  // ✅ Create new object with updated user list
  const filteredAllUsersData = {
    ...allUsersData,
    users: filteredUsers,
  };

  return (
    <div className="w-full p-[18px] sm:px-[30px] lg:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] flex flex-col justify-between gap-[30px] lg:gap-[50px]">
      <AdvanceSearch page={page} />
      <MatchedProfilesList allUsersData={filteredAllUsersData} />
    </div>
  );
};

export default MatchFinderPage;
