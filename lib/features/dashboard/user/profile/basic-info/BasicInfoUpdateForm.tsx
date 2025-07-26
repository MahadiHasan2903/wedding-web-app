"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  facebook,
  instagram,
  linkedin,
  tikTok,
  twitter,
  whatsapp,
} from "@/lib/components/image/icons";
import {
  Datepicker,
  Textarea,
  UnderlineInput,
  UnderlineSelectField,
} from "@/lib/components/form-elements";
import { User } from "@/lib/types/user/user.types";
import { enumToOptions } from "@/lib/utils/helpers";
import { Country, State } from "country-state-city";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { Gender, MaritalStatus } from "@/lib/enums/users.enum";
import {
  UpdateUserType,
  updateUserSchema,
} from "@/lib/schema/user/user.schema";

// Props type for modal component
interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

// Fixed list of supported social platforms
const socialPlatforms = [
  { name: "facebook", icon: facebook, placeholder: "Enter your Facebook link" },
  {
    name: "instagram",
    icon: instagram,
    placeholder: "Enter your Instagram link",
  },
  { name: "linkedin", icon: linkedin, placeholder: "Enter your LinkedIn link" },
  { name: "whatsapp", icon: whatsapp, placeholder: "Enter your WhatsApp link" },
  { name: "twitter", icon: twitter, placeholder: "Enter your Twitter link" },
  { name: "tikTok", icon: tikTok, placeholder: "Enter your TikTok link" },
];

