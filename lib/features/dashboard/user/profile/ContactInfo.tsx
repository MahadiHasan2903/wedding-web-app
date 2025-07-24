"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  userProfile: User;
}

const ContactInfo = ({ userProfile }: PropsType) => {
  const { data: session } = useSession();
  const isLoggedInUser = session?.user.data.id === userProfile.id;

  return (
    <div className="w-full bg-white rounded-[10px]">
      <div className="w-full py-[25px] border-light border-b-[3px]">
        <div className="w-full px-[36px] flex items-center justify-between">
          <CardTitle title="Contact & Accessibility" />
          {isLoggedInUser && (
            <CommonButton
              label="Edit Info"
              // onClick={() => console.log("Triggered")}
              className="w-fit flex items-center gap-[8px] bg-transparent border border-[#A1A1A1] text-black text-[10px] font-normal rounded-full p-[10px]"
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

      <div className="w-full grid grid-cols-4 px-[36px] py-[25px]">
        <div className="flex flex-col items-start gap-1">
          <p className="text-[14px] font-semibold">Preferred Language</p>
          <p className="text-[14px] font-normal">
            {userProfile.preferredLanguages?.length
              ? userProfile.preferredLanguages.join(", ")
              : "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[14px] font-semibold">Phone</p>
          <p className="text-[14px] font-normal">
            {userProfile.phoneNumber || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[14px] font-semibold">Email</p>
          <p className="text-[14px] font-normal">
            {userProfile.email || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[14px] font-semibold">Timezone</p>
          <p className="text-[14px] font-normal">
            {userProfile.timeZone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
