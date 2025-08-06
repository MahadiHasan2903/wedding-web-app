"use server";

import { getServerSessionData } from "@/lib/config/auth";
import { fetchZodTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import {
  AddConversationType,
  addConversationSchema,
  AddConversationResponseType,
  addConversationResponseSchema,
} from "@/lib/schema/chat/conversation.schema";
import { Result } from "@/lib/types/common/common.types";

/**
 * Creates a new conversation between two users by sending a POST request to the backend.
 *
 * @param requestPayload - An object containing `senderId` and `receiverId`
 * @returns A `Result` object with the conversation data if successful, or an error message if failed
 */
const createConversationAction = async (
  requestPayload: AddConversationType
) => {
  // Validate the payload against Zod schema
  const safeParse = addConversationSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid conversation data provided.");
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Send POST request to the backend to create the conversation
    const response = await fetchZodTyped(
      `${BASE_URL}/conversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      addConversationResponseSchema // Validate the response shape
    );

    const conversationResponse: AddConversationResponseType = {
      id: response.data.id,
      senderId: response.data.senderId,
      receiverId: response.data.receiverId,
      lastMessage: response.data.lastMessage,
      lastMessageId: response.data.lastMessageId,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    const result: Result<AddConversationResponseType> = {
      status: true,
      data: conversationResponse,
      message: "Conversation created successfully.",
    };
    return result;
  } catch (error: any) {
    console.error("Conversation creation failed:", error);

    const isTimeout = error.message?.includes("timed out");

    const result: Result<AddConversationResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your connection and try again."
        : error.message ||
          "Unable to create conversation at this time. Please try again later.",
    };
    return result;
  }
};

export { createConversationAction };
