"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import AllMessages from "./AllMessages";
import ChatInputBox from "./ChatInputBox";
import { useSession } from "next-auth/react";
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
  const [replayToMessage, setReplayToMessage] = useState<Message | null>(null);
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

  // Function to handle new incoming messages
  const handleNewMessage = useCallback((msg: Message) => {
    setMessages((prevMessages) => {
      if (msg.repliedToMessage === null && msg.repliedToMessageId) {
        const repliedMsg = prevMessages.find(
          (m) => m.id === msg.repliedToMessageId
        );
        if (repliedMsg) {
          msg = { ...msg, repliedToMessage: repliedMsg };
        }
      }
      return [...prevMessages, msg];
    });
  }, []);

  // Function to handle edited messages
  const handleEditedMessage = useCallback((msg: Message) => {
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? msg : m)));
  }, []);

  // Function to handle user status changes
  const handleUserStatus = useCallback(
    ({ userId, isOnline }: any) => {
      if (userId === otherUser?.id) {
        setIsOtherUserOnline(isOnline);
      }
    },
    [otherUser?.id]
  );

  // This effect sets up the socket listeners for new messages, edited messages, and user status changes
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", handleNewMessage);
    socket.on("messageEdited", handleEditedMessage);
    socket.on("userStatusChanged", handleUserStatus);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageEdited", handleEditedMessage);
      socket.off("userStatusChanged", handleUserStatus);
    };
  }, [socket, handleNewMessage, handleEditedMessage, handleUserStatus]);

  // This effect sets the initial online status of the other user
  useEffect(() => {
    setIsOtherUserOnline(false);
  }, [otherUser?.id]);

  // Function to handle sending messages
  const handleSendMessage = (text: string, replyToMessageId?: string) => {
    if (!text.trim() || !isConnected) return;

    socket?.emit("sendMessage", {
      senderId: loggedInUser?.id,
      receiverId: otherUser?.id,
      conversationId: conversationDetails.id,
      message: text,
      repliedToMessage: replyToMessageId ?? null,
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-between rounded-0 lg:rounded-[10px] bg-white py-[16px]">
      <ConversationHeader
        isOtherUserOnline={isOtherUserOnline}
        conversationDetails={conversationDetails}
      />
      <AllMessages
        messages={messages}
        paginationInfo={allMessageData.paginationInfo}
        loggedInUser={loggedInUser}
        otherUser={otherUser}
        setReplayToMessage={setReplayToMessage}
      />
      <ChatInputBox
        handleSendMessage={handleSendMessage}
        loggedInUser={loggedInUser}
        otherUser={otherUser}
        replayToMessage={replayToMessage}
        setReplayToMessage={setReplayToMessage}
      />
    </div>
  );
};

export default ConversationDetails;
