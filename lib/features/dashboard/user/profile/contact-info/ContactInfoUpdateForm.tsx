"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  UpdateUserType,
  updateUserSchema,
} from "@/lib/schema/user/user.schema";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import { getUserUtcOffset } from "@/lib/utils/dateUtils";
import { UnderlineInput } from "@/lib/components/form-elements";
import { updateUserProfileAction } from "@/lib/action/user/user.action";

// Props type for the ContactInfoUpdateForm component
interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

const ContactInfoUpdateForm = ({ open, setOpen, userProfile }: PropsType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Setup react-hook-form with Zod validation and initialize default values
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: userProfile.firstName ?? "",
      lastName: userProfile.lastName ?? "",
      phoneNumber: userProfile.phoneNumber ?? "",
      timeZone: userProfile.timeZone ?? getUserUtcOffset(),
      preferredLanguages: userProfile.preferredLanguages?.length
        ? userProfile.preferredLanguages
        : [""],
    },
  });

  // Watch the preferredLanguages array so that UI updates when languages change
  const preferredLanguages = watch("preferredLanguages");

  // Adds a new empty language input field
  const addLanguage = () => {
    setValue("preferredLanguages", [...(preferredLanguages || []), ""]);
  };

  // Removes a language input field at a given index
  const removeLanguage = (index: number) => {
    const newLanguages = [...(preferredLanguages || [])];
    newLanguages.splice(index, 1);
    setValue("preferredLanguages", newLanguages);
  };

  // Updates the language value at a specific index
  const updateLanguage = (value: string, index: number) => {
    const newLanguages = [...(preferredLanguages || [])];
    newLanguages[index] = value;
    setValue("preferredLanguages", newLanguages);
  };

  // Form submission handler for updating user profile
  const handleUpdateProfile = async (data: UpdateUserType) => {
    setLoading(true);

    // Prepare form data to send to the API
    const formData = new FormData();
    formData.append("phoneNumber", data.phoneNumber ?? "");
    formData.append("timeZone", data.timeZone ?? "");
    formData.append(
      "preferredLanguages",
      JSON.stringify(
        (data.preferredLanguages || []).filter((lang) => lang.trim() !== "")
      )
    );

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
              className="w-full h-full flex flex-col gap-[25px] max-h-[800px]"
            >
              <CardTitle title="Contact & Accessibility" />
              <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
                {/* Email field (read-only) */}
                <Controller
                  name="email"
                  control={control}
                  defaultValue={userProfile.email}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      readOnly
                      error={errors.email?.message}
                    />
                  )}
                />

                {/* Phone number input */}
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue={userProfile.phoneNumber ?? ""}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label="Phone Number"
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter your phone number including country code (e.g. +1 1234567890)"
                      error={errors.phoneNumber?.message}
                    />
                  )}
                />

                {/* Timezone input */}
                <Controller
                  name="timeZone"
                  control={control}
                  defaultValue={userProfile.timeZone ?? ""}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label="Timezone"
                      type="text"
                      name="timeZone"
                      placeholder="Enter your timezone"
                      error={errors.timeZone?.message}
                    />
                  )}
                />

                {/* Preferred Languages section */}
                <div>
                  <div className="w-full flex items-center justify-between gap-[10px] mb-2">
                    <p className="text-[12px] lg:text-[14px] font-medium">
                      Preferred Languages
                    </p>

                    {/* Button to add new preferred language input */}
                    <CommonButton
                      type="button"
                      label="Add Language"
                      onClick={addLanguage}
                      className="w-fit flex items-center text-[12px] gap-[8px] bg-primary text-white font-medium px-[20px] py-[10px] rounded-full"
                      startIcon={<FaPlus />}
                    />
                  </div>

                  {/* Render list of preferred language input fields */}
                  <div className="w-full flex flex-col gap-2">
                    {preferredLanguages?.map((lang, index) => (
                      <div key={index} className="flex items-end gap-2">
                        <Controller
                          name={`preferredLanguages.${index}`}
                          control={control}
                          defaultValue={lang}
                          render={({ field }) => (
                            <UnderlineInput
                              {...field}
                              type="text"
                              placeholder="Enter your preferred language"
                              error={
                                errors.preferredLanguages?.[index]?.message
                              }
                              onChange={(e) => {
                                field.onChange(e);
                                updateLanguage(e.target.value, index);
                              }}
                            />
                          )}
                        />
                        {/* Button to remove language input */}
                        <button
                          type="button"
                          onClick={() => removeLanguage(index)}
                          className="text-red-500 text-xl"
                          aria-label={`Remove language ${index + 1}`}
                        >
                          <RxCross1 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
                  className="w-full bg-red-500 text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactInfoUpdateForm;
