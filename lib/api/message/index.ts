import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { Message } from "@/lib/types/conversation/message.types";
import { PaginatedResponse } from "@/lib/types/common/common.types";

type GetConversationMessagesResponse = PaginatedResponse<Message>;

export interface GetMessageDetailsResponse {
  success: boolean;
  message: string;
  status: number;
  data: Message;
}

/**
 * Fetches paginated messages for a specific conversation.
 *
 * @param conversationId - The unique identifier of the conversation.
 * @param accessToken - The bearer token used for authentication (optional).
 * @param page - The current page number (default is 1).
 * @param pageSize - The number of messages per page (default is 10).
 * @returns A list of normalized messages along with pagination metadata.
 * @throws Error if the response is invalid or no data is returned.
 */
const getMessagesByConversationId = async (
  conversationId: string,
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetConversationMessagesResponse>(
    `${BASE_URL}/message/conversation/${conversationId}?page=${page}&pageSize=${pageSize}&sort=updatedAt,DESC`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Ensure server returned a valid response with data
  if (!response.data) {
    throw new Error(
      `Failed to fetch messages for conversation ID: ${conversationId}. Server response did not contain any data.`
    );
  }

  // Normalize each message object
  const allMessages: Message[] = response.data.items.map((message) => ({
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    receiverId: message.receiverId,
    messageType: message.messageType,
    message: message.message,
    status: message.status,
    readAt: message.readAt,
    repliedToMessage: message.repliedToMessage,
    attachments: message.attachments,
    isDeleted: message.isDeleted,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  }));

  // Return message list with pagination metadata
  return {
    allMessages,
    paginationInfo: {
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
      itemsPerPage: response.data.itemsPerPage,
      currentPage: response.data.currentPage,
      hasPrevPage: response.data.hasPrevPage,
      hasNextPage: response.data.hasNextPage,
      prevPage: response.data.prevPage,
      nextPage: response.data.nextPage,
    },
  };
};

/**
 * Fetches detailed information about a specific message by its ID.
 *
 * @param messageId - The unique identifier of the message to retrieve.
 * @param accessToken - Optional bearer token used for authenticated access.
 * @returns A normalized `Message` object containing the full message details.
 * @throws Error if the server response is missing or invalid.
 */
const getMessageDetails = async (messageId: string, accessToken?: string) => {
  const response = await fetchTyped<GetMessageDetailsResponse>(
    `${BASE_URL}/message/${messageId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Validate that the server returned a usable response
  if (!response.data) {
    throw new Error(
      `Failed to retrieve message details. No valid data returned for message ID: ${messageId}.`
    );
  }

  // Normalize the response into a Message object
  const messageDetails: Message = {
    id: response.data.id,
    conversationId: response.data.conversationId,
    senderId: response.data.senderId,
    receiverId: response.data.receiverId,
    messageType: response.data.messageType,
    message: response.data.message,
    status: response.data.status,
    readAt: response.data.readAt,
    repliedToMessage: response.data.repliedToMessage,
    attachments: response.data.attachments,
    isDeleted: response.data.isDeleted,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
  };

  return messageDetails;
};

// Exported API
const message = {
  getMessageDetails,
  getMessagesByConversationId,
};

export default message;
