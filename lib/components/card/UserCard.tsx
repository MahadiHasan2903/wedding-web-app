"use client";

import React, { MouseEvent } from "react";
import { User } from "@/lib/types/user/user.types";
import { CommonButton } from "@/lib/components/buttons";
import { redHeart } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import vipRing2 from "@/public/images/common/vip-ring-2.png";
import { calculateAgeFromDOB } from "@/lib/utils/dateUtils";
import userPlaceholder from "@/public/images/common/user-placeholder.png";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  const isVipUser = user.purchasedMembership?.membershipPackageInfo.id === 2;

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Liked");
  };

  const handleRedirection = () => {
    if (accessToken) {
      router.push(`/find-match/${user.id}`);
    } else {
      toast.error("Please login first to view the matched user profile");
    }
  };

  return (
    <div
      onClick={handleRedirection}
      className={`w-[150px] sm:w-[180px] lg:w-[240px] cursor-pointer h-auto sm:h-[250px] lg:h-[350px] mx-auto flex flex-col items-center rounded-[10px] py-[8px] lg:py-[25px] ${
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
        } w-full flex flex-col py-1 items-center gap-[8px] my-[8px] lg:my-[25px]`}
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

      <CommonButton
        label="Like Profile"
        onClick={handleLikeClick}
        className={`${
          isVipUser
            ? "btn-gold-gradient border-none"
            : "bg-transparent border border-[#A1A1A1]"
        } w-fit flex items-center gap-[5px] text-[10px] lg:text-[14px] font-normal p-[10px] rounded-full`}
        startIcon={
          <ImageWithFallback
            src={redHeart}
            width={15}
            height={12}
            alt="red-heart"
          />
        }
      />
    </div>
  );
};

export default UserCard;
