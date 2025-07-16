"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { google } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { loginSchema, LoginType } from "@/lib/schema/auth.schema";
import UnderlineInput from "@/lib/components/form-elements/UnderlineInput";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  // Function to handle login request
  const handleLoginSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
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
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-[600px] flex flex-col items-center gap-[42px]"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <div className="w-full flex flex-col items-center gap-[40px]">
        <h2 className="text-[24px] font-medium text-primary">
          Sign in to Your Account
        </h2>
        <div className="w-full flex items-center gap-2 border border-[#A1A1A1 px-[20px] py-[12px] rounded-[10px]">
          <ImageWithFallback src={google} width={16} height={16} alt="google" />
          <h3 className="w-full text-[14px] text-center font-normal">
            Continue with Google
          </h3>
        </div>
        <h5 className="text-[14px] font-normal">or, sign in with your email</h5>
      </div>

      <div className="w-full flex flex-col items-center gap-[24px]">
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

        <div className="w-full flex flex-col items-start gap-2">
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
          <button type="button" className="text-[12px] font-normal underline">
            Forgot your password?
          </button>
        </div>
      </div>

      <CommonButton
        label={loading ? "Loading..." : "Sign In"}
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
          <Link href="/registration" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
