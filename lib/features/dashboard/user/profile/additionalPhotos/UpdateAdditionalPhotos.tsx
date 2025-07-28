"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { MdDelete } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateUserType,
  updateUserSchema,
} from "@/lib/schema/user/user.schema";
import { updateUserProfileAction } from "@/lib/action/user/user.action";
import { toast } from "react-toastify";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: User;
}

const UpdateAdditionalPhotos = ({ open, setOpen, userProfile }: PropsType) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Initialize React Hook Form with Zod schema and default values
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: userProfile.firstName ?? "",
      lastName: userProfile.lastName ?? "",
      additionalPhotos: userProfile.additionalPhotos || [],
    },
  });

  // Trigger the hidden file input when upload button is clicked
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection, enforce 10-photo limit, and clear input value
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total =
      userProfile.additionalPhotos.length + selectedFiles.length + files.length;

    if (total > 10) {
      toast.error("You can upload a maximum of 10 photos.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove a selected file by index
  const handleDeleteFile = (indexToDelete: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  // Submit handler to update user profile with new photos
  const handleUpdateProfile = async () => {
    const totalPhotos =
      userProfile.additionalPhotos.length + selectedFiles.length;

    if (totalPhotos > 10) {
      toast.error("You can upload a maximum of 10 photos.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("additionalPhotos", file);
    });

    const updateProfileResponse = await updateUserProfileAction(formData);

    toast(updateProfileResponse.message, {
      type: updateProfileResponse.status ? "success" : "error",
    });

    if (updateProfileResponse.status) {
      setOpen(false);
      router.refresh();
    }

    setLoading(false);
  };

  return (
    open && (
      <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
        <div className="w-full h-full max-w-[600px] max-h-[600px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="w-full h-full flex flex-col gap-[25px]"
          >
            <CardTitle title="Contact & Accessibility" />

            <div
              className={`${
                selectedFiles.length === 0 ? "justify-center" : "justify-start"
              } w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]`}
            >
              <div className="w-full grid grid-cols-3 gap-[25px]">
                {selectedFiles.length > 0 ? (
                  selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="w-[120px] h-[140px] relative overflow-hidden"
                    >
                      <ImageWithFallback
                        src={URL.createObjectURL(file)}
                        fill
                        alt={`Selected ${index}`}
                        className="w-full h-full object-cover rounded-[10px] border border-primaryBorder"
                      />
                      <div
                        onClick={() => handleDeleteFile(index)}
                        className="absolute bottom-1 right-1 w-[20px] h-[20px] flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer p-1"
                      >
                        <MdDelete size={18} className="text-red" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="w-full text-md font-medium text-center col-span-3">
                    No photo selected
                  </p>
                )}
              </div>

              <CommonButton
                type="button"
                label="Upload Photo"
                onClick={handleUploadClick}
                className="w-full bg-transparent text-black font-semibold border border-primaryBorder text-[12px] p-[10px] rounded-full"
              />
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png, .jpg, .jpeg, .webp, .svg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-[30px] text-[14px]">
              <CommonButton
                type="submit"
                label={loading ? "Saving..." : "Save"}
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
    )
  );
};

export default UpdateAdditionalPhotos;
