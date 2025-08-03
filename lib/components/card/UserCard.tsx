"use client";

import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/user/user.types";
import { CommonButton } from "@/lib/components/buttons";
import { redHeart } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { hasActiveVipMembership } from "@/lib/utils/helpers";
import vipRing2 from "@/public/images/common/vip-ring-2.png";
import { calculateAgeFromDOB } from "@/lib/utils/date/dateUtils";
import userPlaceholder from "@/public/images/common/user-placeholder.png";

interface UserCardProps {
  user: User;
  returnUrl?: string;
}

const UserCard = ({ user, returnUrl = "/find-match" }: UserCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  // Determine if the user is a VIP or not
  const isVipUser = hasActiveVipMembership(user);

  // Function to redirect user based on token
  const handleRedirection = () => {
    if (accessToken) {
      router.push(`${returnUrl}/${user.id}`);
    } else {
      toast.error("Please login first to view the user profile");
    }
  };

  return (
    <div
      onClick={handleRedirection}
      className={`w-[150px] sm:w-[180px] lg:w-[240px] cursor-pointer h-auto sm:h-[250px] lg:h-[350px] flex flex-col items-center rounded-[10px] py-[8px] lg:py-[25px] ${
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

      <CommonButton
        label="View Profile"
        className={`${
          isVipUser
            ? "btn-gold-gradient border-none"
            : "bg-transparent border border-primaryBorder"
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
