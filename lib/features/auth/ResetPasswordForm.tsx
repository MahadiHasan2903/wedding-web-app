"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  resetPasswordSchema,
  ResetPasswordType,
} from "@/lib/schema/auth/auth.schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { SubHeading } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { UnderlineInput } from "@/lib/components/form-elements";
import { resetPasswordAction } from "@/lib/action/auth/auth.action";

// Translation object
const translations = {
  en: {
    title: "Reset Your Password",
    google: "Continue with Google",
    emailSignIn: "or, sign in with your email",
    password: "Password",
    retypePassword: "Retype Password",
    passwordMismatch: "Passwords do not match",
    loading: "Loading...",
    resetButton: "Reset Password",
    termsText: "By joining, you agree to our",
    termsLink: "Terms of Service",
    privacyLink: "Privacy Policy",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
  },
  fr: {
    title: "Réinitialisez votre mot de passe",
    google: "Continuer avec Google",
    emailSignIn: "ou, connectez-vous avec votre e-mail",
    password: "Mot de passe",
    retypePassword: "Retapez le mot de passe",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    loading: "Chargement...",
    resetButton: "Réinitialiser le mot de passe",
    termsText: "En rejoignant, vous acceptez nos",
    termsLink: "Conditions d'utilisation",
    privacyLink: "Politique de confidentialité",
    noAccount: "Vous n'avez pas de compte ?",
    signUp: "S'inscrire",
  },
  es: {
    title: "Restablece tu contraseña",
    google: "Continuar con Google",
    emailSignIn: "o, inicia sesión con tu correo electrónico",
    password: "Contraseña",
    retypePassword: "Reescriba la contraseña",
    passwordMismatch: "Las contraseñas no coinciden",
    loading: "Cargando...",
    resetButton: "Restablecer contraseña",
    termsText: "Al unirse, aceptas nuestros",
    termsLink: "Términos de servicio",
    privacyLink: "Política de privacidad",
    noAccount: "¿No tienes una cuenta?",
    signUp: "Regístrate",
  },
};

interface PropsType {
  email: string;
  otp: string;
}

const ResetPasswordForm = ({ email, otp }: PropsType) => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");

  // Setup react-hook-form with zod validation
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      otp: otp,
    },
  });

  // Handle reset password request form submission
  const handleResetPasswordSubmit = async (data: ResetPasswordType) => {
    setPasswordError("");

    // Check if passwords match
    if (data.newPassword !== data.retypePassword) {
      setPasswordError(t.passwordMismatch);
      return;
    }

    setLoading(true);

    // Prepare payload (exclude retypePassword)
    const requestPayload: ResetPasswordType = {
      email: data.email,
      otp: data.otp,
      newPassword: data.newPassword,
    };

    // Send reset password request to server
    const resetPasswordResponse = await resetPasswordAction(requestPayload);

    // Show toast notification with server response message
    toast(resetPasswordResponse.message, {
      type: resetPasswordResponse.status ? "success" : "error",
    });

    // If reset password is successful then redirect to login
    if (resetPasswordResponse.status) {
      reset();
      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <form
      className="w-full max-w-[600px] flex flex-col items-center gap-[42px]"
      onSubmit={handleSubmit(handleResetPasswordSubmit)}
    >
      <div className="w-full flex flex-col items-center gap-[40px]">
        <SubHeading title={t.title} />
        <div className="w-full flex items-center gap-2 border border-[#A1A1A1] px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            {t.google}
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">{t.emailSignIn}</h5>
      </div>

      <div className="w-full flex flex-col items-start gap-[24px]">
        {/* Password input field */}
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <UnderlineInput
              {...field}
              label={t.password}
              type="password"
              placeholder={t.password}
              error={errors.newPassword?.message}
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
        {/* Display password mismatch error */}
        {passwordError && <p className="text-red text-sm">{passwordError}</p>}
      </div>

      {/* Submit button, disabled while loading */}
      <CommonButton
        label={loading ? t.loading : t.resetButton}
        disabled={loading}
        type="submit"
        className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
      />

      {/* Terms of service and sign up links */}
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
          {t.noAccount}
          <Link href="/registration" className="underline">
            {t.signUp}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
