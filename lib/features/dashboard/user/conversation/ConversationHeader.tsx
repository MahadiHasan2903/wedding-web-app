"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { avatar, dots } from "@/lib/components/image/icons";
import { Conversation } from "@/lib/types/conversation/conversation.types";

interface PropsType {
  conversationDetails: Conversation;
  isOtherUserOnline: boolean;
}

const ConversationHeader = ({
  conversationDetails,
  isOtherUserOnline,
}: PropsType) => {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?.data?.id;
  const isCurrentUserSender = conversationDetails.senderId === loggedInUserId;
  const otherUser = isCurrentUserSender
    ? conversationDetails.receiver
    : conversationDetails.sender;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="w-full border-b-[3px] border-light pt-[16px]">
      <div className="w-full relative flex items-center justify-between pb-[14px] px-[18px]">
        <div className="w-1/2 gap-2 flex items-center">
          <div className="relative w-[35px] h-[35px] flex items-center justify-center">
            <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden border border-black">
              <ImageWithFallback
                src={otherUser?.profilePicture?.url}
                fallBackImage={avatar}
                alt="user"
                fill
                className="object-cover"
              />
            </div>
            {isOtherUserOnline && (
              <div className="absolute w-[35px] h-[35px] rounded-full z-50 bg-transparent border-[2px] border-[#1BEA1B]" />
            )}
          </div>

          <div className="flex flex-col items-start">
            <p className="text-[14px] font-medium text-primary">
              {otherUser?.firstName ?? "Unknown User"}
            </p>
            {isOtherUserOnline && (
              <p className="text-[10px] font-normal">Active Now</p>
            )}
          </div>
        </div>

        {/* Dots Icon */}
        <div ref={menuRef} className="w-1/2 flex justify-end relative">
          <ImageWithFallback
            src={dots}
            width={18}
            height={5}
            alt="dots"
            className="cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute top-6 right-[-8px] bg-white shadow-lg border border-light py-[10px] px-[25px] rounded-[5px]">
              <div className="absolute shadow-lg w-2 h-2 bg-white border-t border-l border-light rotate-45 top-[-5px] right-3 z-0" />
              <CommonButton
                onClick={() => setMenuOpen(false)}
                label="Report Profile"
                className="text-[14px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
