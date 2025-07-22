"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { SubHeading } from "@/lib/components/heading";
import ForgetPasswordReqModal from "./ForgetPasswordReqModal";
import { loginSchema, LoginType } from "@/lib/schema/auth.schema";
import UnderlineInput from "@/lib/components/form-elements/UnderlineInput";
import VerificationModal from "./VerificationModal";
import { forgetPasswordConfirmationAction } from "@/lib/action/auth/auth.action";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [openForgetPasswordModal, setOpenForgetPasswordModal] = useState(false);
  const [openOtpVerificationModal, setOpenOtpVerificationModal] =
    useState(false);

  // Setup react-hook-form with zod validation
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  // Handle login form submission
  const handleLoginSubmit = async (data: LoginType) => {
    try {
      setLoading(true);

      // Call next-auth signIn with credentials provider (no redirect)
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response && !response.ok) {
        toast.error("Login failed. Please check your credentials");
      } else {
        toast.success("Logged in successfully");
        router.push("/");
      }
    } catch {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  // Handle otp verification
  const handleOtpVerification = async () => {
    // Prepare payload (join otp together before sending)
    const payload = {
      email: email,
      otp: otp.join(""),
    };

    // Send OTP confirmation request
    const forgetPasswordConfirmationResponse =
      await forgetPasswordConfirmationAction(payload);

    // Show toast notification with confirmation result
    toast(forgetPasswordConfirmationResponse.message, {
      type: forgetPasswordConfirmationResponse.status ? "success" : "error",
    });

    // On successful OTP verification, navigate to password reset page
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
        <SubHeading title="Sign in to Your Account" />
        <div className="w-full flex items-center gap-2 border border-[#A1A1A1] px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            Continue with Google
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">or, sign in with your email</h5>
      </div>

      <div className="w-full flex flex-col items-center gap-[24px]">
        {/* Email input field */}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <UnderlineInput
              {...field}
              label="Email"
              type="number"
              placeholder="Enter your email"
              error={errors.email?.message}
            />
          )}
        />

        <div className="w-full flex flex-col items-start gap-2">
          {/* Password input field */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <UnderlineInput
                {...field}
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
              />
            )}
          />
          {/* Forgot password link */}
          <button
            type="button"
            onClick={() => {
              if (!loading) {
                setOpenForgetPasswordModal(true);
              }
            }}
            className="text-[12px] font-normal underline"
          >
            Forgot your password?
          </button>
        </div>
      </div>

      {/* Submit button, disabled while loading */}
      <CommonButton
        label={loading ? "Loading..." : "Sign In"}
        disabled={loading || openForgetPasswordModal}
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
      {/* Forget password request sending modal */}
      {openForgetPasswordModal && (
        <ForgetPasswordReqModal
          setEmail={setEmail}
          open={openForgetPasswordModal}
          setOpen={setOpenForgetPasswordModal}
          setOpenOtpVerificationModal={setOpenOtpVerificationModal}
        />
      )}

      {/* OTP verification modal shown after registration request */}
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
