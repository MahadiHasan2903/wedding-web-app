"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  LivingArrangement,
  PoliticalView,
  ReligionPreference,
} from "@/lib/enums/users.enum";
import {
  UpdateUserType,
  updateUserSchema,
} from "@/lib/schema/user/user.schema";
import { toast } from "react-toastify";
import {
  UnderlineInput,
  UnderlineSelectField,
} from "@/lib/components/form-elements";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/user/user.types";
import { enumToOptions } from "@/lib/utils/helpers";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import { updateUserProfileAction } from "@/lib/action/user/user.action";
import useLanguageStore from "@/lib/store/useLanguageStore";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    lifestyleBackground: "Lifestyle & Background",
    education: "Education",
    institution: "Institution Name",
    profession: "Profession",
    company: "Company Name",
    monthlyIncome: "Monthly Income ($)",
    religion: "Religion / Beliefs",
    politicalView: "Political View",
    livingArrangement: "Living Arrangements",
    placeholderEducation: "Enter education qualification",
    placeholderInstitution: "Enter institution name",
    placeholderProfession: "Enter your profession",
    placeholderCompany: "Enter company name",
    placeholderMonthlyIncome: "Enter monthly income (USD)",
    placeholderReligion: "Select religion",
    placeholderPoliticalView: "Select political view",
    placeholderLivingArrangement: "Select living arrangement",
    save: "Save",
    saving: "Saving...",
    cancel: "Cancel",
  },
  fr: {
    lifestyleBackground: "Mode de vie & Contexte",
    education: "Éducation",
    institution: "Établissement",
    profession: "Profession",
    company: "Entreprise",
    monthlyIncome: "Revenu mensuel ($)",
    religion: "Religion / Croyances",
    politicalView: "Orientation politique",
    livingArrangement: "Situation de vie",
    placeholderEducation: "Entrez le niveau d'éducation",
    placeholderInstitution: "Entrez le nom de l'établissement",
    placeholderProfession: "Entrez votre profession",
    placeholderCompany: "Entrez le nom de l'entreprise",
    placeholderMonthlyIncome: "Entrez le revenu mensuel (USD)",
    placeholderReligion: "Sélectionnez la religion",
    placeholderPoliticalView: "Sélectionnez l'orientation politique",
    placeholderLivingArrangement: "Sélectionnez la situation de vie",
    save: "Enregistrer",
    saving: "Enregistrement...",
    cancel: "Annuler",
  },
  es: {
    lifestyleBackground: "Estilo de vida y antecedentes",
    education: "Educación",
    institution: "Institución",
    profession: "Profesión",
    company: "Empresa",
    monthlyIncome: "Ingreso mensual ($)",
    religion: "Religión / Creencias",
    politicalView: "Ideología política",
    livingArrangement: "Situación de vivienda",
    placeholderEducation: "Ingrese la educación",
    placeholderInstitution: "Ingrese el nombre de la institución",
    placeholderProfession: "Ingrese su profesión",
    placeholderCompany: "Ingrese el nombre de la empresa",
    placeholderMonthlyIncome: "Ingrese el ingreso mensual (USD)",
    placeholderReligion: "Seleccione la religión",
    placeholderPoliticalView: "Seleccione la ideología política",
    placeholderLivingArrangement: "Seleccione la situación de vivienda",
    save: "Guardar",
    saving: "Guardando...",
    cancel: "Cancelar",
  },
};

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

