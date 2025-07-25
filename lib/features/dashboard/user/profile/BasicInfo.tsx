"use client";

import React from "react";
import Link from "next/link";
import {
  editIcon,
  facebook,
  instagram,
  linkedin,
  tikTok,
  twitter,
  whatsapp,
} from "@/lib/components/image/icons";
import { useSession } from "next-auth/react";
import { StaticImageData } from "next/image";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";
import { calculateAgeFromDOB } from "@/lib/utils/dateUtils";
import userPlaceholder from "@/public/images/common/user-placeholder.png";

const iconMap: Record<string, StaticImageData> = {
  facebook,
  instagram,
  linkedin,
  tikTok,
  twitter,
  whatsapp,
};

interface PropsType {
  userProfile: User;
}

const BasicInfo = ({ userProfile }: PropsType) => {
  const { data: session } = useSession();
  const isLoggedInUser = session?.user.data.id === userProfile.id;
  const membershipId =
    session?.user.data.purchasedMembership?.membershipPackageInfo?.id;
  const isVipUser = membershipId !== undefined && [2, 3].includes(membershipId);

  return (
    <div className="w-full h-full flex flex-col xl:flex-row items-start xl:items-center gap-[20px] lg:gap-[40px] xl:gap-[100px] bg-white rounded-none lg:rounded-[10px] px-[18px] py-[12px] lg:px-[36px] lg:py-[20px]">
      <div className="w-auto shrink-0 flex items-center gap-[16px]">
        <div className="w-[90px] lg:w-[150px] h-[90px] lg:h-[160px] relative flex items-center justify-center">
          <div className="w-[85px] lg:w-[145px] h-[85px] lg:h-[145px] relative overflow-hidden">
            <ImageWithFallback
              fill
              alt="user"
              src={userProfile.profilePicture?.url}
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
        </div>
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
                {userProfile.city || "N/A"}, {userProfile.country || "N/A"}
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
        <p className="text-[12px] sm:text-[14px] font-normal text-justify">
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
          {isLoggedInUser && (
            <CommonButton
              label="Edit Info"
              // onClick={() => console.log("Triggered")}
              className="w-fit flex items-center gap-[8px] bg-transparent border border-[#A1A1A1] text-black text-[10px] font-normal rounded-full p-[6px] lg:p-[10px]"
              startIcon={
                <ImageWithFallback
                  src={editIcon}
                  width={13}
                  height={13}
                  alt="edit-icon"
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
