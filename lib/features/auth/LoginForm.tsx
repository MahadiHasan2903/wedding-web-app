"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import VerificationModal from "./VerificationModal";
import { signIn, useSession } from "next-auth/react";
import { SubHeading } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import ForgetPasswordReqModal from "./ForgetPasswordReqModal";
import { UnderlineInput } from "@/lib/components/form-elements";
import { loginSchema, LoginType } from "@/lib/schema/auth/auth.schema";
import { forgetPasswordConfirmationAction } from "@/lib/action/auth/auth.action";

interface PropsType {
  callbackUrl?: string;
}

const translations = {
  en: {
    signInTitle: "Sign in to Your Account",
    continueWithGoogle: "Continue with Google",
    orSignInEmail: "or, sign in with your email",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot your password?",
    loading: "Loading...",
    signIn: "Sign In",
    termsAgreement: "By joining, you agree to our",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    loginSuccess: "Logged in successfully",
    loginFailed: "Login failed. Please check your credentials",
    loginError: "An error occurred during login.",
  },
  fr: {
    signInTitle: "Connectez-vous à votre compte",
    continueWithGoogle: "Continuer avec Google",
    orSignInEmail: "ou connectez-vous avec votre e-mail",
    email: "E-mail",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    loading: "Chargement...",
    signIn: "Se connecter",
    termsAgreement: "En rejoignant, vous acceptez nos",
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    noAccount: "Vous n'avez pas de compte ?",
    signUp: "Inscription",
    loginSuccess: "Connecté avec succès",
    loginFailed: "Échec de la connexion. Vérifiez vos identifiants",
    loginError: "Une erreur est survenue lors de la connexion.",
  },
  es: {
    signInTitle: "Inicia sesión en tu cuenta",
    continueWithGoogle: "Continuar con Google",
    orSignInEmail: "o inicia sesión con tu correo electrónico",
    email: "Correo electrónico",
    password: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loading: "Cargando...",
    signIn: "Iniciar sesión",
    termsAgreement: "Al unirte, aceptas nuestros",
    termsOfService: "Términos de servicio",
    privacyPolicy: "Política de privacidad",
    noAccount: "¿No tienes una cuenta?",
    signUp: "Regístrate",
    loginSuccess: "Inicio de sesión exitoso",
    loginFailed: "Error al iniciar sesión. Verifica tus credenciales",
    loginError: "Ocurrió un error durante el inicio de sesión.",
  },
};

const LoginForm = ({ callbackUrl }: PropsType) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [openForgetPasswordModal, setOpenForgetPasswordModal] = useState(false);
  const [openOtpVerificationModal, setOpenOtpVerificationModal] =
    useState(false);

  const { language } = useLanguageStore();
  const t = translations[language];

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.ok) {
        toast.success(t.loginSuccess);
        const updatedSession = await getSession();
        const user = updatedSession?.user;
        const accessToken = user?.accessToken;
        const isAdmin = user?.data.userRole === "admin";

        if (callbackUrl) router.push(callbackUrl);
        else if (accessToken)
          router.push(isAdmin ? "/overview" : "/my-profile");
        else router.push("/");
      } else {
        toast.error(t.loginFailed);
      }
    } catch {
      toast.error(t.loginError);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    const payload = { email: email, otp: otp.join("") };
    const forgetPasswordConfirmationResponse =
      await forgetPasswordConfirmationAction(payload);

    toast(forgetPasswordConfirmationResponse.message, {
      type: forgetPasswordConfirmationResponse.status ? "success" : "error",
    });

    if (forgetPasswordConfirmationResponse.status) {
      reset();
      router.push(`/reset-password?email=${payload.email}&otp=${payload.otp}`);
    }
  };

  return (
    <form
      className="w-full max-w-[600px] flex flex-col items-center gap-[42px]"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <div className="w-full flex flex-col items-center gap-[40px]">
        <SubHeading title={t.signInTitle} />
        <div className="w-full flex items-center gap-2 border border-primaryBorder px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            {t.continueWithGoogle}
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">{t.orSignInEmail}</h5>
      </div>

      <div className="w-full flex flex-col items-center gap-[24px]">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <UnderlineInput
              {...field}
              label={t.email}
              type="email"
              placeholder={t.email}
              error={errors.email?.message}
            />
          )}
        />

        <div className="w-full flex flex-col items-start gap-2">
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
          <button
            type="button"
            onClick={() => !loading && setOpenForgetPasswordModal(true)}
            className="text-[12px] font-normal underline"
          >
            {t.forgotPassword}
          </button>
        </div>
      </div>

      <CommonButton
        label={loading ? t.loading : t.signIn}
        disabled={loading || openForgetPasswordModal}
        type="submit"
        className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
      />

      <div className="w-full flex flex-col items-center gap-[30px]">
        <div className="text-[12px] font-normal flex items-center gap-1">
          {t.termsAgreement}
          <Link href="/terms-of-services" className="underline">
            {t.termsOfService}
          </Link>
          and
          <Link href="/terms-of-services" className="underline">
            {t.privacyPolicy}
          </Link>
        </div>
        <div className="text-[14px] font-normal flex items-center gap-1">
          {t.noAccount}
          <Link href="/registration" className="underline">
            {t.signUp}
          </Link>
        </div>
      </div>

      {openForgetPasswordModal && (
        <ForgetPasswordReqModal
          setEmail={setEmail}
          open={openForgetPasswordModal}
          setOpen={setOpenForgetPasswordModal}
          setOpenOtpVerificationModal={setOpenOtpVerificationModal}
        />
      )}

      {openOtpVerificationModal && (
        <VerificationModal
          otp={otp}
          setOtp={setOtp}
          loading={loading}
          open={openOtpVerificationModal}
          onConfirm={handleOtpVerification}
        />
      )}
    </form>
  );
};

export default LoginForm;