const BackgroundInfoUpdateForm = ({
  open,
  setOpen,
  userProfile,
}: PropsType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Current language
  const { language } = useLanguageStore();
  const t = translations[language];

  // Setup react-hook-form with Zod validation and initialize default values
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: userProfile.firstName ?? "",
      lastName: userProfile.lastName ?? "",
      highestEducation: userProfile.highestEducation ?? "",
      institutionName: userProfile.institutionName ?? "",
      profession: userProfile.profession ?? "",
      companyName: userProfile.companyName ?? "",
      monthlyIncome: userProfile.monthlyIncome ?? 0,
      religion: userProfile.religion ?? "",
      politicalView: userProfile.politicalView ?? "",
      livingArrangement: userProfile.livingArrangement ?? "",
    },
  });

  // Form submission handler for updating user profile
  const handleUpdateProfile = async (data: UpdateUserType) => {
    setLoading(true);

    const formData = new FormData();

    const fields: Partial<UpdateUserType> = {
      highestEducation: data.highestEducation,
      institutionName: data.institutionName,
      profession: data.profession,
      companyName: data.companyName,
      monthlyIncome: data.monthlyIncome,
      religion: data.religion,
      politicalView: data.politicalView,
      livingArrangement: data.livingArrangement,
    };

    // Append only non-empty values
    Object.entries(fields).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
      ) {
        formData.append(key, String(value));
      }
    });

    const updateProfileResponse = await updateUserProfileAction(formData);

    toast(updateProfileResponse.message, {
      type: updateProfileResponse.status ? "success" : "error",
    });

    if (updateProfileResponse.status) {
      setOpen(false);
      router.refresh();
    }

    setLoading(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="w-full h-full max-w-[600px] max-h-[550px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="w-full h-full flex flex-col gap-[25px]"
        >
          <CardTitle title={t.lifestyleBackground} />
          <div className="w-full h-full max-h-[400px] overflow-y-auto flex flex-col gap-[22px]">
            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <Controller
                name="highestEducation"
                control={control}
                defaultValue={userProfile.highestEducation ?? ""}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.education}
                    type="text"
                    name="highestEducation"
                    placeholder={t.placeholderEducation}
                    error={errors.highestEducation?.message}
                  />
                )}
              />
              <Controller
                name="institutionName"
                control={control}
                defaultValue={userProfile.institutionName ?? ""}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.institution}
                    type="text"
                    name="institutionName"
                    placeholder={t.placeholderInstitution}
                    error={errors.institutionName?.message}
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <Controller
                name="profession"
                control={control}
                defaultValue={userProfile.profession ?? ""}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.profession}
                    type="text"
                    name="profession"
                    placeholder={t.placeholderProfession}
                    error={errors.profession?.message}
                  />
                )}
              />
              <Controller
                name="companyName"
                control={control}
                defaultValue={userProfile.companyName ?? ""}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.company}
                    type="text"
                    name="companyName"
                    placeholder={t.placeholderCompany}
                    error={errors.companyName?.message}
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <div className="w-full md:w-1/2">
                <Controller
                  name="monthlyIncome"
                  control={control}
                  defaultValue={userProfile.monthlyIncome ?? 0}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label={t.monthlyIncome}
                      type="number"
                      name="monthlyIncome"
                      value={field.value === 0 ? "" : field.value}
                      placeholder={t.placeholderMonthlyIncome}
                      error={errors.monthlyIncome?.message}
                    />
                  )}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Controller
                  name="religion"
                  control={control}
                  defaultValue={userProfile.religion ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.religion}
                      name="religion"
                      options={enumToOptions(ReligionPreference)}
                      placeholder={t.placeholderReligion}
                    />
                  )}
                />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <div className="w-full md:w-1/2">
                <Controller
                  name="politicalView"
                  control={control}
                  defaultValue={userProfile.politicalView ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.politicalView}
                      name="politicalView"
                      options={enumToOptions(PoliticalView)}
                      placeholder={t.placeholderPoliticalView}
                    />
                  )}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Controller
                  name="livingArrangement"
                  control={control}
                  defaultValue={userProfile.livingArrangement ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.livingArrangement}
                      name="livingArrangement"
                      options={enumToOptions(LivingArrangement)}
                      placeholder={t.placeholderLivingArrangement}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Form submit and cancel buttons */}
          <div className="flex items-center gap-[30px] text-[14px]">
            <CommonButton
              type="submit"
              label={`${loading ? t.saving : t.save}`}
              disabled={loading}
              className="w-full bg-green text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
            />
            <CommonButton
              onClick={() => setOpen(false)}
              label={t.cancel}
              className="w-full bg-red text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackgroundInfoUpdateForm;
