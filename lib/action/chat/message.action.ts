"use server";

import {
  deleteMessageAttachmentResponseSchema,
  DeleteMessageAttachmentResponseType,
} from "@/lib/schema/chat/message.schema";
import { BASE_URL } from "@/lib/config/constants";
import { fetchZodTyped } from "@/lib/action/client";
import { getServerSessionData } from "@/lib/config/auth";
import { Result } from "@/lib/types/common/common.types";

/**
 * Deletes a message attachment by its ID via an API call.
 *
 * @param attachmentId - The unique identifier of the attachment to delete.
 * @returns A Promise resolving to a Result object indicating success or failure,
 * @throws Throws an error if no valid attachmentId is provided.
 */
const deleteMessageAttachmentAction = async (attachmentId: string) => {
  // Validate that an attachment ID is provided before proceeding
  if (!attachmentId) {
    throw new Error("Invalid attachment ID provided.");
  }

  // Retrieve the current user's access token for authentication
  const { accessToken } = await getServerSessionData();

  try {
    // Perform the DELETE request to the backend endpoint
    const response = await fetchZodTyped(
      `${BASE_URL}/message/attachment/${attachmentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      deleteMessageAttachmentResponseSchema
    );

    // Construct a success result object with server response data
    const result: Result<DeleteMessageAttachmentResponseType> = {
      status: true,
      data: response.data,
      message: "Attachment was successfully deleted.",
    };

    return result;
  } catch (error: any) {
    console.error("Attachment deletion failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Construct a failure result object with a descriptive message
    const result: Result<DeleteMessageAttachmentResponseType> = {
      status: false,
      message: isTimeout
        ? "The request timed out. Please try again shortly."
        : String(error.message) ||
          "Failed to delete the attachment. Please try again.",
      data: null,
    };

    return result;
  }
};

export { deleteMessageAttachmentAction };
