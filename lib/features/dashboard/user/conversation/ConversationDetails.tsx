"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import AllMessages from "./AllMessages";
import ChatInputBox from "./ChatInputBox";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import ConversationHeader from "./ConversationHeader";
import { Message } from "@/lib/types/conversation/message.types";
import { Conversation } from "@/lib/types/conversation/conversation.types";
import { useSocket } from "@/lib/providers/SocketProvider";

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
  const { socket, isConnected } = useSocket();
  const { data: session } = useSession();
  const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    allMessageData.allMessages
  );
  const loggedInUser = session?.user?.data;
  const isCurrentUserSender = conversationDetails.senderId === loggedInUser?.id;
  const otherUser = useMemo(
    () =>
      isCurrentUserSender
        ? conversationDetails.receiver
        : conversationDetails.sender,
    [isCurrentUserSender, conversationDetails]
  );

  // Subscribe to events
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleEditedMessage = (msg: Message) => {
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? msg : m)));
    };

    const handleUserStatus = ({ userId, isOnline }: any) => {
      if (userId === otherUser?.id) {
        setIsOtherUserOnline(isOnline);
      }
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageEdited", handleEditedMessage);
    socket.on("userStatusChanged", handleUserStatus);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageEdited", handleEditedMessage);
      socket.off("userStatusChanged", handleUserStatus);
    };
  }, [socket, otherUser?.id]);

  // Reset online status when other user changes
  useEffect(() => {
    setIsOtherUserOnline(false);
  }, [otherUser?.id]);

  // Handle sending a message
  const handleSendMessage = (text: string, replyToMessageId?: string) => {
    if (!text.trim()) {
      return;
    }

    if (isConnected)
      socket?.emit("sendMessage", {
        senderId: loggedInUser?.id,
        receiverId: otherUser?.id,
        conversationId: conversationDetails.id,
        message: text,
        replyToMessageId: replyToMessageId ?? null,
      });
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-between rounded-0 lg:rounded-[10px] bg-white py-[16px]">
      <ConversationHeader
        isOtherUserOnline={isOtherUserOnline}
        conversationDetails={conversationDetails}
      />
      <AllMessages
        allMessageData={{
          allMessages: messages,
          paginationInfo: allMessageData.paginationInfo,
        }}
        loggedInUser={loggedInUser}
        otherUser={otherUser}
      />
      <ChatInputBox handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ConversationDetails;
