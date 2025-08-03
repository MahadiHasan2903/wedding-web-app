"use client";

import React from "react";
import AllMessages from "./AllMessages";
import ChatInputBox from "./ChatInputBox";
import ConversationHeader from "./ConversationHeader";
import { Message } from "@/lib/types/conversation/message.types";
import { Conversation } from "@/lib/types/conversation/conversation.types";

interface PropsType {
  conversationDetails: Conversation;
  allMessageData: {
    allMessages: Message[];
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
}

const ConversationDetails = ({
  conversationDetails,
  allMessageData,
}: PropsType) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between rounded-0 lg:rounded-[10px] bg-white py-[16px]">
      <ConversationHeader conversationDetails={conversationDetails} />
      <AllMessages
        conversationDetails={conversationDetails}
        allMessageData={allMessageData}
      />
      <ChatInputBox />
    </div>
  );
};

export default ConversationDetails;
