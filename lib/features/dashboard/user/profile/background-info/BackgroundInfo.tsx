"use client";

import React, { useState } from "react";
import { formatLabel } from "@/lib/utils/helpers";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import BackgroundInfoUpdateForm from "./BackgroundInfoUpdateForm";
import useLanguageStore from "@/lib/store/useLanguageStore";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    lifestyleBackground: "Lifestyle & Background",
    editInfo: "Edit Info",
    education: "Education",
    institution: "Institution",
    profession: "Profession",
    company: "Company",
    monthlyIncome: "Monthly Income",
    religion: "Religion / Beliefs",
    politicalView: "Political View",
    livingArrangement: "Living Arrangement",
    notAvailable: "N/A",
  },
  fr: {
    lifestyleBackground: "Mode de vie & Contexte",
    editInfo: "Modifier les informations",
    education: "Éducation",
    institution: "Établissement",
    profession: "Profession",
    company: "Entreprise",
    monthlyIncome: "Revenu mensuel",
    religion: "Religion / Croyances",
    politicalView: "Orientation politique",
    livingArrangement: "Situation de vie",
    notAvailable: "N/D",
  },
  es: {
    lifestyleBackground: "Estilo de vida y antecedentes",
    editInfo: "Editar información",
    education: "Educación",
    institution: "Institución",
    profession: "Profesión",
    company: "Empresa",
    monthlyIncome: "Ingreso mensual",
    religion: "Religión / Creencias",
    politicalView: "Ideología política",
    livingArrangement: "Situación de vivienda",
    notAvailable: "N/D",
  },
};

interface PropsType {
  userProfile: User;
  editable?: boolean;
}

const BackgroundInfo = ({ userProfile, editable }: PropsType) => {
  const [open, setOpen] = useState(false);

  // Get current language from global store
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title={t.lifestyleBackground} />
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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.education}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.highestEducation || t.notAvailable}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.institution}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.institutionName || t.notAvailable}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.profession}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.profession || t.notAvailable}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.company}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.companyName || t.notAvailable}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.monthlyIncome}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.monthlyIncome
                ? `$ ${userProfile.monthlyIncome}`
                : t.notAvailable}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.religion}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.religion || t.notAvailable}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.politicalView}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.politicalView) || t.notAvailable}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              {t.livingArrangement}
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.livingArrangement) || t.notAvailable}
            </p>
          </div>
        </div>
      </div>

      {open && (
        <BackgroundInfoUpdateForm
          open={open}
          setOpen={setOpen}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default BackgroundInfo;
