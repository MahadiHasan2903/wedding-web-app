"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  facebook,
  instagram,
  linkedin,
  tiktok,
  twitter,
  whatsapp,
} from "@/lib/components/image/icons";
import {
  UpdateUserType,
  updateUserSchema,
} from "@/lib/schema/user/user.schema";
import { toast } from "react-toastify";
import {
  Datepicker,
  Textarea,
  UnderlineInput,
  UnderlineSelectField,
} from "@/lib/components/form-elements";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/user/user.types";
import { enumToOptions } from "@/lib/utils/helpers";
import { Country, State } from "country-state-city";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import { formatDateString1 } from "@/lib/utils/date/dateUtils";
import { ImageWithFallback } from "@/lib/components/image";
import { Gender, MaritalStatus } from "@/lib/enums/users.enum";
import { updateUserProfileAction } from "@/lib/action/user/user.action";

// Props type for the BasicInfoUpdateForm component
interface PropsType {
  open: boolean; // Whether the modal is open
  setOpen: Dispatch<SetStateAction<boolean>>; // Setter to control modal open state
  userProfile: User; // The current user profile data to populate the form
}

// List of supported social platforms with their icons and input placeholders
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
  { name: "tiktok", icon: tiktok, placeholder: "Enter your TikTok link" }, // fixed "tikTok" => "tiktok"
];

const BasicInfoUpdateForm = ({ open, setOpen, userProfile }: PropsType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Get all countries for country select options
  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  // States options depend on the selected country
  const [statesOptions, setStatesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // Prepare default values for social media links from userProfile
  const defaultSocialLinks = socialPlatforms.map((platform) => {
    const existing = userProfile.socialMediaLinks?.find(
      (l) => l.name === platform.name
    );
    return {
      name: platform.name,
      link: existing?.link || "",
    };
  });

  // Initialize react-hook-form with Zod validation schema and default form values
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

  // Watch the current values of socialMediaLinks and country to update form dynamically
  const socialLinks = watch("socialMediaLinks");
  const countryField = watch("country");

  // Effect to load states when country changes
  useEffect(() => {
    if (!countryField) {
      setStatesOptions([]); // Reset states if no country selected
      return;
    }

    // Find the selected country from the full country list
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.isoCode === countryField
    );

    if (!selectedCountry) {
      setStatesOptions([]); // Reset if country not found
      return;
    }

    // Get states for the selected country and map to select options
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
    setLoading(true);

    const formData = new FormData();

    // Fields to check for emptiness before appending
    const fields: Partial<UpdateUserType> = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dateOfBirth:
        formatDateString1(data.dateOfBirth) === ""
          ? userProfile.dateOfBirth
          : formatDateString1(data.dateOfBirth),
      country: data.country,
      city: data.city,
      nationality: data.nationality,
      maritalStatus: data.maritalStatus,
      bio: data.bio,
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

    // Append social links only if non-empty
    const filteredSocialLinks = (data.socialMediaLinks ?? []).filter(
      (link) => link.name?.trim() && link.link?.trim()
    );
    if (filteredSocialLinks.length > 0) {
      formData.append("socialMediaLinks", JSON.stringify(filteredSocialLinks));
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

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
          <div className="w-full h-full max-w-[600px] max-h-[800px] rounded-[10px] bg-white p-[24px] lg:p-[35px] ">
            {/* Form */}
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="w-full h-full flex flex-col gap-[25px]"
            >
              {/* Form Title */}
              <CardTitle title="Basic Info" />

              {/* Scrollable content area for the form fields */}
              <div className="w-full h-full max-h-[700px] overflow-y-auto flex flex-col gap-[22px] ">
                {/* First and Last Name fields */}
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

                {/* Gender dropdown and Date of Birth picker */}
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
                          defaultDate={String(field.value)}
                          ref={null}
                          title="dateOfBirth"
                          label="Date of Birth"
                          setValue={setValue}
                          error={errors.dateOfBirth?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Country and City/State dropdowns */}
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
                          disabled={!countryField} // Disable city select if no country selected
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Nationality input and Marital Status dropdown */}
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

                {/* Short bio textarea */}
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

                {/* Social Media Links inputs */}
                <div className="flex flex-col items-start gap-[5px]">
                  <p className="text-[12px] lg:text-[14px] font-medium">
                    Social Links
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[25px] gap-y-[10px]">
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
                              // Update the socialMediaLinks array on change
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

              {/* Form action buttons */}
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

export default BasicInfoUpdateForm;
