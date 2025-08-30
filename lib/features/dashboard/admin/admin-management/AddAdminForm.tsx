"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { addAdminAction } from "@/lib/action/user/user.action";
import { UnderlineInput } from "@/lib/components/form-elements";
import { addAdminSchema, AddAdminType } from "@/lib/schema/user/user.schema";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// translations object for multi-language support
const translations: Record<string, Record<string, string>> = {
  en: {
    addAdmin: "Add Admin",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    retypePassword: "Re-type Password",
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    enterEmail: "Enter email",
    enterPassword: "Enter password",
    enterRetypePassword: "Enter re-type password",
    add: "Add",
    adding: "Adding...",
    cancel: "Cancel",
  },
  fr: {
    addAdmin: "Ajouter un administrateur",
    firstName: "Prénom",
    lastName: "Nom de famille",
    email: "Email",
    password: "Mot de passe",
    retypePassword: "Retaper le mot de passe",
    enterFirstName: "Entrez le prénom",
    enterLastName: "Entrez le nom de famille",
    enterEmail: "Entrez l'email",
    enterPassword: "Entrez le mot de passe",
    enterRetypePassword: "Retapez le mot de passe",
    add: "Ajouter",
    adding: "Ajout...",
    cancel: "Annuler",
  },
  es: {
    addAdmin: "Agregar administrador",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    password: "Contraseña",
    retypePassword: "Reingrese la contraseña",
    enterFirstName: "Ingrese el nombre",
    enterLastName: "Ingrese el apellido",
    enterEmail: "Ingrese el correo electrónico",
    enterPassword: "Ingrese la contraseña",
    enterRetypePassword: "Reingrese la contraseña",
    add: "Agregar",
    adding: "Agregando...",
    cancel: "Cancelar",
  },
};

const AddAdminForm = ({ open, setOpen }: PropsType) => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");

  // Setup react-hook-form with Zod validation and initialize default values
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAdminType>({
    resolver: zodResolver(addAdminSchema),
  });

  // Handle form submission to update the membership package
  const handleAddAdmin = async (data: AddAdminType) => {
    setLoading(true);
    setPasswordError("");

    // ✅ check if password and retypePassword match
    if (data.password !== data.retypePassword) {
      setPasswordError("Password and re-type password do not match.");
      setLoading(false);
      return;
    }

    const requestPayload: AddAdminType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    const addAdminResponse = await addAdminAction(requestPayload);

    toast(addAdminResponse.message, {
      type: addAdminResponse.status ? "success" : "error",
    });

    if (addAdminResponse.status) {
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
      <div className="w-full h-full max-w-[700px] max-h-[650px] md:max-h-[500px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
        <form
          onSubmit={handleSubmit(handleAddAdmin)}
          className="w-full h-full flex flex-col gap-[25px]"
        >
          <CardTitle title={t.addAdmin} />
          <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
            <div className="w-full flex flex-col md:flex-row items-start gap-4 justify-between">
              <Controller
                name="firstName"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.firstName}
                    type="text"
                    name="firstName"
                    placeholder={t.enterFirstName}
                    error={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.lastName}
                    type="text"
                    name="lastName"
                    placeholder={t.enterLastName}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </div>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label={t.email}
                  type="email"
                  name="email"
                  placeholder={t.enterEmail}
                  error={errors.email?.message}
                />
              )}
            />
            <div className="w-full flex flex-col md:flex-row items-start gap-4 justify-between">
              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.password}
                    type="password"
                    name="password"
                    placeholder={t.enterPassword}
                    error={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="retypePassword"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <UnderlineInput
                    {...field}
                    label={t.retypePassword}
                    type="password"
                    name="retypePassword"
                    placeholder={t.enterRetypePassword}
                    error={errors.retypePassword?.message}
                  />
                )}
              />
            </div>
            {passwordError && (
              <p className="text-red text-sm">{passwordError}</p>
            )}
          </div>

          {/* Form submit and cancel buttons */}
          <div className="flex items-center gap-[30px] text-[14px]">
            <CommonButton
              type="submit"
              label={loading ? t.adding : t.add}
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

export default AddAdminForm;
