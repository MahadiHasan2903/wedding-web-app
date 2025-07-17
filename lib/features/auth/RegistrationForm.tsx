"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import VerificationModal from "./VerificationModal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { AuthSectionTitle } from "@/lib/components/heading";
import UnderlineInput from "@/lib/components/form-elements/UnderlineInput";
import {
  registrationRequestSchema,
  RegistrationRequestType,
} from "@/lib/schema/auth.schema";
import {
  accountRegistrationConfirmationAction,
  accountRegistrationRequestAction,
} from "@/lib/action/auth/auth.action";

const RegistrationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [passwordError, setPasswordError] = useState<string>("");
  const [openVerificationModal, setOpenVerificationModal] = useState(false);

  // Initialize react-hook-form with zod validation schema
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
    setPasswordError(""); // Clear previous password error

    if (data.password !== data.retypePassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Prepare payload (exclude retypePassword)
    const requestPayload: RegistrationRequestType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    // Send registration request to server
    const registrationRequestResponse = await accountRegistrationRequestAction(
      requestPayload
    );

    // Show toast notification with server response message
    toast(registrationRequestResponse.message, {
      type: registrationRequestResponse.status ? "success" : "error",
    });

    // If registration successful, store email and open OTP modal
    if (registrationRequestResponse.status) {
      setEmail(requestPayload.email);
      setOpenVerificationModal(true);
    }

    setLoading(false);
  };

  // Handle OTP verification submission
  const handleConfirmRegistrationSubmit = async () => {
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
  };

  return (
    <form
      className="w-full max-w-[600px] flex flex-col items-center gap-[42px]"
      onSubmit={handleSubmit(handleRegistrationRequestSubmit)}
    >
      <div className="w-full flex flex-col items-center gap-[40px]">
        <AuthSectionTitle title="Create a New Account" />
        <div className="w-full flex items-center gap-2 border border-[#A1A1A1] px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            Continue with Google
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">or, sign up with your email</h5>
      </div>

      <div className="w-full flex flex-col items-center gap-[24px]">
        <div className="w-full flex items-start gap-[30px]">
          {/* First Name input */}
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
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
          {/* Last Name input */}
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
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

        {/* Email input */}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <UnderlineInput
              {...field}
              label="Email"
              type="text"
              placeholder="Enter your email"
              error={errors.email?.message}
            />
          )}
        />

        {/* Password and Retype Password inputs */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-start gap-[30px]">
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
          </div>
          {/* Display password mismatch error */}
          {passwordError && <p className="text-red text-sm">{passwordError}</p>}
        </div>
      </div>

      {/* Submit button disabled during loading or OTP verification */}
      <CommonButton
        label={loading && !openVerificationModal ? "Loading..." : "Sign Up"}
        disabled={loading || openVerificationModal}
        type="submit"
        className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
      />

      {/* Terms of service and sign-in links */}
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
          Already have an account?
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>

      {/* OTP verification modal shown after registration request */}
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
