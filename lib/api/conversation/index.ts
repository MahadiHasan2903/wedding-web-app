import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { PaginatedResponse } from "@/lib/types/common/common.types";
import { Conversation } from "@/lib/types/conversation/conversation.types";

type GetAllConversationResponse = PaginatedResponse<Conversation>;

export interface GetConversationDetailsResponse {
  success: boolean;
  message: string;
  status: number;
  data: Conversation;
}

/**
 * Fetches a paginated list of all conversations involving the authenticated user
 * (either as sender or receiver), sorted by the given criteria.
 *
 * @param accessToken - Optional Bearer token for authenticating the request.
 * @param page - Page number to fetch (defaults to 1).
 * @param pageSize - Number of items per page (defaults to 10).
 * @returns An object containing the list of enriched conversations and pagination metadata.
 * @throws Error if the response does not contain valid data.
 */
const getMyAllConversation = async (
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetAllConversationResponse>(
    `${BASE_URL}/conversation/my-conversations?page=${page}&pageSize=${pageSize}&sort=updatedAt,DESC`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Ensure that the server response includes data
  if (!response.data) {
    throw new Error(
      `Unable to retrieve your conversations. The server returned an empty or invalid response.`
    );
  }

  // Transform raw conversation data into normalized conversation objects
  const allConversations: Conversation[] = response.data.items.map(
    (conversation) => ({
      id: conversation.id,
      senderId: conversation.senderId,
      receiverId: conversation.receiverId,
      sender: conversation.sender,
      receiver: conversation.receiver,
      lastMessageId: conversation.lastMessageId,
      lastMessage: conversation.lastMessage,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    })
  );

  // Return both conversation data and pagination details
  return {
    allConversations,
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
 * Fetches a paginated list of conversations where the given user is the sender.
 *
 * @param senderId - The ID of the sender user whose conversations are to be fetched.
 * @param accessToken - Optional Bearer token for authentication.
 * @param page - Page number to fetch (defaults to 1).
 * @param pageSize - Number of items per page (defaults to 10).
 * @returns A paginated list of conversations and pagination metadata.
 * @throws Error if the response does not contain conversation data.
 */
const getSenderAllConversation = async (
  senderId: string,
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetAllConversationResponse>(
    `${BASE_URL}/conversation/sender/${senderId}?page=${page}&pageSize=${pageSize}&sort=updatedAt,DESC`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Validate response
  if (!response.data) {
    throw new Error(
      `Failed to fetch conversations for sender with ID ${senderId}. No data returned from the server.`
    );
  }

  // Map and normalize conversation items
  const allConversations: Conversation[] = response.data.items.map(
    (conversation) => ({
      id: conversation.id,
      senderId: conversation.senderId,
      receiverId: conversation.receiverId,
      lastMessageId: conversation.lastMessageId,
      lastMessage: conversation.lastMessage,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    })
  );

  // Return conversations and pagination info
  return {
    allConversations,
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
 * Fetches detailed information about a specific conversation by its ID.
 *
 * @param conversationId - The unique identifier of the conversation to retrieve.
 * @param accessToken - Optional Bearer token for authenticating the request.
 * @returns A normalized `Conversation` object containing sender, receiver, and message info.
 * @throws Error if the conversation is not found or the server returns invalid data.
 */
const getConversationDetails = async (
  conversationId: string,
  accessToken?: string
) => {
  const response = await fetchTyped<GetConversationDetailsResponse>(
    `${BASE_URL}/conversation/${conversationId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Ensure that the server response includes valid data
  if (!response.data) {
    throw new Error(
      `Unable to retrieve conversation details. The server returned an empty or invalid response.`
    );
  }

  // Construct a normalized Conversation object from the server response
  const conversationDetails: Conversation = {
    id: response.data.id,
    senderId: response.data.senderId,
    receiverId: response.data.receiverId,
    sender: response.data.sender,
    receiver: response.data.receiver,
    lastMessageId: response.data.lastMessageId,
    lastMessage: response.data.lastMessage,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
  };

  return conversationDetails;
};

const conversation = {
  getMyAllConversation,
  getSenderAllConversation,
  getConversationDetails,
};

export default conversation;
