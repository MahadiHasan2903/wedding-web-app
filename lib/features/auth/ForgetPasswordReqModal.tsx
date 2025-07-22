"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import { SubHeading } from "@/lib/components/heading";
import UnderlineInput from "@/lib/components/form-elements/UnderlineInput";
import { forgetPasswordRequestAction } from "@/lib/action/auth/auth.action";
import {
  forgetPasswordRequestSchema,
  ForgetPasswordRequestType,
} from "@/lib/schema/auth.schema";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setOpenOtpVerificationModal: Dispatch<SetStateAction<boolean>>;
}

const ForgetPasswordReqModal = ({
  open,
  setOpen,
  setEmail,
  setOpenOtpVerificationModal,
}: PropsType) => {
  const [loading, setLoading] = useState(false);

  // Setup react-hook-form with zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordRequestType>({
    resolver: zodResolver(forgetPasswordRequestSchema),
  });

  // Handle forget password request form submission
  const handleSubmitForgetPasswordRequest = async (
    data: ForgetPasswordRequestType
  ) => {
    setLoading(true);

    // Prepare payload (exclude retypePassword)
    const requestPayload: ForgetPasswordRequestType = {
      email: data.email,
    };

    // Send forget password request to server
    const forgetPasswordResponse = await forgetPasswordRequestAction(
      requestPayload
    );

    // Show toast notification with server response message
    toast(forgetPasswordResponse.message, {
      type: forgetPasswordResponse.status ? "success" : "error",
    });

    // If forget password request is successful, store email and open OTP modal
    if (forgetPasswordResponse.status) {
      setEmail(requestPayload.email);
      setOpen(false);
      setOpenOtpVerificationModal(true);
    }

    setLoading(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/80 px-4 py-5"
          onClick={() => {
            if (!loading) {
              setOpen(false);
            }
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[600px] rounded-[10px] bg-white px-[36px] py-[24px] flex flex-col gap-[30px]"
          >
            <SubHeading title="Forget Password" />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label="Enter your email address"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                />
              )}
            />
            <CommonButton
              type="button"
              label={loading ? "Loading..." : "Reset Password"}
              disabled={loading}
              onClick={handleSubmit(handleSubmitForgetPasswordRequest)}
              className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPasswordReqModal;