const BasicInfoUpdateForm = ({ open, setOpen, userProfile }: PropsType) => {
  // Country and state options for select fields
  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));
  const [statesOptions, setStatesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // Prepare default values for social links
  const defaultSocialLinks = socialPlatforms.map((platform) => {
    const existing = userProfile.socialMediaLinks?.find(
      (l) => l.name === platform.name
    );
    return {
      name: platform.name,
      link: existing?.link || "",
    };
  });

  // Setup react-hook-form with zod schema
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
      gender: userProfile.gender ?? "",
      dateOfBirth: userProfile.dateOfBirth ?? "",
      country: userProfile.country ?? "",
      city: userProfile.city ?? "",
      nationality: userProfile.nationality ?? "",
      maritalStatus: userProfile.maritalStatus ?? "",
      bio: userProfile.bio ?? "",
      socialMediaLinks: defaultSocialLinks,
    },
  });

  const socialLinks = watch("socialMediaLinks");
  const countryField = watch("country");

  // Load states based on selected country
  useEffect(() => {
    if (!countryField) {
      return;
    }

    const selectedCountry = Country.getAllCountries().find(
      (country) => country.isoCode === countryField
    );

    if (!selectedCountry) {
      return;
    }

    const states = State.getStatesOfCountry(selectedCountry.isoCode).map(
      (state) => ({
        label: state.name,
        value: state.isoCode,
      })
    );

    setStatesOptions(states);
  }, [countryField]);

  // Form submission handler
  const handleUpdateProfile = async (data: UpdateUserType) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
          <div className="w-full h-full max-w-[600px] max-h-[800px] rounded-[10px] bg-white p-[24px] lg:p-[35px] ">
            {/* Form */}
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="w-full h-full flex flex-col gap-[25px] max-h-[800px] "
            >
              <CardTitle title="Basic Info" />
              <div className="w-full h-full max-h-[700px] overflow-y-auto flex flex-col gap-[22px] ">
                {/* Name */}
                <div className="flex flex-col md:flex-row gap-[35px]">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={userProfile.firstName}
                    render={({ field }) => (
                      <UnderlineInput
                        {...field}
                        label="First Name"
                        type="text"
                        placeholder="Enter your first name"
                        error={errors.firstName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={userProfile.lastName}
                    render={({ field }) => (
                      <UnderlineInput
                        {...field}
                        label="Last Name"
                        type="text"
                        placeholder="Enter your last name"
                        error={errors.lastName?.message}
                      />
                    )}
                  />
                </div>

                {/* Gender & DOB */}
                <div className="flex flex-col md:flex-row gap-[35px]">
                  <div className="flex-1">
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={userProfile.gender ?? ""}
                      render={({ field }) => (
                        <UnderlineSelectField
                          {...field}
                          label="Gender"
                          name="gender"
                          options={enumToOptions(Gender)}
                          placeholder="Select your gender"
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      defaultValue={userProfile.dateOfBirth ?? ""}
                      render={({ field }) => (
                        <Datepicker
                          {...field}
                          ref={null}
                          title="dateOfBirth"
                          label="Date of Birth"
                          setValue={setValue}
                          error={errors.dateOfBirth?.message}
                          defaultDate={field.value}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Country & City */}
                <div className="flex flex-col md:flex-row gap-[35px]">
                  <div className="flex-1">
                    <Controller
                      name="country"
                      control={control}
                      defaultValue={userProfile.country ?? ""}
                      render={({ field }) => (
                        <UnderlineSelectField
                          {...field}
                          label="Country"
                          options={countryOptions}
                          placeholder="Select your country"
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <Controller
                      name="city"
                      control={control}
                      defaultValue={userProfile.city ?? ""}
                      render={({ field }) => (
                        <UnderlineSelectField
                          {...field}
                          label="State/City"
                          options={statesOptions}
                          placeholder="Select your city"
                          disabled={!countryField}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Nationality & Marital Status */}
                <div className="flex flex-col md:flex-row gap-[35px]">
                  <div className="flex-1">
                    <Controller
                      name="nationality"
                      control={control}
                      defaultValue={userProfile.nationality ?? ""}
                      render={({ field }) => (
                        <UnderlineInput
                          {...field}
                          label="Nationality"
                          type="text"
                          placeholder="Enter your nationality"
                          error={errors.nationality?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <Controller
                      name="maritalStatus"
                      control={control}
                      defaultValue={userProfile.maritalStatus ?? ""}
                      render={({ field }) => (
                        <UnderlineSelectField
                          {...field}
                          label="Marital Status"
                          name="maritalStatus"
                          options={enumToOptions(MaritalStatus)}
                          placeholder="Select your marital status"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Bio */}
                <Controller
                  name="bio"
                  control={control}
                  defaultValue={userProfile.bio ?? ""}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Short Bio"
                      rows={6}
                      placeholder="Enter your bio"
                      error={errors.bio?.message}
                      className="!p-[16px] bg-light text-[12px] lg:text-[14px] "
                    />
                  )}
                />

                {/* Social Media Links */}
                <div className="flex flex-col items-start gap-[5px]">
                  <p className="text-[12px] lg:text-[14px] font-medium">
                    Social Links
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] gap-y-[10px]">
                    {socialPlatforms.map((platform, index) => (
                      <div
                        key={platform.name}
                        className="flex items-center gap-[10px]"
                      >
                        <ImageWithFallback
                          src={platform.icon}
                          width={20}
                          height={20}
                          alt={platform.name}
                        />
                        <Controller
                          name={`socialMediaLinks.${index}.link`}
                          control={control}
                          render={({ field }) => (
                            <UnderlineInput
                              {...field}
                              type="text"
                              placeholder={platform.placeholder}
                              error={
                                errors.socialMediaLinks?.[index]?.link?.message
                              }
                              onChange={(e) => {
                                const updatedLinks = [...(socialLinks || [])];
                                updatedLinks[index] = {
                                  name: platform.name,
                                  link: e.target.value,
                                };
                                setValue("socialMediaLinks", updatedLinks, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Footer Buttons */}
              <div className="flex items-center gap-[30px] text-[14px]">
                <CommonButton
                  type="submit"
                  label="Save"
                  className="w-full bg-green text-white font-bold p-[10px] rounded-full"
                />
                <CommonButton
                  onClick={() => setOpen(false)}
                  label="Cancel"
                  className="w-full bg-red text-white font-bold p-[10px] rounded-full"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicInfoUpdateForm;
