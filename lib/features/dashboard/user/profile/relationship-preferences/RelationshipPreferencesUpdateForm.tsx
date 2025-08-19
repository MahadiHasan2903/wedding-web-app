"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Gender,
  LookingFor,
  PoliticalView,
  Religion,
} from "@/lib/enums/users.enum";
import {
  UpdateUserType,
  updateUserSchema,
} from "@/lib/schema/user/user.schema";
import { toast } from "react-toastify";
import {
  Textarea,
  UnderlineInput,
  UnderlineSelectField,
} from "@/lib/components/form-elements";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
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

const RelationshipPreferencesUpdateForm = ({
  open,
  setOpen,
  userProfile,
}: PropsType) => {
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
      interestedInGender: userProfile.interestedInGender ?? "",
      lookingFor: userProfile.lookingFor ?? "",
      preferredAgeRange: userProfile.preferredAgeRange ?? "",
      preferredNationality: userProfile.preferredNationality?.length
        ? userProfile.preferredNationality
        : [""],
      religionPreference: userProfile.religionPreference ?? "",
      politicalPreference: userProfile.politicalPreference ?? "",
      partnerExpectations: userProfile.partnerExpectations ?? "",
    },
  });

  // Watch the preferredNationality array so that UI updates when nationality change
  const preferredNationality = watch("preferredNationality");

  // Adds a new empty nationality input field
  const addNationality = () => {
    setValue("preferredNationality", [...(preferredNationality || []), ""]);
  };

  // Removes a nationality input field at a given index
  const removeNationality = (index: number) => {
    const newNationalities = [...(preferredNationality || [])];
    newNationalities.splice(index, 1);
    setValue("preferredNationality", newNationalities);
  };

  // Updates the nationality value at a specific index
  const updateNationality = (value: string, index: number) => {
    const newNationalities = [...(preferredNationality || [])];
    newNationalities[index] = value;
    setValue("preferredNationality", newNationalities);
  };

  // Form submission handler for updating user profile
  const handleUpdateProfile = async (data: UpdateUserType) => {
    setLoading(true);

    const formData = new FormData();

    // Append only non-empty string fields
    const fields: Partial<UpdateUserType> = {
      interestedInGender: data.interestedInGender,
      lookingFor: data.lookingFor,
      preferredAgeRange: data.preferredAgeRange,
      politicalPreference: data.politicalPreference,
      partnerExpectations: data.partnerExpectations,
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

    // Append preferredNationality only if it has non-empty values
    const filteredNationality = (data.preferredNationality || []).filter(
      (n) => n.trim() !== ""
    );
    if (filteredNationality.length > 0) {
      formData.append(
        "preferredNationality",
        JSON.stringify(filteredNationality)
      );
    }

    // Append religionPreference only if it's not empty/null
    if (
      data.religionPreference !== null &&
      data.religionPreference !== undefined &&
      String(data.religionPreference).trim() !== ""
    ) {
      formData.append("religionPreference", String(data.religionPreference));
    }

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
      <div className="w-full h-full max-w-[600px] max-h-[800px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="w-full h-full flex flex-col gap-[25px]"
        >
          <CardTitle title="Relationship Preference" />
          <div className="w-full h-full max-h-[700px] overflow-y-auto flex flex-col gap-[22px]">
            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <Controller
                name="interestedInGender"
                control={control}
                defaultValue={userProfile.interestedInGender ?? ""}
                render={({ field }) => (
                  <UnderlineSelectField
                    {...field}
                    label="Interested in"
                    name="interestedInGender"
                    options={enumToOptions(Gender)}
                  />
                )}
              />
              <Controller
                name="lookingFor"
                control={control}
                defaultValue={userProfile.lookingFor ?? ""}
                render={({ field }) => (
                  <UnderlineSelectField
                    {...field}
                    label="Looking For"
                    name="lookingFor"
                    options={enumToOptions(LookingFor)}
                  />
                )}
              />
            </div>

            <Controller
              name="preferredAgeRange"
              control={control}
              defaultValue={userProfile.preferredAgeRange ?? ""}
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label="Age Range Preference"
                  type="text"
                  name="preferredAgeRange"
                  placeholder="e.g. 20–30"
                  error={errors.preferredAgeRange?.message}
                />
              )}
            />

            <div className="w-full flex flex-col md:flex-row gap-[35px]">
              <div className="w-full md:w-1/2">
                <Controller
                  name="politicalPreference"
                  control={control}
                  defaultValue={userProfile.politicalPreference ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label="Political Preference"
                      name="politicalPreference"
                      options={enumToOptions(PoliticalView)}
                      placeholder="Select political preference"
                    />
                  )}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Controller
                  name="religionPreference"
                  control={control}
                  defaultValue={userProfile.religionPreference ?? ""}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label="Religious Preference"
                      name="religionPreference"
                      options={enumToOptions(Religion)}
                    />
                  )}
                />
              </div>
            </div>

            <Controller
              name="partnerExpectations"
              control={control}
              defaultValue={userProfile.partnerExpectations ?? ""}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Partner Expectations"
                  rows={6}
                  placeholder="Enter your expectations"
                  error={errors.partnerExpectations?.message}
                  className="!p-[16px] bg-light text-[12px] lg:text-[14px] "
                />
              )}
            />

            <div>
              <div className="w-full flex items-center justify-between gap-[10px] mb-2">
                <p className="text-[12px] lg:text-[14px] font-medium">
                  Preferred Nationalities
                </p>

                {/* Button to add new preferred nationality input */}
                <CommonButton
                  type="button"
                  label="Add Nationality"
                  onClick={addNationality}
                  className="w-fit flex items-center text-[12px] gap-[8px] bg-primary text-white font-medium px-[20px] py-[10px] rounded-full"
                  startIcon={<FaPlus />}
                />
              </div>

              {/* Render list of preferred nationality input fields */}
              <div className="w-full flex flex-col gap-2">
                {preferredNationality?.map((lang, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <Controller
                      name={`preferredNationality.${index}`}
                      control={control}
                      defaultValue={lang}
                      render={({ field }) => (
                        <UnderlineInput
                          {...field}
                          type="text"
                          placeholder="e.g. spanish"
                          error={errors.preferredNationality?.[index]?.message}
                          onChange={(e) => {
                            field.onChange(e);
                            updateNationality(e.target.value, index);
                          }}
                        />
                      )}
                    />
                    {/* Button to remove nationality input */}
                    <button
                      type="button"
                      onClick={() => removeNationality(index)}
                      className="text-red text-xl"
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
              className="w-full bg-red text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RelationshipPreferencesUpdateForm;
