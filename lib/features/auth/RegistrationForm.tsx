"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import UnderlineInput from "@/lib/components/form-elements/UnderlineInput";
import {
  registrationRequestSchema,
  RegistrationRequestType,
} from "@/lib/schema/auth.schema";
import { accountRegistrationRequestAction } from "@/lib/action/auth/auth.action";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationRequestType>({
    resolver: zodResolver(registrationRequestSchema),
  });

  // function to handle registration request
  const handleRegistrationRequestSubmit = async (
    data: RegistrationRequestType & { retypePassword?: string }
  ) => {
    // Clear previous password error
    setPasswordError("");

    // Check if passwords match
    if (data.password !== data.retypePassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Set loading state
    setLoading(true);

    // Construct the payload to send (omit retypePassword)
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

    // Show toast notification with result message
    toast(registrationRequestResponse.message, {
      type: registrationRequestResponse.status ? "success" : "error",
    });

    // On success, reset form and navigate to login
    if (registrationRequestResponse.status) {
      reset();
    }
    setLoading(false);
  };

  return (
    <form
      className="w-full max-w-[600px] flex flex-col items-center gap-[42px]"
      onSubmit={handleSubmit(handleRegistrationRequestSubmit)}
    >
      <div className="w-full flex flex-col items-center gap-[40px]">
        <h2 className="text-[24px] font-medium text-primary">
          Create a New Account
        </h2>
        <div className="w-full flex items-center gap-2 border border-[#A1A1A1 px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            Continue with Google
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">or, sign up with your email</h5>
      </div>

      <div className="w-full flex flex-col items-center gap-[24px]">
        <div className="w-full flex items-start gap-[30px]">
          <Controller
            name="firstName"
            control={control}
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

        <Controller
          name="email"
          control={control}
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

        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-start gap-[30px]">
            <Controller
              name="password"
              control={control}
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
          {passwordError && <p className="text-red text-sm">{passwordError}</p>}
        </div>
      </div>

      <CommonButton
        label={loading ? "Loading..." : "Sign Up"}
        disabled={loading}
        type="submit"
        className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
      />
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
    </form>
  );
};

export default RegistrationForm;
