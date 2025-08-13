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
import { AstrologicalSign, LoveLanguage } from "@/lib/enums/users.enum";
import { Textarea, UnderlineSelectField } from "@/lib/components/form-elements";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

const OtherInformationUpdateForm = ({
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
      astrologicalSign: userProfile.astrologicalSign ?? "",
      loveLanguage: userProfile.loveLanguage ?? "",
      favoriteQuote: userProfile.favoriteQuote ?? "",
    },
  });

  // Form submission handler for updating user profile
  const handleUpdateProfile = async (data: UpdateUserType) => {
    setLoading(true);

    const formData = new FormData();

    // Only append fields that have a non-empty value
    const fields: Partial<UpdateUserType> = {
      astrologicalSign: data.astrologicalSign,
      loveLanguage: data.loveLanguage,
      favoriteQuote: data.favoriteQuote,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        formData.append(key, value);
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

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
          <div className="w-full h-full max-w-[600px] max-h-[600px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="w-full h-full flex flex-col gap-[25px]"
            >
              <CardTitle title="Other Information" />
              <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
                <Controller
                  name="astrologicalSign"
                  control={control}
                  defaultValue={userProfile.astrologicalSign ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label="Astrological Sign"
                      name="astrologicalSign"
                      options={enumToOptions(AstrologicalSign)}
                    />
                  )}
                />

                <Controller
                  name="loveLanguage"
                  control={control}
                  defaultValue={userProfile.loveLanguage ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label="Love Language"
                      name="loveLanguage"
                      options={enumToOptions(LoveLanguage)}
                    />
                  )}
                />

                <Controller
                  name="favoriteQuote"
                  control={control}
                  defaultValue={userProfile.favoriteQuote ?? ""}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Favorite Quote"
                      rows={6}
                      placeholder="Enter your favorite quote"
                      error={errors.favoriteQuote?.message}
                      className="!p-[16px] bg-light text-[12px] lg:text-[14px] "
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

export default OtherInformationUpdateForm;
