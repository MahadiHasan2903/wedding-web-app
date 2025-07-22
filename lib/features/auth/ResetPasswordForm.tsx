"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { SubHeading } from "@/lib/components/heading";
import { resetPasswordAction } from "@/lib/action/auth/auth.action";
import UnderlineInput from "@/lib/components/form-elements/UnderlineInput";
import {
  resetPasswordSchema,
  ResetPasswordType,
} from "@/lib/schema/auth.schema";

interface PropsType {
  email: string;
  otp: string;
}

const ResetPasswordForm = ({ email, otp }: PropsType) => {
  const router = useRouter();
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

    if (data.newPassword !== data.retypePassword) {
      setPasswordError("Passwords do not match");
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
        <SubHeading title="Reset Your Password" />
        <div className="w-full flex items-center gap-2 border border-[#A1A1A1 px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            Continue with Google
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">or, sign in with your email</h5>
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
              label="Password"
              type="password"
              placeholder="Enter your password"
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
              label="Retype Password"
              type="password"
              placeholder="Retype your password"
              error={errors.retypePassword?.message}
            />
          )}
        />
        {passwordError && <p className="text-red text-sm">{passwordError}</p>}
      </div>

      {/* Submit button, disabled while loading */}
      <CommonButton
        label={loading ? "Loading..." : "Reset Password"}
        disabled={loading}
        type="submit"
        className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
      />

      {/* Terms of service and sign up links */}
      <div className="w-full flex flex-col items-center gap-[30px]">
        <div className="text-[12px] font-normal flex items-center gap-1">
          By joining, you agree to our
          <Link href="/terms-of-services" className="underline">
            Terms of Service
          </Link>
          and
          <Link href="/terms-of-services" className="underline">
            Privacy Policy
          </Link>
        </div>
        <div className="text-[14px] font-normal flex items-center gap-1">
          Don't have an account?
          <Link href="/registration" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
