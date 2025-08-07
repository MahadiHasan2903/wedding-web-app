"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import AllMessages from "./message/AllMessages";
import ChatInputBox from "./ChatInputBox";
import { useSession } from "next-auth/react";
import ConversationHeader from "./ConversationHeader";
import { useSocket } from "@/lib/providers/SocketProvider";
import { Message } from "@/lib/types/chat/message.types";
import { Conversation } from "@/lib/types/chat/conversation.types";
import { uploadMediaAction } from "@/lib/action/media/media.action";

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
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState<Message | null>(null);
  const [replayToMessage, setReplayToMessage] = useState<Message | null>(null);
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

  // Handle attachment deletion
  const handleAttachmentDeleted = useCallback(
    ({
      messageId,
      attachmentId,
    }: {
      messageId: string;
      attachmentId: string;
    }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                attachments:
                  msg.attachments?.filter((att) => att.id !== attachmentId) ||
                  null,
              }
            : msg
        )
      );
    },
    []
  );

  // Check other user's status on mount or ID change (with retry)
  useEffect(() => {
    if (!socket || !isConnected || !otherUser?.id) {
      return;
    }

    setIsOtherUserOnline(false);

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
    checkStatus();

    return () => clearInterval(interval);
  }, [socket, isConnected, otherUser?.id]);

  // Setup socket event listeners
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("newMessage", handleNewMessage);
    socket.on("messageEdited", handleEditedMessage);
    socket.on("userStatusChanged", handleUserStatus);
    socket.on("attachmentDeleted", handleAttachmentDeleted);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageEdited", handleEditedMessage);
      socket.off("userStatusChanged", handleUserStatus);
      socket.off("attachmentDeleted", handleAttachmentDeleted);
    };
  }, [socket, handleNewMessage, handleEditedMessage, handleUserStatus]);

  // Send a message handler
  const handleSendMessage = async (text: string, replyToMessageId?: string) => {
    if ((!text.trim() && attachments.length <= 0) || !isConnected) {
      return;
    }

    setLoading(true);

    let attachmentIds: string[] = [];

    // Upload new attachments (if any)
    if (attachments.length > 0) {
      const formData = new FormData();
      formData.append("conversationId", conversationDetails.id);

      attachments.forEach((file) => {
        formData.append("files", file);
      });

      const uploadMediaResponse = await uploadMediaAction(formData);

      if (uploadMediaResponse.status && uploadMediaResponse.data) {
        // Extract the media `id`s
        attachmentIds = uploadMediaResponse.data.map((media) => media.id);
      } else {
        console.error("Failed to upload attachments.");
        return;
      }
    }

    socket?.emit("sendMessage", {
      senderId: loggedInUser?.id,
      receiverId: otherUser?.id,
      conversationId: conversationDetails.id,
      message: text,
      repliedToMessage: replyToMessageId ?? null,
      attachmentIds,
    });

    // Clear attachments after sending
    setAttachments([]);
    setLoading(false);
  };

  // Function to handle editing a message
  const handleEditMessage = async (messageId: string, text: string) => {
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
        otherUser={otherUser}
        setMessages={setMessages}
        loggedInUser={loggedInUser}
        setAttachments={setAttachments}
        setUpdatedMessage={setUpdatedMessage}
        setReplayToMessage={setReplayToMessage}
        paginationInfo={allMessageData.paginationInfo}
      />
      <ChatInputBox
        loading={loading}
        otherUser={otherUser}
        attachments={attachments}
        loggedInUser={loggedInUser}
        setAttachments={setAttachments}
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
