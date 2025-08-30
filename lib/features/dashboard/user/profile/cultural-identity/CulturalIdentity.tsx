"use client";

import React, { useState } from "react";
import { formatLabel } from "@/lib/utils/helpers";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import CulturalIdentityUpdateForm from "./CulturalIdentityUpdateForm";

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Bio & Cultural Identity",
    aboutMe: "About me",
    familyBackground: "Family Background",
    culturalPractices: "Cultural Practices",
    editInfo: "Edit Info",
    placeholderNA: "N/A",
  },
  fr: {
    title: "Bio et identité culturelle",
    aboutMe: "À propos de moi",
    familyBackground: "Contexte familial",
    culturalPractices: "Pratiques culturelles",
    editInfo: "Modifier",
    placeholderNA: "N/A",
  },
  es: {
    title: "Bio e identidad cultural",
    aboutMe: "Sobre mí",
    familyBackground: "Antecedentes familiares",
    culturalPractices: "Prácticas culturales",
    editInfo: "Editar",
    placeholderNA: "N/A",
  },
};

interface PropsType {
  userProfile: User;
  editable?: boolean;
}

const CulturalIdentity = ({ userProfile, editable = false }: PropsType) => {
  const [open, setOpen] = useState(false);
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
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            {t.aboutMe}
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {userProfile.bio || t.placeholderNA}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            {t.familyBackground}
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {formatLabel(userProfile.familyBackground) || t.placeholderNA}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            {t.culturalPractices}
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {formatLabel(userProfile.culturalPractices) || t.placeholderNA}
          </p>
        </div>
      </div>

      {open && (
        <CulturalIdentityUpdateForm
          open={open}
          setOpen={setOpen}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default CulturalIdentity;
