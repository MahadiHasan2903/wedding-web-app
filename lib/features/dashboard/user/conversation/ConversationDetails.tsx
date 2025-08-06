"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import AllMessages from "./message/AllMessages";
import ChatInputBox from "./ChatInputBox";
import { useSession } from "next-auth/react";
import ConversationHeader from "./ConversationHeader";
import { useSocket } from "@/lib/providers/SocketProvider";
import { Message } from "@/lib/types/chat/message.types";
import { Conversation } from "@/lib/types/chat/conversation.types";

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
  allMessageData,
  conversationDetails,
}: PropsType) => {
  const { data: session } = useSession();
  const { socket, isConnected } = useSocket();
  const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);
  const [replayToMessage, setReplayToMessage] = useState<Message | null>(null);
  const [updatedMessage, setUpdatedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>(
    allMessageData.allMessages
  );

  // Determine the logged-in user and other user in the conversation
  const loggedInUser = session?.user?.data;
  const isCurrentUserSender = conversationDetails.senderId === loggedInUser?.id;
  const otherUser = useMemo(
    () =>
      isCurrentUserSender
        ? conversationDetails.receiver
        : conversationDetails.sender,
    [isCurrentUserSender, conversationDetails]
  );

  // Handle incoming new messages
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

  // Handle message edits
  const handleEditedMessage = useCallback((msg: Message) => {
    setMessages((prevMessages) =>
      prevMessages.map((m) => (m.id === msg.id ? { ...m, ...msg } : m))
    );
  }, []);

  // Handle user online status updates
  const handleUserStatus = useCallback(
    ({ userId, isOnline }: { userId: string; isOnline: boolean }) => {
      if (userId === otherUser?.id) {
        setIsOtherUserOnline(isOnline);
      }
    },
    [otherUser?.id]
  );

  // Check other user's status on mount or ID change (with retry)
  useEffect(() => {
    if (!socket || !isConnected || !otherUser?.id) {
      return;
    }

    setIsOtherUserOnline(false); // Reset to false on ID change

    let attempt = 0;
    const maxAttempts = 3;

    const checkStatus = () => {
      if (attempt >= maxAttempts) {
        return;
      }
      socket.emit("checkUserOnlineStatus", { userIdToCheck: otherUser.id });
      attempt++;
    };

    const interval = setInterval(checkStatus, 1000); // Retry every 1s
    checkStatus(); // Initial attempt

    return () => clearInterval(interval);
  }, [socket, isConnected, otherUser?.id]);

  // Setup socket event listeners
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

  // Send a message handler
  const handleSendMessage = (text: string, replyToMessageId?: string) => {
    if (!text.trim() || !isConnected) {
      return;
    }
    socket?.emit("sendMessage", {
      senderId: loggedInUser?.id,
      receiverId: otherUser?.id,
      conversationId: conversationDetails.id,
      message: text,
      repliedToMessage: replyToMessageId ?? null,
    });
  };

  // Function to handle editing a message
  const handleEditMessage = (messageId: string, text: string) => {
    if (!text.trim() || !isConnected) {
      return;
    }

    socket?.emit("editMessage", {
      messageId: messageId,
      updatedMessage: text,
      senderId: loggedInUser?.id,
      receiverId: otherUser?.id,
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-between rounded-0 lg:rounded-[10px] bg-white">
      <ConversationHeader
        isOtherUserOnline={isOtherUserOnline}
        conversationDetails={conversationDetails}
      />
      <AllMessages
        messages={messages}
        setMessages={setMessages}
        paginationInfo={allMessageData.paginationInfo}
        loggedInUser={loggedInUser}
        otherUser={otherUser}
        setReplayToMessage={setReplayToMessage}
        setUpdatedMessage={setUpdatedMessage}
      />
      <ChatInputBox
        otherUser={otherUser}
        loggedInUser={loggedInUser}
        updatedMessage={updatedMessage}
        replayToMessage={replayToMessage}
        setUpdatedMessage={setUpdatedMessage}
        handleSendMessage={handleSendMessage}
        handleEditMessage={handleEditMessage}
        setReplayToMessage={setReplayToMessage}
      />
    </div>
  );
};

export default ConversationDetails;
