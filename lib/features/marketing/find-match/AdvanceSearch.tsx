"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { enumToOptions, rangeToString } from "@/lib/utils/helpers";
import { SubHeading } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { findMatch } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import {
  Gender,
  Religion,
  Profession,
  SmokingHabit,
  DrinkingHabit,
  BooleanStatus,
  CountryLiving,
  MaritalStatus,
  PoliticalView,
  SpokenLanguage,
  HealthCondition,
  HighestEducation,
  LivingArrangement,
  DietaryPreference,
} from "@/lib/enums/users.enum";
import {
  SelectField,
  RadioGroupField,
  NumberRangeField,
} from "@/lib/components/form-elements/advance-search";
import { AccountType } from "@/lib/enums/ms-package";

const AdvanceSearch = () => {
  const router = useRouter();

  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [smokingHabit, setSmokingHabit] = useState("");
  const [drinkingHabit, setDrinkingHabit] = useState("");
  const [politicalView, setPoliticalView] = useState("");
  const [countryLiving, setCountryLiving] = useState("");
  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [livingArrangement, setLivingArrangement] = useState("");
  const [ageRange, setAgeRange] = useState({ start: 0, end: 0 });
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [lookingFor, setLookingFor] = useState<Gender | string>("");
  const [havePet, setHavePet] = useState<BooleanStatus | string>("");
  const [accountType, setAccountType] = useState<Gender | string>("");
  const [weightRange, setWeightRange] = useState({ start: 0, end: 0 });
  const [heightRange, setHeightRange] = useState({ start: 0, end: 0 });
  const [monthlyIncome, setMonthlyIncome] = useState({ start: 0, end: 0 });
  const [familyMembers, setFamilyMembers] = useState({ start: 0, end: 0 });
  const [haveChildren, setHaveChildren] = useState<BooleanStatus | string>("");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | string>(
    ""
  );

  const handleSearch = () => {
    const filters = {
      lookingFor,
      age: rangeToString(ageRange),
      height: rangeToString(heightRange),
      weight: rangeToString(weightRange),
      maritalStatus,
      haveChildren,
      religion,
      politicalView,
      country: countryLiving,
      languageSpoken: spokenLanguage,
      education,
      profession,
      monthlyIncome: rangeToString(monthlyIncome),
      livingArrangement,
      familyMember: rangeToString(familyMembers),
      hasPet: havePet,
      dietaryPreference,
      smokingHabit,
      drinkingHabit,
      healthCondition,
    };

    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
        searchParams.set(key, value);
      }
    });

    // Push the URL with query params
    router.replace(`/find-match?${searchParams.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-[10px]">
      <div className="flex items-center justify-between pb-[16px] px-[20px] py-[27px]">
        <SubHeading title="Refine Your Search" />
        <CommonButton
          onClick={handleSearch}
          label="Search For Matches"
          className="w-fit hidden lg:flex items-center gap-2 px-[24px] py-[12px] bg-primary text-white text-[14px] font-normal rounded-full"
          startIcon={
            <ImageWithFallback
              src={findMatch}
              width={15}
              height={15}
              alt="findMatch"
            />
          }
        />
      </div>

      <div className="w-full flex flex-col items-start text-black">
        {/* Section 1 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <RadioGroupField
            label="Looking For"
            name="lookingFor"
            options={enumToOptions(Gender)}
            value={lookingFor}
            onChange={setLookingFor}
          />
          <NumberRangeField
            label="Age"
            unit="years"
            startValue={ageRange.start}
            endValue={ageRange.end}
            onChange={(start, end) => setAgeRange({ start, end })}
          />
          <NumberRangeField
            label="Height"
            unit="cm"
            startValue={heightRange.start}
            endValue={heightRange.end}
            onChange={(start, end) => setHeightRange({ start, end })}
          />
          <NumberRangeField
            label="Weight"
            unit="kg"
            startValue={weightRange.start}
            endValue={weightRange.end}
            onChange={(start, end) => setWeightRange({ start, end })}
          />
        </div>

        {/* Section 2 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-[20px] xl:gap-[30px]">
            <RadioGroupField
              label="Have Children"
              name="haveChildren"
              options={enumToOptions(BooleanStatus)}
              value={haveChildren}
              onChange={setHaveChildren}
            />
            <RadioGroupField
              label="Have Pet"
              name="havePet"
              options={enumToOptions(BooleanStatus)}
              value={havePet}
              onChange={setHavePet}
            />
          </div>
          <RadioGroupField
            label="Marital Status"
            name="maritalStatus"
            options={enumToOptions(MaritalStatus)}
            value={maritalStatus}
            onChange={setMaritalStatus}
          />
        </div>

        {/* Section 3 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <SelectField
            label="Religion"
            name="religion"
            options={enumToOptions(Religion)}
            value={religion}
            onChange={setReligion}
            placeholder="Doesn't Matter"
          />
          <SelectField
            label="Political View"
            name="politicalView"
            options={enumToOptions(PoliticalView)}
            value={politicalView}
            onChange={setPoliticalView}
            placeholder="Doesn't Matter"
          />
          <SelectField
            label="Country Living in"
            name="countryLiving"
            options={enumToOptions(CountryLiving)}
            value={countryLiving}
            onChange={setCountryLiving}
            placeholder="Doesn't Matter"
          />
          <SelectField
            label="Language Spoken"
            name="spokenLanguage"
            options={enumToOptions(SpokenLanguage)}
            value={spokenLanguage}
            onChange={setSpokenLanguage}
            placeholder="Doesn't Matter"
          />
        </div>

        {/* Section 4 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <SelectField
            label="Education"
            name="education"
            options={enumToOptions(HighestEducation)}
            value={education}
            onChange={setEducation}
            placeholder="Doesn't Matter"
          />
          <SelectField
            label="Profession"
            name="profession"
            options={enumToOptions(Profession)}
            value={profession}
            onChange={setProfession}
            placeholder="Doesn't Matter"
          />
          <NumberRangeField
            label="Monthly Income"
            unit="€"
            startValue={monthlyIncome.start}
            endValue={monthlyIncome.end}
            onChange={(start, end) => setMonthlyIncome({ start, end })}
          />
        </div>

        {/* Section 5 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <SelectField
            label="Dietary Preference"
            name="dietaryPreference"
            options={enumToOptions(DietaryPreference)}
            value={dietaryPreference}
            onChange={setDietaryPreference}
            placeholder="Doesn't Matter"
          />
          <SelectField
            label="Smoking Habit"
            name="smokingHabit"
            options={enumToOptions(SmokingHabit)}
            value={smokingHabit}
            onChange={setSmokingHabit}
            placeholder="Doesn't Matter"
          />
          <SelectField
            label="Drinking Habit"
            name="drinkingHabit"
            options={enumToOptions(DrinkingHabit)}
            value={drinkingHabit}
            onChange={setDrinkingHabit}
            placeholder="Doesn't Matter"
          />
          <SelectField
            label="Health Condition"
            name="healthCondition"
            options={enumToOptions(HealthCondition)}
            value={healthCondition}
            onChange={setHealthCondition}
            placeholder="Doesn't Matter"
          />
        </div>

        {/* Section 6 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <SelectField
            label="Living Arrangement"
            name="livingArrangement"
            options={enumToOptions(LivingArrangement)}
            value={livingArrangement}
            onChange={setLivingArrangement}
            placeholder="Doesn't Matter"
          />

          <NumberRangeField
            label="Family Members"
            startValue={familyMembers.start}
            endValue={familyMembers.end}
            onChange={(start, end) => setFamilyMembers({ start, end })}
          />

          <RadioGroupField
            label="Account Type"
            name="accountType"
            options={enumToOptions(AccountType)}
            value={accountType}
            onChange={setAccountType}
          />
        </div>
      </div>
      <div className="max-w-[300px] mx-auto my-5  sm:my-8">
        <CommonButton
          onClick={handleSearch}
          label="Search For Matches"
          className="w-full lg:hidden flex items-center justify-center gap-2 px-[24px] py-[12px] bg-primary text-white text-[14px] font-normal rounded-full"
          startIcon={
            <ImageWithFallback
              src={findMatch}
              width={15}
              height={15}
              alt="findMatch"
            />
          }
        />
      </div>
    </div>
  );
};

export default AdvanceSearch;
