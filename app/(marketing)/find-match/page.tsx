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

  // Combine into an object to pass as props
  const filterValues = {
    lookingFor,
    age: ageRange,
    height: heightRange,
    weight: weightRange,
    maritalStatus,
    haveChildren,
    religion,
    politicalView,
    country: countryLiving,
    languageSpoken: spokenLanguage,
    education,
    profession,
    monthlyIncome,
    livingArrangement,
    familyMember: familyMembers,
    hasPet: havePet,
    dietaryPreference,
    smokingHabit,
    drinkingHabit,
    healthCondition,
  };

  const getAllUsersData = await api.users.getAllUsers(
    page,
    pageSize,
    ageRange,
    heightRange,
    weightRange,
    lookingFor,
    maritalStatus,
    haveChildren === "true",
    monthlyIncome,
    religion,
    education,
    politicalView,
    countryLiving,
    spokenLanguage,
    profession,
    livingArrangement,
    familyMembers,
    havePet === "true",
    dietaryPreference,
    smokingHabit,
    drinkingHabit,
    healthCondition
  );

  return (
    <div className="w-full p-[18px] sm:px-[30px] lg:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] flex flex-col justify-between gap-[30px] lg:gap-[50px]">
      <AdvanceSearch page={page} />
      <MatchedProfilesList getAllUsersData={getAllUsersData} />
    </div>
  );
};

export default MatchFinderPage;
