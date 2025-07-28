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

    // Prepare form data to send to the API
    const formData = new FormData();
    formData.append("highestEducation", data.highestEducation ?? "");
    formData.append("institutionName", data.institutionName ?? "");
    formData.append("profession", data.profession ?? "");
    formData.append("companyName", data.companyName ?? "");
    formData.append("monthlyIncome", String(data.monthlyIncome) ?? "0");
    formData.append("religion", data.religion ?? "");
    formData.append("politicalView", data.politicalView ?? "");
    formData.append("livingArrangement", data.livingArrangement ?? "");

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
          <div className="w-full h-full max-w-[600px] max-h-[550px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="w-full h-full flex flex-col gap-[25px]"
            >
              <CardTitle title="Lifestyle & Background" />
              <div className="w-full h-full max-h-[400px] overflow-y-auto flex flex-col gap-[22px]">
                <div className="w-full flex flex-col md:flex-row gap-[35px]">
                  <Controller
                    name="highestEducation"
                    control={control}
                    defaultValue={userProfile.highestEducation ?? ""}
                    render={({ field }) => (
                      <UnderlineInput
                        {...field}
                        label="Education"
                        type="text"
                        name="highestEducation"
                        placeholder="Enter education qualification"
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
                        label="Institution Name"
                        type="text"
                        name="institutionName"
                        placeholder="Enter institution name"
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
                        label="Profession"
                        type="text"
                        name="profession"
                        placeholder="Enter your profession"
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
                        label="Company Name"
                        type="text"
                        name="companyName"
                        placeholder="Enter company name"
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
                          label="Monthly Income ($)"
                          type="number"
                          name="monthlyIncome"
                          value={field.value === 0 ? "" : field.value}
                          placeholder="Enter monthly income (USD)"
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
                          label="Religion / Beliefs"
                          name="religion"
                          options={enumToOptions(ReligionPreference)}
                          placeholder="Select religion"
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
                          label="Political View"
                          name="politicalView"
                          options={enumToOptions(PoliticalView)}
                          placeholder="Select political view"
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
                          label="Living Arrangements"
                          name="livingArrangement"
                          options={enumToOptions(LivingArrangement)}
                          placeholder="Select living arrangement"
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

export default BackgroundInfoUpdateForm;
