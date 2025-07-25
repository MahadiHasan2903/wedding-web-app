"use client";
import React, { FC, Dispatch, SetStateAction } from "react";
import { User } from "@/lib/types/user/user.types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardTitle } from "@/lib/components/heading";
import {
  updateUserSchema,
  UpdateUserType,
} from "@/lib/schema/user/user.schema";
import UnderlineInput from "@/lib/components/form-elements/UnderlineInput";
import { SelectField } from "@/lib/components/form-elements/advance-search";
import { Gender } from "@/lib/enums/users.enum";
import { enumToOptions } from "@/lib/utils/helpers";
import { CommonButton } from "@/lib/components/buttons";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

const BasicInfoUpdateForm = ({ open, setOpen, userProfile }: PropsType) => {
  // Setup react-hook-form with zod validation
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
  });

  const handleUpdateProfile = async (data: UpdateUserType) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <>
      {open && (
        <div
          className={`fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5 ${
            open ? "block" : "hidden"
          }`}
        >
          <div className="w-full max-w-[600px] rounded-[10px] bg-white p-[35px]">
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="w-full h-full flex flex-col gap-[35px]"
            >
              <CardTitle title="Basic Info" />
              <div className="w-full h-full flex flex-col gap-[22px]">
                <div className="flex items-center gap-[35px]">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <UnderlineInput
                        {...field}
                        label="First Name"
                        type="text"
                        placeholder="Enter your firstName"
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
                        label="Last Name"
                        type="text"
                        placeholder="Enter your last name"
                        error={errors.lastName?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-[30px] text-[14px]">
                <CommonButton
                  onClick={() => setOpen(false)}
                  label="Save"
                  className="w-full bg-green text-white font-bold p-[10px] rounded-full"
                />
                <CommonButton
                  onClick={() => setOpen(false)}
                  label="Cancel"
                  className="w-full bg-red text-white font-bold p-[10px] rounded-full"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicInfoUpdateForm;
