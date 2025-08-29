"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  registrationRequestSchema,
  RegistrationRequestType,
} from "@/lib/schema/auth/auth.schema";
import {
  accountRegistrationConfirmationAction,
  accountRegistrationRequestAction,
} from "@/lib/action/auth/auth.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import VerificationModal from "./VerificationModal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { SubHeading } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { UnderlineInput } from "@/lib/components/form-elements";

const translations = {
  en: {
    title: "Create a New Account",
    google: "Continue with Google",
    emailSignUp: "or, sign up with your email",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    retypePassword: "Retype Password",
    passwordMismatch: "Passwords do not match",
    loading: "Loading...",
    signUp: "Sign Up",
    termsText: "By joining, you agree to our",
    termsLink: "Terms of Service",
    privacyLink: "Privacy Policy",
    alreadyAccount: "Already have an account?",
    signIn: "Sign in",
  },
  fr: {
    title: "Créer un nouveau compte",
    google: "Continuer avec Google",
    emailSignUp: "ou, inscrivez-vous avec votre e-mail",
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    password: "Mot de passe",
    retypePassword: "Retapez le mot de passe",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    loading: "Chargement...",
    signUp: "S'inscrire",
    termsText: "En rejoignant, vous acceptez nos",
    termsLink: "Conditions d'utilisation",
    privacyLink: "Politique de confidentialité",
    alreadyAccount: "Vous avez déjà un compte ?",
    signIn: "Connectez-vous",
  },
  es: {
    title: "Crear una nueva cuenta",
    google: "Continuar con Google",
    emailSignUp: "o, regístrate con tu correo electrónico",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    password: "Contraseña",
    retypePassword: "Reescriba la contraseña",
    passwordMismatch: "Las contraseñas no coinciden",
    loading: "Cargando...",
    signUp: "Registrarse",
    termsText: "Al unirse, aceptas nuestros",
    termsLink: "Términos de servicio",
    privacyLink: "Política de privacidad",
    alreadyAccount: "¿Ya tienes una cuenta?",
    signIn: "Iniciar sesión",
  },
};

const RegistrationForm = () => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [passwordError, setPasswordError] = useState<string>("");
  const [openVerificationModal, setOpenVerificationModal] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationRequestType>({
    resolver: zodResolver(registrationRequestSchema),
  });

  // Handle submission of registration form
  const handleRegistrationRequestSubmit = async (
    data: RegistrationRequestType
  ) => {
    setPasswordError("");

    if (data.password !== data.retypePassword) {
      setPasswordError(t.passwordMismatch);
      return;
    }

    setLoading(true);

    const requestPayload: RegistrationRequestType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    const registrationRequestResponse = await accountRegistrationRequestAction(
      requestPayload
    );

    toast(registrationRequestResponse.message, {
      type: registrationRequestResponse.status ? "success" : "error",
    });

    if (registrationRequestResponse.status) {
      setEmail(requestPayload.email);
      setOpenVerificationModal(true);
    }

    setLoading(false);
  };

  // Handle OTP verification submission
  const handleConfirmRegistrationSubmit = async () => {
    setLoading(true);
    // Prepare payload (join otp together before sending)
    const payload = {
      email: email,
      otp: otp.join(""),
    };

    // Send OTP confirmation request
    const registrationConfirmationResponse =
      await accountRegistrationConfirmationAction(payload);

    // Show toast notification with confirmation result
    toast(registrationConfirmationResponse.message, {
      type: registrationConfirmationResponse.status ? "success" : "error",
    });

    // On successful OTP verification, reset form and navigate to login page
    if (registrationConfirmationResponse.status) {
      reset();
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <form
      className="w-full max-w-[600px] flex flex-col items-center gap-[42px]"
      onSubmit={handleSubmit(handleRegistrationRequestSubmit)}
    >
      <div className="w-full flex flex-col items-center gap-[40px]">
        <SubHeading title={t.title} />
        <div className="w-full flex items-center gap-2 border border-primaryBorder px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            {t.google}
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">{t.emailSignUp}</h5>
      </div>

      <div className="w-full flex flex-col items-center gap-[24px]">
        <div className="w-full flex items-start gap-[30px]">
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <UnderlineInput
                {...field}
                label={t.firstName}
                type="text"
                placeholder={t.firstName}
                error={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <UnderlineInput
                {...field}
                label={t.lastName}
                type="text"
                placeholder={t.lastName}
                error={errors.lastName?.message}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <UnderlineInput
              {...field}
              label={t.email}
              type="text"
              placeholder={t.email}
              error={errors.email?.message}
            />
          )}
        />

        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-start gap-[30px]">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label={t.password}
                  type="password"
                  placeholder={t.password}
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              name="retypePassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label={t.retypePassword}
                  type="password"
                  placeholder={t.retypePassword}
                  error={errors.retypePassword?.message}
                />
              )}
            />
          </div>
          {passwordError && <p className="text-red text-sm">{passwordError}</p>}
        </div>
      </div>

      <CommonButton
        label={loading && !openVerificationModal ? t.loading : t.signUp}
        disabled={loading || openVerificationModal}
        type="submit"
        className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
      />

      <div className="w-full flex flex-col items-center gap-[30px]">
        <div className="text-[12px] font-normal flex items-center gap-1">
          {t.termsText}
          <Link href="/terms-of-services" className="underline">
            {t.termsLink}
          </Link>
          and
          <Link href="/terms-of-services" className="underline">
            {t.privacyLink}
          </Link>
        </div>
        <div className="text-[14px] font-normal flex items-center gap-1">
          {t.alreadyAccount}
          <Link href="/login" className="underline">
            {t.signIn}
          </Link>
        </div>
      </div>

      {openVerificationModal && (
        <VerificationModal
          otp={otp}
          setOtp={setOtp}
          open={openVerificationModal}
          loading={loading}
          onConfirm={handleConfirmRegistrationSubmit}
        />
      )}
    </form>
  );
};

export default RegistrationForm;
