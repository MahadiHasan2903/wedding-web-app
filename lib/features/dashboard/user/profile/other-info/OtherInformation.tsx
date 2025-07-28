"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { formatLabel } from "@/lib/utils/helpers";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import OtherInformationUpdateForm from "./OtherInformationUpdateForm";

interface PropsType {
  userProfile: User;
}

const OtherInformation = ({ userProfile }: PropsType) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const isLoggedInUser = session?.user.data.id === userProfile.id;

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title="Other Information" />
          {isLoggedInUser && (
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
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-3 px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px]">
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            Astrological Sign
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal capitalize">
            {userProfile.astrologicalSign || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            Love Language
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {formatLabel(userProfile.loveLanguage) || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            Favorite Quote
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {userProfile.favoriteQuote || "N/A"}
          </p>
        </div>
      </div>
      {open && (
        <OtherInformationUpdateForm
          open={open}
          setOpen={setOpen}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default OtherInformation;
