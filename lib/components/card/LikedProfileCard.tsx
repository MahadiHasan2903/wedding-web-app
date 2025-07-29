"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/user/user.types";
import { CommonButton } from "@/lib/components/buttons";
import { sendMessage, whiteHeart } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { calculateAgeFromDOB } from "@/lib/utils/dateUtils";
import vipRing2 from "@/public/images/common/vip-ring-2.png";
import userPlaceholder from "@/public/images/common/user-placeholder.png";

interface LikedProfileCardProps {
  user: User;
}

const LikedProfileCard = ({ user }: LikedProfileCardProps) => {
  const router = useRouter();
  const isVipUser = user.purchasedMembership?.membershipPackageInfo.id === 2;

  // Function to redirect user based on token
  const handleRedirection = () => {
    router.push(`/liked-profiles/${user.id}`);
  };

  return (
    <div
      onClick={handleRedirection}
      className={`w-[160px] sm:w-[180px] lg:w-[240px] cursor-pointer h-auto sm:h-[250px] lg:h-[350px] mx-auto flex flex-col items-center rounded-[10px] py-[8px] lg:py-[25px] ${
        isVipUser ? "bg-vip-gradient" : "bg-white"
      }`}
    >
      <div className="w-[90px] lg:w-[150px] h-[90px] lg:h-[160px] relative flex items-center justify-center">
        <div className="w-[80px] lg:w-[145px] h-[80px] lg:h-[145px] relative overflow-hidden">
          <ImageWithFallback
            fill
            alt="user"
            src={user.profilePicture?.url}
            fallBackImage={userPlaceholder}
            className="rounded-full object-cover"
          />
        </div>

        {isVipUser && (
          <div className="absolute w-[90px] lg:w-[150px] h-[90px] lg:h-[160px] top-[2px] lg:top-[-3px] z-10">
            <ImageWithFallback
              src={vipRing2}
              fill
              alt="VIP Ring"
              className="rounded-full object-contain"
            />
          </div>
        )}
      </div>

      <div
        className={`${
          isVipUser ? "bg-gold-gradient" : "bg-transparent"
        } w-full flex flex-col py-1 items-center gap-[8px] mb-[8px] lg:mb-[25px]`}
      >
        <h2 className="text-[14px] lg:text-[20px] font-medium">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-[12px] lg:text-[14px] font-medium">
          {user.dateOfBirth
            ? `${calculateAgeFromDOB(user.dateOfBirth)} Years Old`
            : "Age Unknown"}
          , {user.gender ?? "N/A"}
        </p>
      </div>

      <div className="w-full flex items-center justify-center gap-2 lg:gap-[15px]">
        <CommonButton
          label="Liked"
          className={`${
            isVipUser
              ? "btn-gold-gradient border-none"
              : "bg-red border border-primaryBorder text-white"
          } w-fit flex items-center gap-[5px] text-[10px] font-normal p-[8px] lg:p-[10px] rounded-full`}
          labelStyle="hidden lg:block"
          startIcon={
            <ImageWithFallback
              src={whiteHeart}
              width={13}
              height={12}
              alt="red-heart"
            />
          }
        />
        <CommonButton
          label="Send Message"
          className={`${
            isVipUser
              ? "btn-gold-gradient border-none"
              : "bg-transparent border border-primaryBorder text-black"
          } w-fit flex items-center gap-[5px] text-[10px] font-normal p-[8px] lg:p-[10px] rounded-full`}
          startIcon={
            <ImageWithFallback
              src={sendMessage}
              width={13}
              height={12}
              alt="red-heart"
            />
          }
        />
      </div>
    </div>
  );
};

export default LikedProfileCard;
