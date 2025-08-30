"use client";
import React, { useState } from "react";
import {
  ChangePasswordType,
  changePasswordSchema,
} from "@/lib/schema/user/user.schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CardTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { whiteSave } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { OutlinedInput } from "@/lib/components/form-elements";
import { changePasswordAction } from "@/lib/action/user/user.action";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    passwordSecurity: "Password & Security",
    save: "Save",
    saving: "Saving...",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
  },
  fr: {
    passwordSecurity: "Mot de passe et sécurité",
    save: "Enregistrer",
    saving: "Enregistrement...",
    emailAddress: "Adresse e-mail",
    phoneNumber: "Numéro de téléphone",
    changePassword: "Changer le mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
  },
  es: {
    passwordSecurity: "Contraseña y seguridad",
    save: "Guardar",
    saving: "Guardando...",
    emailAddress: "Dirección de correo electrónico",
    phoneNumber: "Número de teléfono",
    changePassword: "Cambiar contraseña",
    currentPassword: "Contraseña actual",
    newPassword: "Nueva contraseña",
    confirmPassword: "Confirmar contraseña",
  },
};

const ChangePassword = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  // Get current language from global store
  const { language } = useLanguageStore();
  const t = translations[language];

  const isAdmin = session?.user.data.userRole === "admin";

  // Initialize react-hook-form with Zod validation schema and default form values
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  // Function to change logged in user password
  const handleChangePassword = async (data: ChangePasswordType) => {
    setLoading(true);

    // Prepare payload
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };

    // Submit request
    const changePasswordResponse = await changePasswordAction(payload);

    // Show toast notification with confirmation result
    toast(changePasswordResponse.message, {
      type: changePasswordResponse.status ? "success" : "error",
    });

    if (changePasswordResponse.status) {
      reset();
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="w-full bg-white rounded-none lg:rounded-[10px]"
    >
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title={t.passwordSecurity} />
          <CommonButton
            label={loading ? t.saving : t.save}
            type="submit"
            disabled={loading}
            className="w-fit flex items-center gap-[10px] bg-primary border border-primaryBorder text-white text-[14px] font-normal rounded-full px-[20px] py-[10px]"
            startIcon={
              <ImageWithFallback
                src={whiteSave}
                width={14}
                height={14}
                alt="save-icon"
              />
            }
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-[25px] xl:gap-[40px] px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px]">
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-start gap-[10px] lg:gap-[30px]">
          <div className="w-full xl:w-[700px] flex flex-col xl:flex-row items-start xl:items-center justify-start gap-2 xl:gap-[30px]">
            <p className="text-[14px] font-semibold w-full lg:w-auto">
              {t.emailAddress}
            </p>
            <div className="w-full lg:max-w-[300px]">
              <OutlinedInput
                name="email"
                type="text"
                readOnly
                value={session?.user.data.email || ""}
                className="!px-[10px] !py-[10px] rounded-[5px] w-full"
              />
            </div>
          </div>

          {!isAdmin && (
            <div className="w-full flex flex-col xl:flex-row items-start xl:items-center justify-start gap-2 xl:gap-[30px]">
              <p className="text-[14px] font-semibold w-full lg:w-auto">
                {t.phoneNumber}
              </p>
              <div className="w-full lg:max-w-[300px]">
                <OutlinedInput
                  name="phone"
                  type="text"
                  readOnly
                  value={session?.user.data.phoneNumber || ""}
                  className="!px-[10px] !py-[10px] rounded-[5px] w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-2 lg:gap-4">
          <p className="text-[14px] font-semibold mr-[30px] shrink-0">
            {t.changePassword}
          </p>

          <div className="w-full flex flex-col md:flex-row items-start gap-[20px]">
            <div className="w-full md:max-w-[300px]">
              <Controller
                name="currentPassword"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    name="currentPassword"
                    type="password"
                    placeholder={t.currentPassword}
                    className="!px-[10px] !py-[10px] rounded-[5px] w-full"
                    error={errors.currentPassword?.message}
                  />
                )}
              />
            </div>

            <div className="w-full md:max-w-[300px]">
              <Controller
                name="newPassword"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    name="newPassword"
                    type="password"
                    placeholder={t.newPassword}
                    className="!px-[10px] !py-[10px] rounded-[5px] w-full"
                    error={errors.newPassword?.message}
                  />
                )}
              />
            </div>

            <div className="w-full md:max-w-[300px]">
              <Controller
                name="confirmNewPassword"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    name="confirmNewPassword"
                    type="password"
                    placeholder={t.confirmPassword}
                    className="!px-[10px] !py-[10px] rounded-[5px] w-full"
                    error={errors.confirmNewPassword?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
