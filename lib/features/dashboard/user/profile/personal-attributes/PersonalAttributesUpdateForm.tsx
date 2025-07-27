"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  BodyType,
  HasPet,
  DietaryPreference,
  DrinkingHabit,
  HealthCondition,
  SmokingHabit,
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

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

const PersonalAttributesUpdateForm = ({
  open,
  setOpen,
  userProfile,
}: PropsType) => {
  const router = useRouter();
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

    // Prepare form data to send to the API
    const formData = new FormData();
    formData.append("heightCm", String(data.heightCm));
    formData.append("weightKg", String(data.weightKg));
    formData.append("children", String(data.children) ?? "");
    formData.append("hasPet", String(data.hasPet === "yes"));
    formData.append("bodyType", data.bodyType ?? "");
    formData.append("smokingHabit", data.smokingHabit ?? "");
    formData.append("drinkingHabit", data.drinkingHabit ?? "");
    formData.append("dietaryPreference", data.dietaryPreference ?? "");
    formData.append("healthCondition", data.healthCondition ?? "");

    // Call update profile action API
    const updateProfileResponse = await updateUserProfileAction(formData);

    // Show toast notification based on API response success or failure
    toast(updateProfileResponse.message, {
      type: updateProfileResponse.status ? "success" : "error",
    });

    // If update successful, close modal and refresh page data
    if (updateProfileResponse.status) {
      setOpen(false);
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
          <div className="w-full h-full max-w-[600px] max-h-[600px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="w-full h-full flex flex-col gap-[25px]"
            >
              <CardTitle title="Personal Attributes & Habits" />
              <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
                <div className="w-full flex flex-col md:flex-row gap-[35px]">
                  <Controller
                    name="heightCm"
                    control={control}
                    defaultValue={userProfile.heightCm ?? 0}
                    render={({ field }) => (
                      <UnderlineInput
                        {...field}
                        label="Height (cm)"
                        type="number"
                        name="heightCm"
                        value={field.value === 0 ? "" : field.value}
                        placeholder="Enter your height"
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
                        label="Weight (kg)"
                        type="number"
                        name="weightKg"
                        value={field.value === 0 ? "" : field.value}
                        placeholder="Enter your weight"
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
                          label="Body Type"
                          name="bodyType"
                          options={enumToOptions(BodyType)}
                          placeholder="Select body type"
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
                          label="Health Condition"
                          name="healthCondition"
                          options={enumToOptions(HealthCondition)}
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
                          label="Drinking Habit"
                          name="drinkingHabit"
                          options={enumToOptions(DrinkingHabit)}
                          placeholder="Select drinking habit"
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
                          label="Smoking Habit"
                          name="smokingHabit"
                          options={enumToOptions(SmokingHabit)}
                          placeholder="Select smoking habit"
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
                          label="Dietary Preference"
                          name="dietaryPreference"
                          options={enumToOptions(DietaryPreference)}
                          placeholder="Select dietary preference"
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
                          label="Pets"
                          name="hasPet"
                          options={enumToOptions(HasPet)}
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
                      label="Children"
                      type="text"
                      name="children"
                      placeholder="Enter how many children do you have"
                      value={field.value === 0 ? "" : field.value}
                      error={errors.children?.message}
                    />
                  )}
                />
              </div>

              {/* Form submit and cancel buttons */}
              <div className="flex items-center gap-[30px] text-[14px]">
                <CommonButton
                  type="submit"
                  label={`${loading ? "Saving..." : "Save"}`}
                  disabled={loading}
                  className="w-full bg-green text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
                />
                <CommonButton
                  onClick={() => setOpen(false)}
                  label="Cancel"
                  className="w-full bg-red text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalAttributesUpdateForm;
