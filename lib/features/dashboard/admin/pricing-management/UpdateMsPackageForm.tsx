"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  updateMsPackageSchema,
  UpdateMsPackageType,
} from "@/lib/schema/ms-package/msPackage.types";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import { UnderlineInput } from "@/lib/components/form-elements";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";
import { updateMsPackageAction } from "@/lib/action/ms-package/msPackage.action";

interface PropsType {
  open: boolean;
  msPackageDetails: MembershipPackage;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateMsPackageForm = ({
  open,
  setOpen,
  msPackageDetails,
}: PropsType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Setup react-hook-form with Zod validation and initialize default values
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMsPackageType>({
    resolver: zodResolver(updateMsPackageSchema),
    defaultValues: {
      title: msPackageDetails.title,
      description: msPackageDetails.description,
      categoryInfo: {
        category: msPackageDetails.categoryInfo.category,
        originalPrice: msPackageDetails.categoryInfo.originalPrice,
        sellPrice: msPackageDetails.categoryInfo.sellPrice,
      },
    },
  });

  // Handle form submission to update the membership package
  const handleUpdateMsPackage = async (data: UpdateMsPackageType) => {
    setLoading(true);

    const payload = {
      title: data.title,
      description: data.description,
      categoryInfo: {
        category: data.categoryInfo.category,
        originalPrice: data.categoryInfo.originalPrice,
        sellPrice: data.categoryInfo.sellPrice,
      },
    };

    const updateMsPackageResponse = await updateMsPackageAction(
      msPackageDetails.id,
      payload
    );

    toast(updateMsPackageResponse.message, {
      type: updateMsPackageResponse.status ? "success" : "error",
    });

    if (updateMsPackageResponse.status) {
      setOpen(false);
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
          <div className="w-full h-full max-w-[600px] max-h-[500px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
            <form
              onSubmit={handleSubmit(handleUpdateMsPackage)}
              className="w-full h-full flex flex-col gap-[25px]"
            >
              <CardTitle title="Update Membership Package" />
              <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
                <Controller
                  name="title"
                  control={control}
                  defaultValue={msPackageDetails.title}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label="Package Title"
                      type="text"
                      name="title"
                      placeholder="Enter membership package title"
                      error={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="categoryInfo.originalPrice"
                  control={control}
                  defaultValue={msPackageDetails.categoryInfo.originalPrice}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label="Original Price"
                      type="number"
                      name="categoryInfo.originalPrice"
                      placeholder="Enter original price"
                      error={errors.categoryInfo?.originalPrice?.message}
                    />
                  )}
                />
                <Controller
                  name="categoryInfo.sellPrice"
                  control={control}
                  defaultValue={msPackageDetails.categoryInfo.sellPrice}
                  render={({ field }) => (
                    <UnderlineInput
                      {...field}
                      label="Selling Price"
                      type="number"
                      name="categoryInfo.sellPrice"
                      placeholder="Enter selling price"
                      error={errors.categoryInfo?.sellPrice?.message}
                    />
                  )}
                />
              </div>

              {/* Form submit and cancel buttons */}
              <div className="flex items-center gap-[30px] text-[14px]">
                <CommonButton
                  type="submit"
                  label={`${loading ? "Saving..." : "Save"}`}
                  disabled={loading}
                  className="w-full bg-green text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
                />
                <CommonButton
                  onClick={() => setOpen(false)}
                  label="Cancel"
                  className="w-full bg-red text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateMsPackageForm;
