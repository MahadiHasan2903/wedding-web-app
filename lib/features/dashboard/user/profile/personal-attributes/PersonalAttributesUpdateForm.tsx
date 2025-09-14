"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  BodyType,
  HasPet,
  SmokingHabit,
  DrinkingHabit,
  HealthCondition,
  DietaryPreference,
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
import useLanguageStore from "@/lib/store/useLanguageStore";
import { updateUserProfileAction } from "@/lib/action/user/user.action";

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Personal Attributes & Habits",
    height: "Height (cm)",
    weight: "Weight (kg)",
    bodyType: "Body Type",
    drinkingHabit: "Drinking Habit",
    smokingHabit: "Smoking Habit",
    dietaryPreference: "Dietary Preference",
    children: "Children",
    pets: "Pets",
    healthCondition: "Health Condition",
    save: "Save",
    cancel: "Cancel",
    placeholderHeight: "Enter your height",
    placeholderWeight: "Enter your weight",
    placeholderChildren: "Enter number of children",
  },
  fr: {
    title: "Caractéristiques personnelles et habitudes",
    height: "Taille (cm)",
    weight: "Poids (kg)",
    bodyType: "Type de corps",
    drinkingHabit: "Habitude de boire",
    smokingHabit: "Habitude de fumer",
    dietaryPreference: "Préférence alimentaire",
    children: "Enfants",
    pets: "Animaux domestiques",
    healthCondition: "État de santé",
    save: "Enregistrer",
    cancel: "Annuler",
    placeholderHeight: "Entrez votre taille",
    placeholderWeight: "Entrez votre poids",
    placeholderChildren: "Entrez le nombre d'enfants",
  },
  es: {
    title: "Atributos personales y hábitos",
    height: "Altura (cm)",
    weight: "Peso (kg)",
    bodyType: "Tipo de cuerpo",
    drinkingHabit: "Hábito de beber",
    smokingHabit: "Hábito de fumar",
    dietaryPreference: "Preferencia alimentaria",
    children: "Niños",
    pets: "Mascotas",
    healthCondition: "Condición de salud",
    save: "Guardar",
    cancel: "Cancelar",
    placeholderHeight: "Ingrese su altura",
    placeholderWeight: "Ingrese su peso",
    placeholderChildren: "Ingrese número de niños",
  },
};

interface PropsType {
  open: boolean;
  userProfile: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PersonalAttributesUpdateForm = ({
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
      heightCm: userProfile.heightCm ?? 0,
      weightKg: userProfile.weightKg ?? 0,
      bodyType: userProfile.bodyType ?? "",
      smokingHabit: userProfile.smokingHabit ?? "",
      drinkingHabit: userProfile.drinkingHabit ?? "",
      dietaryPreference: userProfile.dietaryPreference ?? "",
      children: userProfile.children ?? 0,
      healthCondition: userProfile.healthCondition ?? "",
      hasPet: userProfile.hasPet === true ? "yes" : "no",
    },
  });

  // Form submission handler for updating user profile
  const handleUpdateProfile = async (data: UpdateUserType) => {
    setLoading(true);

    const formData = new FormData();

    // Numeric fields
    if (data.heightCm != null)
      formData.append("heightCm", String(data.heightCm));
    if (data.weightKg != null)
      formData.append("weightKg", String(data.weightKg));
    if (data.children != null)
      formData.append("children", String(data.children));

    // Boolean field
    formData.append("hasPet", String(data.hasPet === "yes"));

    // String fields
    const fields: Partial<UpdateUserType> = {
      bodyType: data.bodyType,
      smokingHabit: data.smokingHabit,
      drinkingHabit: data.drinkingHabit,
      dietaryPreference: data.dietaryPreference,
      healthCondition: data.healthCondition,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value != null && String(value).trim() !== "")
        formData.append(key, String(value));
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
            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <Controller
                name="heightCm"
                control={control}
                defaultValue={userProfile.heightCm ?? 0}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.height}
                    type="number"
                    value={field.value === 0 ? "" : field.value}
                    placeholder={t.placeholderHeight}
                    error={errors.heightCm?.message}
                  />
                )}
              />
              <Controller
                name="weightKg"
                control={control}
                defaultValue={userProfile.weightKg ?? 0}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.weight}
                    type="number"
                    value={field.value === 0 ? "" : field.value}
                    placeholder={t.placeholderWeight}
                    error={errors.weightKg?.message}
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <div className="w-full md:w-1/2">
                <Controller
                  name="bodyType"
                  control={control}
                  defaultValue={userProfile.bodyType ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.bodyType}
                      options={enumToOptions(BodyType)}
                      placeholder={t.bodyType}
                    />
                  )}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Controller
                  name="healthCondition"
                  control={control}
                  defaultValue={userProfile.healthCondition ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.healthCondition}
                      options={enumToOptions(HealthCondition)}
                      placeholder={t.healthCondition}
                    />
                  )}
                />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <div className="w-full md:w-1/2">
                <Controller
                  name="drinkingHabit"
                  control={control}
                  defaultValue={userProfile.drinkingHabit ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.drinkingHabit}
                      options={enumToOptions(DrinkingHabit)}
                      placeholder={t.drinkingHabit}
                    />
                  )}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Controller
                  name="smokingHabit"
                  control={control}
                  defaultValue={userProfile.smokingHabit ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.smokingHabit}
                      options={enumToOptions(SmokingHabit)}
                      placeholder={t.smokingHabit}
                    />
                  )}
                />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <div className="w-full md:w-1/2">
                <Controller
                  name="dietaryPreference"
                  control={control}
                  defaultValue={userProfile.dietaryPreference ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.dietaryPreference}
                      options={enumToOptions(DietaryPreference)}
                      placeholder={t.dietaryPreference}
                    />
                  )}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Controller
                  name="hasPet"
                  control={control}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      value={String(field.value ?? "")}
                      label={t.pets}
                      options={enumToOptions(HasPet)}
                      placeholder={t.pets}
                    />
                  )}
                />
              </div>
            </div>

            <Controller
              name="children"
              control={control}
              defaultValue={userProfile.children ?? 0}
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label={t.children}
                  type="text"
                  value={field.value === 0 ? "" : field.value}
                  placeholder={t.placeholderChildren}
                  error={errors.children?.message}
                />
              )}
            />
          </div>

          {/* Submit & Cancel */}
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

export default PersonalAttributesUpdateForm;
