"use client";

import React from "react";
import { Conversation } from "@/lib/types/conversation/conversation.types";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { avatar } from "@/lib/components/image/icons";
import { useSession } from "next-auth/react";
import { formatRelativeTimeShort } from "@/lib/utils/date/dateUtils";
import Link from "next/link";

interface PropsType {
  allMyConversationData: {
    allConversations: Conversation[];
    paginationInfo: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
      totalPages: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
  };
  conversationId?: string;
}

const ConversationList = ({
  allMyConversationData,
  conversationId,
}: PropsType) => {
  const { data: session } = useSession();
  const userId = session?.user?.data?.id;

  return (
    <div className="w-full h-full overflow-y-auto max-w-full md:max-w-[300px] rounded-0 lg:rounded-[10px] bg-white py-[16px]">
      <div className="w-full px-[18px]">
        <CommonButton
          label="Inbox"
          className="w-full bg-primary text-white font-semibold px-[14px] py-[10px] text-[14px] rounded-[5px] mb-4 "
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        {allMyConversationData.allConversations.length === 0 ? (
          <p className="text-sm text-center">No conversations found.</p>
        ) : (
          allMyConversationData.allConversations.map((conversation) => {
            // determine the other participant
            const isCurrentUserSender = conversation.senderId === userId;
            const otherUser = isCurrentUserSender
              ? conversation.receiver
              : conversation.sender;

            return (
              <Link
                href={`/conversations/${conversation.id}`}
                key={conversation.id}
                className={`w-full flex items-center gap-3 p-2 transition cursor-pointer hover:bg-light px-[18px] ${
                  conversation.id === conversationId ? "bg-light" : ""
                }`}
              >
                <div className="w-[50px] h-[50px] relative flex items-center justify-center rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={otherUser?.profilePicture?.url}
                    fallBackImage={avatar}
                    width={45}
                    height={45}
                    alt={otherUser?.firstName ?? "User"}
                    className="absolute rounded-full overflow-hidden bg-light border border-primaryBorder"
                  />
                </div>
                <div className="w-full flex flex-col items-start gap-1 overflow-hidden">
                  <p className="text-[14px] font-medium text-primary truncate">
                    {otherUser?.firstName ?? "Unknown User"}
                  </p>
                  <div className="w-full flex items-center justify-between">
                    <p className="text-[12px] font-normal truncate ">
                      {conversation.senderId === userId && <span>You: </span>}
                      {conversation.lastMessage}
                    </p>
                    <p className="text-[12px] font-normal">
                      {formatRelativeTimeShort(conversation.updatedAt)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
