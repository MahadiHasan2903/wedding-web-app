"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  UpdateUserType,
  updateUserSchema,
} from "@/lib/schema/user/user.schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/user/user.types";
import { enumToOptions } from "@/lib/utils/helpers";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { updateUserProfileAction } from "@/lib/action/user/user.action";
import { CulturalPractices, FamilyBackground } from "@/lib/enums/users.enum";
import { Textarea, UnderlineSelectField } from "@/lib/components/form-elements";

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Bio & Cultural Identity",
    aboutMe: "About me",
    familyBackground: "Family Background",
    culturalPractices: "Cultural Practices",
    save: "Save",
    cancel: "Cancel",
    placeholderBio: "Enter your bio",
  },
  fr: {
    title: "Bio et identité culturelle",
    aboutMe: "À propos de moi",
    familyBackground: "Contexte familial",
    culturalPractices: "Pratiques culturelles",
    save: "Enregistrer",
    cancel: "Annuler",
    placeholderBio: "Entrez votre bio",
  },
  es: {
    title: "Bio e identidad cultural",
    aboutMe: "Sobre mí",
    familyBackground: "Antecedentes familiares",
    culturalPractices: "Prácticas culturales",
    save: "Guardar",
    cancel: "Cancelar",
    placeholderBio: "Ingresa tu biografía",
  },
};

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

const CulturalIdentityUpdateForm = ({
  open,
  setOpen,
  userProfile,
}: PropsType) => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [loading, setLoading] = useState(false);

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
      bio: userProfile.bio ?? "",
      familyBackground: userProfile.familyBackground ?? "",
      culturalPractices: userProfile.culturalPractices ?? "",
    },
  });

  // Form submission handler for updating user profile
  const handleUpdateProfile = async (data: UpdateUserType) => {
    setLoading(true);

    const formData = new FormData();

    // Fields to append only if not empty
    const fields: Partial<UpdateUserType> = {
      bio: data.bio,
      familyBackground: data.familyBackground,
      culturalPractices: data.culturalPractices,
    };

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
      <div className="w-full h-full max-w-[600px] max-h-[600px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="w-full h-full flex flex-col gap-[25px]"
        >
          <CardTitle title={t.title} />
          <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
            <Controller
              name="bio"
              control={control}
              defaultValue={userProfile.bio ?? ""}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label={t.aboutMe}
                  rows={6}
                  placeholder={t.placeholderBio}
                  error={errors.bio?.message}
                  className="!p-[16px] bg-light text-[12px] lg:text-[14px]"
                />
              )}
            />

            <Controller
              name="familyBackground"
              control={control}
              defaultValue={userProfile.familyBackground ?? ""}
              render={({ field }) => (
                <UnderlineSelectField
                  {...field}
                  label={t.familyBackground}
                  name="familyBackground"
                  options={enumToOptions(FamilyBackground)}
                />
              )}
            />

            <Controller
              name="culturalPractices"
              control={control}
              defaultValue={userProfile.culturalPractices ?? ""}
              render={({ field }) => (
                <UnderlineSelectField
                  {...field}
                  label={t.culturalPractices}
                  name="culturalPractices"
                  options={enumToOptions(CulturalPractices)}
                />
              )}
            />
          </div>

          <div className="flex items-center gap-[30px] text-[14px]">
            <CommonButton
              type="submit"
              label={`${loading ? "Saving..." : t.save}`}
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

export default CulturalIdentityUpdateForm;
