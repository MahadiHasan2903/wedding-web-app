"use client";

import React, { useState } from "react";
import { formatLabel } from "@/lib/utils/helpers";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import RelationshipPreferencesUpdateForm from "./RelationshipPreferencesUpdateForm";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Relationship Preferences",
    editInfo: "Edit Info",
    interestedIn: "Interested In",
    lookingFor: "Looking For",
    ageRange: "Age Range Preferences",
    preferredNationality: "Preferred Nationality",
    religiousPreferences: "Religious Preferences",
    politicalPreference: "Political Preference",
    partnerExpectations: "Partner Expectations",
    nA: "N/A",
  },
  fr: {
    title: "Préférences relationnelles",
    editInfo: "Modifier les infos",
    interestedIn: "Intéressé(e) par",
    lookingFor: "Recherche",
    ageRange: "Préférences d'âge",
    preferredNationality: "Nationalité préférée",
    religiousPreferences: "Préférences religieuses",
    politicalPreference: "Préférence politique",
    partnerExpectations: "Attentes envers le partenaire",
    nA: "N/D",
  },
  es: {
    title: "Preferencias de relación",
    editInfo: "Editar información",
    interestedIn: "Interesado en",
    lookingFor: "Buscando",
    ageRange: "Preferencias de rango de edad",
    preferredNationality: "Nacionalidad preferida",
    religiousPreferences: "Preferencias religiosas",
    politicalPreference: "Preferencia política",
    partnerExpectations: "Expectativas de pareja",
    nA: "N/A",
  },
};

interface PropsType {
  userProfile: User;
  editable?: boolean;
}

const RelationshipPreferences = ({
  userProfile,
  editable = false,
}: PropsType) => {
  const [open, setOpen] = useState(false);

  // Current language
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title={t.title} />
          {editable && (
            <CommonButton
              label={t.editInfo}
              onClick={() => setOpen(true)}
              className="w-fit flex items-center gap-[8px] bg-transparent border border-primaryBorder text-black text-[10px] font-normal rounded-full p-[6px] lg:p-[10px]"
              startIcon={
                <ImageWithFallback
                  src={editIcon}
                  width={13}
                  height={13}
                  alt="edit-icon"
                />
              }
            />
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-[16px] lg:gap-[25px] px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px]">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.interestedIn}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.interestedInGender || t.nA}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.lookingFor}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.lookingFor || t.nA}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.ageRange}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.preferredAgeRange || t.nA}
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.preferredNationality}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.preferredNationality?.length
                ? userProfile.preferredNationality.join(", ")
                : t.nA}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.religiousPreferences}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.religionPreference) || t.nA}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.politicalPreference}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.politicalPreference) || t.nA}
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.partnerExpectations}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.partnerExpectations || t.nA}
            </p>
          </div>
        </div>
      </div>
      {open && (
        <RelationshipPreferencesUpdateForm
          open={open}
          setOpen={setOpen}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default RelationshipPreferences;
