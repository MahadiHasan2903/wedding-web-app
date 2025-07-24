"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { formatLabel } from "@/lib/utils/helpers";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  userProfile: User;
}

const BackgroundInfo = ({ userProfile }: PropsType) => {
  const { data: session } = useSession();
  const isLoggedInUser = session?.user.data.id === userProfile.id;
  return (
    <div className="w-full bg-white rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title="Lifestyle & Background" />
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
      <div className="w-full flex flex-col items-start gap-[16px] lg:gap-[25px] px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Education
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.highestEducation || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Institution
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.institutionName || "N/A"}
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Profession
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.profession || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">Company</p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.companyName || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Monthly Income
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.monthlyIncome
                ? `$ ${userProfile.monthlyIncome}`
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Religion / Beliefs
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.religion || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Political View
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.politicalView) || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Living Arrangement
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.livingArrangement) || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundInfo;
