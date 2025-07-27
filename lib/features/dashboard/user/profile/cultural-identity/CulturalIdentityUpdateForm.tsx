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
import { updateUserProfileAction } from "@/lib/action/user/user.action";
import { CulturalPractices, FamilyBackground } from "@/lib/enums/users.enum";
import { Textarea, UnderlineSelectField } from "@/lib/components/form-elements";

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

    // Prepare form data to send to the API
    const formData = new FormData();
    formData.append("bio", data.bio ?? "");
    formData.append("familyBackground", data.familyBackground ?? "");
    formData.append("culturalPractices", data.culturalPractices ?? "");

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
              <CardTitle title="Bio & Cultural Identity" />
              <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
                <Controller
                  name="bio"
                  control={control}
                  defaultValue={userProfile.bio ?? ""}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="About me"
                      rows={6}
                      placeholder="Enter your bio"
                      error={errors.bio?.message}
                      className="!p-[16px] bg-light text-[12px] lg:text-[14px] "
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
                      label="Family Background"
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
                      label="Cultural Practices"
                      name="culturalPractices"
                      options={enumToOptions(CulturalPractices)}
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

export default CulturalIdentityUpdateForm;
