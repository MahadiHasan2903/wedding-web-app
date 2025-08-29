"use client";

import React, { useEffect, useState } from "react";
import {
  Gender,
  Religion,
  Profession,
  SmokingHabit,
  BooleanStatus,
  MaritalStatus,
  DrinkingHabit,
  PoliticalView,
  SpokenLanguage,
  HealthCondition,
  HighestEducation,
  LivingArrangement,
  DietaryPreference,
} from "@/lib/enums/users.enum";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";
import { AccountType } from "@/lib/enums/ms-package";
import { SubHeading } from "@/lib/components/heading";

import {
  RadioGroupField,
  NumberRangeField,
  OutlinedSelectField,
} from "@/lib/components/form-elements/advance-search";
import { CommonButton } from "@/lib/components/buttons";
import { findMatch } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { enumToOptions, rangeToString } from "@/lib/utils/helpers";

const translations = {
  en: {
    refineSearch: "Refine Your Search",
    searchButton: "Search For Matches",
    lookingFor: "Looking For",
    age: "Age",
    height: "Height",
    weight: "Weight",
    haveChildren: "Have Children",
    havePet: "Have Pet",
    maritalStatus: "Marital Status",
    religion: "Religion",
    politicalView: "Political View",
    country: "Country",
    city: "City",
    education: "Education",
    profession: "Profession",
    languageSpoken: "Language Spoken",
    monthlyIncome: "Monthly Income",
    dietaryPreference: "Dietary Preference",
    smokingHabit: "Smoking Habit",
    drinkingHabit: "Drinking Habit",
    healthCondition: "Health Condition",
    livingArrangement: "Living Arrangement",
    familyMembers: "Family Members",
    accountType: "Account Type",
    doesntMatter: "Doesn't Matter",
    unit: {
      age: "years",
      height: "cm",
      weight: "kg",
      income: "€",
    },
  },
  fr: {
    refineSearch: "Affiner votre recherche",
    searchButton: "Rechercher des correspondances",
    lookingFor: "Cherche",
    age: "Âge",
    height: "Taille",
    weight: "Poids",
    haveChildren: "A des enfants",
    havePet: "A un animal",
    maritalStatus: "État civil",
    religion: "Religion",
    politicalView: "Orientation politique",
    country: "Pays",
    city: "Ville",
    education: "Éducation",
    profession: "Profession",
    languageSpoken: "Langue parlée",
    monthlyIncome: "Revenu mensuel",
    dietaryPreference: "Préférences alimentaires",
    smokingHabit: "Habitude de fumer",
    drinkingHabit: "Habitude de boire",
    healthCondition: "État de santé",
    livingArrangement: "Situation de vie",
    familyMembers: "Membres de la famille",
    accountType: "Type de compte",
    doesntMatter: "Peu importe",
    unit: {
      age: "ans",
      height: "cm",
      weight: "kg",
      income: "€",
    },
  },
  es: {
    refineSearch: "Refina tu búsqueda",
    searchButton: "Buscar coincidencias",
    lookingFor: "Buscando",
    age: "Edad",
    height: "Altura",
    weight: "Peso",
    haveChildren: "Tiene hijos",
    havePet: "Tiene mascota",
    maritalStatus: "Estado civil",
    religion: "Religión",
    politicalView: "Visión política",
    country: "País",
    city: "Ciudad",
    education: "Educación",
    profession: "Profesión",
    languageSpoken: "Idioma hablado",
    monthlyIncome: "Ingresos mensuales",
    dietaryPreference: "Preferencias alimenticias",
    smokingHabit: "Hábito de fumar",
    drinkingHabit: "Hábito de beber",
    healthCondition: "Condición de salud",
    livingArrangement: "Arreglo de vivienda",
    familyMembers: "Miembros de la familia",
    accountType: "Tipo de cuenta",
    doesntMatter: "No importa",
    unit: {
      age: "años",
      height: "cm",
      weight: "kg",
      income: "€",
    },
  },
};

