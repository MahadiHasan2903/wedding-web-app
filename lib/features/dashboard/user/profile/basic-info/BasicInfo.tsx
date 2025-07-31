"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  getStateNameFromIso,
  getCountryNameFromIso,
} from "@/lib/utils/helpers";
import {
  editIcon,
  facebook,
  instagram,
  linkedin,
  sendMessage,
  tiktok,
  twitter,
  whatsapp,
} from "@/lib/components/image/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { StaticImageData } from "next/image";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import BasicInfoUpdateForm from "./BasicInfoUpdateForm";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";
import { calculateAgeFromDOB } from "@/lib/utils/dateUtils";
import { updateUserProfileAction } from "@/lib/action/user/user.action";
import userPlaceholder from "@/public/images/common/user-placeholder.png";
import { updateLikeDisLikeStatusAction } from "@/lib/action/user/userInteraction.action";

const iconMap: Record<string, StaticImageData> = {
  facebook,
  instagram,
  linkedin,
  tiktok,
  twitter,
  whatsapp,
};

interface PropsType {
  userProfile: User;
  isLiked?: boolean;
  editable?: boolean;
  returnUrl?: string;
}

const BasicInfo = ({
  userProfile,
  isLiked,
  editable = false,
  returnUrl,
}: PropsType) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const { data: session } = useSession();
  const membershipId =
    session?.user.data.purchasedMembership?.membershipPackageInfo?.id;
  const isVipUser = membershipId !== undefined && [2, 3].includes(membershipId);

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  // Function to update like/dislike status
  const handleUpdateLikeStatus = async () => {
    setLoading(true);
    const payload = {
      likedUserId: userProfile.id,
      status: isLiked ? "dislike" : "like",
    };

    const updateLikeStatusResponse = await updateLikeDisLikeStatusAction(
      payload
    );

    // Show toast notification based on API response success or failure
    toast(updateLikeStatusResponse.message, {
      type: updateLikeStatusResponse.status ? "success" : "error",
    });

    // If update successful, close modal and refresh page data
    if (updateLikeStatusResponse.status) {
      if (returnUrl) {
        router.push(returnUrl);
      }
      router.refresh();
    }
    setLoading(false);
  };

  // Function to update profile picture
  const handleUpdateProfilePicture = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImageUrl(previewUrl);
      console.log("Selected profile image:", file);

      const formData = new FormData();
      formData.append("profilePicture", file);

      setLoading(true);

      const updateProfileResponse = await updateUserProfileAction(formData);

      toast(updateProfileResponse.message, {
        type: updateProfileResponse.status ? "success" : "error",
      });

      if (updateProfileResponse.status) {
        router.refresh();
      }

      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col xl:flex-row items-start xl:items-center gap-[20px] lg:gap-[40px] xl:gap-[100px] bg-white rounded-none lg:rounded-[10px] px-[18px] py-[12px] lg:px-[36px] lg:py-[20px]">
      <div className="w-auto shrink-0 flex items-center gap-[16px]">
        <label
          className={`${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } w-[90px] lg:w-[150px] h-[90px] lg:h-[160px] relative flex items-center justify-center`}
          htmlFor={editable ? "profilePictureUpload" : undefined}
        >
          <input
            type="file"
            id="profilePictureUpload"
            accept="image/*"
            hidden
            onChange={handleUpdateProfilePicture}
            disabled={!editable || loading}
          />

          <div className="w-[85px] lg:w-[145px] h-[85px] lg:h-[145px] relative overflow-hidden">
            <ImageWithFallback
              fill
              alt="user"
              src={previewImageUrl || userProfile.profilePicture?.url}
              fallBackImage={userPlaceholder}
              className="rounded-full object-cover border border-black"
            />
          </div>

          {isVipUser && (
            <div className="absolute w-[95px] lg:w-[150px] h-[95px] lg:h-[160px] top-[2px] z-10">
              <ImageWithFallback
                src={vipRing}
                fill
                alt="VIP Ring"
                className="rounded-full object-contain"
              />
            </div>
          )}
        </label>

        <div className="flex flex-col items-start gap-1 lg:gap-[15px]">
          <div>
            <h2 className="text-[14px] lg:text-[20px] font-medium text-primary">
              <CardTitle
                title={`${userProfile.firstName} ${userProfile.lastName}`}
              />
            </h2>
            <p className="text-[12px] lg:text-[14px] font-medium">
              {userProfile.dateOfBirth
                ? `${calculateAgeFromDOB(userProfile.dateOfBirth)} Years Old`
                : "Age Unknown"}
              {userProfile.gender && `, ${userProfile.gender}`}
            </p>
          </div>
          <div>
            <p className="text-[12px] lg:text-[14px] font-normal text-justify">
              <span className="font-medium">Location:</span>{" "}
              <span className="capitalize">
                {getStateNameFromIso(userProfile.country, userProfile.city) ||
                  "N/A"}
                , {getCountryNameFromIso(userProfile.country) || "N/A"},
              </span>
            </p>
            <p className="text-[12px] lg:text-[14px] font-normal capitalize">
              <span className="font-medium">Nationality:</span>{" "}
              <span className="capitalize">
                {userProfile.nationality || "N/A"}
              </span>
            </p>
            <p className="text-[12px] lg:text-[14px] font-normal capitalize">
              <span className="font-medium">Marital Status:</span>{" "}
              <span className="capitalize">
                {userProfile.maritalStatus || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-[20px]">
        <p className="text-[12px] lg:text-[14px] font-normal text-justify">
          {userProfile.bio || "My bio ..."}
        </p>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            {userProfile.socialMediaLinks?.map(({ name, link }) => {
              const icon = iconMap[name.toLowerCase()];
              if (!icon) {
                return null;
              }

              return (
                <Link
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImageWithFallback
                    src={icon}
                    width={20}
                    height={20}
                    alt={name}
                  />
                </Link>
              );
            })}
          </div>
          {editable ? (
            <CommonButton
              label="Edit Info"
              onClick={() => setOpen(true)}
              className="w-fit flex items-center gap-[8px] bg-transparent border border-primaryBorder text-black text-[10px] font-normal rounded-full p-[6px] lg:p-[10px]"
              startIcon={
                <ImageWithFallback
                  src={editIcon}
                  width={13}
                  height={13}
                  alt="edit-icon"
                />
              }
            />
          ) : (
            <div className="flex items-center justify-center gap-2 lg:gap-[15px]">
              <CommonButton
                label={
                  loading
                    ? isLiked
                      ? "Disliking Profile..."
                      : "Liking Profile..."
                    : isLiked
                    ? "Dislike Profile"
                    : "Like Profile"
                }
                disabled={loading}
                onClick={handleUpdateLikeStatus}
                className="w-fit bg-primary border text-white flex items-center gap-[5px] text-[10px] lg:text-[14px] font-normal px-[20px] py-[10px] rounded-full"
              />
              {returnUrl && returnUrl === "/liked-profiles" && (
                <CommonButton
                  label="Send Message"
                  className={`${
                    isVipUser
                      ? "btn-gold-gradient border-none"
                      : "bg-transparent border border-primaryBorder text-black"
                  } w-fit flex items-center gap-[5px] text-[10px] lg:text-[14px] font-normal px-[20px] py-[10px] rounded-full`}
                  startIcon={
                    <ImageWithFallback
                      src={sendMessage}
                      width={15}
                      height={15}
                      alt="red-heart"
                    />
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
      {open && (
        <BasicInfoUpdateForm
          open={open}
          setOpen={setOpen}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default BasicInfo;
