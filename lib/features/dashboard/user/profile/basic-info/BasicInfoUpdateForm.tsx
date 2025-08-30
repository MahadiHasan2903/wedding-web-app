"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  tiktok,
  twitter,
  whatsapp,
  linkedin,
  facebook,
  instagram,
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
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { formatDateString1 } from "@/lib/utils/date/dateUtils";
import { Gender, MaritalStatus } from "@/lib/enums/users.enum";
import { updateUserProfileAction } from "@/lib/action/user/user.action";

// Props type for the BasicInfoUpdateForm component
interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

// Translations
const translations: Record<string, any> = {
  en: {
    title: "Basic Info",
    firstName: "First Name",
    lastName: "Last Name",
    gender: "Gender",
    dob: "Date of Birth",
    country: "Country",
    city: "State/City",
    nationality: "Nationality",
    maritalStatus: "Marital Status",
    bio: "Short Bio",
    socialLinks: "Social Links",
    placeholders: {
      firstName: "Enter your first name",
      lastName: "Enter your last name",
      gender: "Select your gender",
      dob: "Select your date of birth",
      country: "Select your country",
      city: "Select your city",
      nationality: "Enter your nationality",
      maritalStatus: "Select your marital status",
      bio: "Enter your bio",
      facebook: "Enter your Facebook link",
      instagram: "Enter your Instagram link",
      linkedin: "Enter your LinkedIn link",
      whatsapp: "Enter your WhatsApp link",
      twitter: "Enter your Twitter link",
      tiktok: "Enter your TikTok link",
    },
    save: "Save",
    saving: "Saving...",
    cancel: "Cancel",
  },
  fr: {
    title: "Informations de base",
    firstName: "Prénom",
    lastName: "Nom",
    gender: "Sexe",
    dob: "Date de naissance",
    country: "Pays",
    city: "État/Ville",
    nationality: "Nationalité",
    maritalStatus: "État civil",
    bio: "Courte biographie",
    socialLinks: "Liens sociaux",
    placeholders: {
      firstName: "Entrez votre prénom",
      lastName: "Entrez votre nom",
      gender: "Sélectionnez votre sexe",
      dob: "Sélectionnez votre date de naissance",
      country: "Sélectionnez votre pays",
      city: "Sélectionnez votre ville",
      nationality: "Entrez votre nationalité",
      maritalStatus: "Sélectionnez votre état civil",
      bio: "Entrez votre biographie",
      facebook: "Entrez votre lien Facebook",
      instagram: "Entrez votre lien Instagram",
      linkedin: "Entrez votre lien LinkedIn",
      whatsapp: "Entrez votre lien WhatsApp",
      twitter: "Entrez votre lien Twitter",
      tiktok: "Entrez votre lien TikTok",
    },
    save: "Enregistrer",
    saving: "Enregistrement...",
    cancel: "Annuler",
  },
  es: {
    title: "Información básica",
    firstName: "Nombre",
    lastName: "Apellido",
    gender: "Género",
    dob: "Fecha de nacimiento",
    country: "País",
    city: "Estado/Ciudad",
    nationality: "Nacionalidad",
    maritalStatus: "Estado civil",
    bio: "Biografía corta",
    socialLinks: "Enlaces sociales",
    placeholders: {
      firstName: "Ingresa tu nombre",
      lastName: "Ingresa tu apellido",
      gender: "Selecciona tu género",
      dob: "Selecciona tu fecha de nacimiento",
      country: "Selecciona tu país",
      city: "Selecciona tu ciudad",
      nationality: "Ingresa tu nacionalidad",
      maritalStatus: "Selecciona tu estado civil",
      bio: "Ingresa tu biografía",
      facebook: "Ingresa tu enlace de Facebook",
      instagram: "Ingresa tu enlace de Instagram",
      linkedin: "Ingresa tu enlace de LinkedIn",
      whatsapp: "Ingresa tu enlace de WhatsApp",
      twitter: "Ingresa tu enlace de Twitter",
      tiktok: "Ingresa tu enlace de TikTok",
    },
    save: "Guardar",
    saving: "Guardando...",
    cancel: "Cancelar",
  },
};

// List of supported social platforms
const socialPlatforms = [
  { name: "facebook", icon: facebook },
  { name: "instagram", icon: instagram },
  { name: "linkedin", icon: linkedin },
  { name: "whatsapp", icon: whatsapp },
  { name: "twitter", icon: twitter },
  { name: "tiktok", icon: tiktok },
];

const BasicInfoUpdateForm = ({ open, setOpen, userProfile }: PropsType) => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];
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

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="w-full h-full max-w-[600px] max-h-[800px] rounded-[10px] bg-white p-[24px] lg:p-[35px] ">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="w-full h-full flex flex-col gap-[25px]"
        >
          <CardTitle title={t.title} />

          <div className="w-full h-full max-h-[700px] overflow-y-auto flex flex-col gap-[22px] ">
            {/* First and Last Name */}
            <div className="flex flex-col md:flex-row gap-[35px]">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.firstName}
                    type="text"
                    placeholder={t.placeholders.firstName}
                    error={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.lastName}
                    type="text"
                    placeholder={t.placeholders.lastName}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </div>

            {/* Gender + DOB */}
            <div className="flex flex-col md:flex-row gap-[35px]">
              <div className="flex-1">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.gender}
                      options={enumToOptions(Gender)}
                      placeholder={t.placeholders.gender}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <Datepicker
                      {...field}
                      defaultDate={String(field.value)}
                      ref={null}
                      className="w-full border-b-[1.5px] border-primaryBorder bg-transparent py-2 font-normal outline-none transition focus:border-primary active:border-primary"
                      title="dateOfBirth"
                      label={t.dob}
                      setValue={setValue}
                      error={errors.dateOfBirth?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Country + City */}
            <div className="flex flex-col md:flex-row gap-[35px]">
              <div className="flex-1">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.country}
                      options={countryOptions}
                      placeholder={t.placeholders.country}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.city}
                      options={statesOptions}
                      placeholder={t.placeholders.city}
                      disabled={!countryField}
                    />
                  )}
                />
              </div>
            </div>

            {/* Nationality + Marital Status */}
            <div className="flex flex-col md:flex-row gap-[35px]">
              <div className="flex-1">
                <Controller
                  name="nationality"
                  control={control}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label={t.nationality}
                      type="text"
                      placeholder={t.placeholders.nationality}
                      error={errors.nationality?.message}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name="maritalStatus"
                  control={control}
                  render={({ field }) => (
                    <UnderlineSelectField
                      {...field}
                      label={t.maritalStatus}
                      options={enumToOptions(MaritalStatus)}
                      placeholder={t.placeholders.maritalStatus}
                    />
                  )}
                />
              </div>
            </div>

            {/* Bio */}
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label={t.bio}
                  rows={6}
                  placeholder={t.placeholders.bio}
                  error={errors.bio?.message}
                  className="!p-[16px] bg-light text-[12px] lg:text-[14px]"
                />
              )}
            />

            {/* Social Links */}
            <div className="flex flex-col items-start gap-[5px]">
              <p className="text-[12px] lg:text-[14px] font-medium">
                {t.socialLinks}
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
                          placeholder={t.placeholders[platform.name]}
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

          {/* Buttons */}
          <div className="flex items-center gap-[30px] text-[14px]">
            <CommonButton
              type="submit"
              label={loading ? t.saving : t.save}
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

export default BasicInfoUpdateForm;