interface PropsType {
  page: number;
}

const AdvanceSearch = ({ page }: PropsType) => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];

  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.name,
  }));

  const [statesOptions, setStatesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [smokingHabit, setSmokingHabit] = useState("");
  const [drinkingHabit, setDrinkingHabit] = useState("");
  const [politicalView, setPoliticalView] = useState("");
  const [countryIsoCode, setCountryIsoCode] = useState("");
  const [languageSpoken, setLanguageSpoken] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [livingArrangement, setLivingArrangement] = useState("");
  const [ageRange, setAgeRange] = useState({ start: 0, end: 0 });
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [lookingFor, setLookingFor] = useState<Gender | string>("");
  const [hasPet, setHasPet] = useState<BooleanStatus | string>("");
  const [accountType, setAccountType] = useState<Gender | string>("");
  const [weightRange, setWeightRange] = useState({ start: 0, end: 0 });
  const [heightRange, setHeightRange] = useState({ start: 0, end: 0 });
  const [monthlyIncome, setMonthlyIncome] = useState({ start: 0, end: 0 });
  const [familyMembers, setFamilyMembers] = useState({ start: 0, end: 0 });
  const [haveChildren, setHaveChildren] = useState<BooleanStatus | string>("");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | string>(
    ""
  );

  // Load states when country changes
  useEffect(() => {
    if (countryIsoCode) {
      const states = State.getStatesOfCountry(countryIsoCode).map((state) => ({
        label: state.name,
        value: state.name,
      }));
      setStatesOptions(states);
      setCity("");
    } else {
      setStatesOptions([]);
      setCity("");
    }
  }, [countryIsoCode]);

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
      country,
      city,
      languageSpoken,
      education,
      profession,
      monthlyIncome: rangeToString(monthlyIncome),
      livingArrangement,
      familyMember: rangeToString(familyMembers),
      hasPet,
      dietaryPreference,
      smokingHabit,
      drinkingHabit,
      healthCondition,
      accountType,
    };

    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
        searchParams.set(key, value);
      }
    });

    // Push the URL with query params
    router.replace(`/find-match?page=${page}&${searchParams.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-[10px]">
      <div className="flex items-center justify-between pb-[16px] px-[20px] py-[27px]">
        <SubHeading title={t.refineSearch} />
        <CommonButton
          onClick={handleSearch}
          label={t.searchButton}
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] border-t-[3px] border-light py-[16px] px-[20px]">
          <RadioGroupField
            label={t.lookingFor}
            name="lookingFor"
            options={enumToOptions(Gender)}
            value={lookingFor}
            onChange={setLookingFor}
          />
          <NumberRangeField
            label={t.age}
            unit={t.unit.age}
            startValue={ageRange.start}
            endValue={ageRange.end}
            onChange={(start, end) => setAgeRange({ start, end })}
          />
          <NumberRangeField
            label={t.height}
            unit={t.unit.height}
            startValue={heightRange.start}
            endValue={heightRange.end}
            onChange={(start, end) => setHeightRange({ start, end })}
          />
          <NumberRangeField
            label={t.weight}
            unit={t.unit.weight}
            startValue={weightRange.start}
            endValue={weightRange.end}
            onChange={(start, end) => setWeightRange({ start, end })}
          />
        </div>

        {/* Section 2 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-[20px] xl:gap-[30px]">
            <RadioGroupField
              label={t.haveChildren}
              name="haveChildren"
              options={enumToOptions(BooleanStatus)}
              value={haveChildren}
              onChange={setHaveChildren}
            />
            <RadioGroupField
              label={t.havePet}
              name="has"
              options={enumToOptions(BooleanStatus)}
              value={hasPet}
              onChange={setHasPet}
            />
          </div>
          <RadioGroupField
            label={t.maritalStatus}
            name="maritalStatus"
            options={enumToOptions(MaritalStatus)}
            value={maritalStatus}
            onChange={setMaritalStatus}
          />
        </div>

        {/* Section 3 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <OutlinedSelectField
            label={t.religion}
            name="religion"
            options={enumToOptions(Religion)}
            value={religion}
            onChange={setReligion}
            placeholder={t.doesntMatter}
          />
          <OutlinedSelectField
            label={t.politicalView}
            name="politicalView"
            options={enumToOptions(PoliticalView)}
            value={politicalView}
            onChange={setPoliticalView}
            placeholder={t.doesntMatter}
          />
          <OutlinedSelectField
            name="country"
            label={t.country}
            value={country}
            options={countryOptions}
            onChange={(selected) => {
              setCountry(selected);
              const matchedCountry = Country.getAllCountries().find(
                (c) => c.name === selected
              );
              setCountryIsoCode(matchedCountry?.isoCode ?? "");
            }}
          />
          <OutlinedSelectField
            label={t.city}
            name="city"
            options={statesOptions}
            value={city}
            onChange={setCity}
            placeholder={t.doesntMatter}
            disabled={!country}
          />
        </div>

        {/* Section 4 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <OutlinedSelectField
            label={t.education}
            name="education"
            options={enumToOptions(HighestEducation)}
            value={education}
            onChange={setEducation}
            placeholder={t.doesntMatter}
          />
          <OutlinedSelectField
            label={t.profession}
            name="profession"
            options={enumToOptions(Profession)}
            value={profession}
            onChange={setProfession}
            placeholder={t.doesntMatter}
          />
          <OutlinedSelectField
            label={t.languageSpoken}
            name="languageSpoken"
            options={enumToOptions(SpokenLanguage)}
            value={languageSpoken}
            onChange={setLanguageSpoken}
            placeholder={t.doesntMatter}
          />
          <NumberRangeField
            label={t.monthlyIncome}
            unit={t.unit.income}
            startValue={monthlyIncome.start}
            endValue={monthlyIncome.end}
            onChange={(start, end) => setMonthlyIncome({ start, end })}
          />
        </div>

        {/* Section 5 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <OutlinedSelectField
            label={t.dietaryPreference}
            name="dietaryPreference"
            options={enumToOptions(DietaryPreference)}
            value={dietaryPreference}
            onChange={setDietaryPreference}
            placeholder={t.doesntMatter}
          />
          <OutlinedSelectField
            label={t.smokingHabit}
            name="smokingHabit"
            options={enumToOptions(SmokingHabit)}
            value={smokingHabit}
            onChange={setSmokingHabit}
            placeholder={t.doesntMatter}
          />
          <OutlinedSelectField
            label={t.drinkingHabit}
            name="drinkingHabit"
            options={enumToOptions(DrinkingHabit)}
            value={drinkingHabit}
            onChange={setDrinkingHabit}
            placeholder={t.doesntMatter}
          />
          <OutlinedSelectField
            label={t.healthCondition}
            name="healthCondition"
            options={enumToOptions(HealthCondition)}
            value={healthCondition}
            onChange={setHealthCondition}
            placeholder={t.doesntMatter}
          />
        </div>

        {/* Section 6 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[60px] border-t-[3px] border-light py-[16px] px-[20px]">
          <OutlinedSelectField
            label={t.livingArrangement}
            name="livingArrangement"
            options={enumToOptions(LivingArrangement)}
            value={livingArrangement}
            onChange={setLivingArrangement}
            placeholder={t.doesntMatter}
          />
          <NumberRangeField
            label={t.familyMembers}
            startValue={familyMembers.start}
            endValue={familyMembers.end}
            onChange={(start, end) => setFamilyMembers({ start, end })}
          />
          <RadioGroupField
            label={t.accountType}
            name="accountType"
            options={enumToOptions(AccountType)}
            value={accountType}
            onChange={setAccountType}
          />
        </div>
      </div>

      <div className="max-w-[300px] mx-auto my-5 sm:my-8">
        <CommonButton
          onClick={handleSearch}
          label={t.searchButton}
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
