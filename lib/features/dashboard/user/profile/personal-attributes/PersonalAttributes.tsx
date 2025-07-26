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

const PersonalAttributes = ({ userProfile }: PropsType) => {
  const { data: session } = useSession();
  const isLoggedInUser = session?.user.data.id === userProfile.id;
  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title="Personal Attributes & Habits" />
          {isLoggedInUser && (
            <CommonButton
              label="Edit Info"
              // onClick={() => console.log("Triggered")}
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
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-start px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] gap-[16px] lg:gap-[25px]">
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">Height</p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.heightCm || "N/A"} cm
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">Weight</p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.weightKg || "N/A"} kg
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Body Type
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.bodyType || "N/A"}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Drinking Habit
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.drinkingHabit) || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Smoking Habit
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.smokingHabit) || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">Pets</p>
            <p className="text-[10px] lg:text-[14px] font-normal capitalize">
              {userProfile.hasPet ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[25px]">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Health Condition
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.healthCondition) || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">
              Dietary Preference
            </p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {formatLabel(userProfile.dietaryPreference) || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[10px] lg:text-[14px] font-semibold">Children</p>
            <p className="text-[10px] lg:text-[14px] font-normal">
              {userProfile.children || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAttributes;
