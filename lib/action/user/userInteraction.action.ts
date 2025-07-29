"use server";

import {
  UpdateLikeDislikeStatusType,
  UpdateBlockUnblockStatusType,
  updateLikeDislikeStatusSchema,
  updateBlockUnblockStatusSchema,
  UpdateLikeDislikeStatusResponseType,
  UpdateBlockUnblockStatusResponseType,
  updateLikeDislikeStatusResponseSchema,
  updateBlockUnblockStatusResponseSchema,
} from "@/lib/schema/user/userInteraction.schema";
import { BASE_URL } from "@/lib/config/constants";
import { fetchZodTyped } from "@/lib/action/client";
import { getServerSessionData } from "@/lib/config/auth";
import { Result } from "@/lib/types/common/common.types";

/**
 * Updates the like or dislike status of a user.
 * Validates the input, fetches the user's access token, and sends
 * a PATCH request to update the like/dislike status.
 *
 * @param payload - Object containing likedUserId and status ('like' or 'dislike')
 * @returns Result object with success status, message, and updated data
 * @throws Error if payload validation fails
 */
const updateLikeDisLikeStatusAction = async (
  payload: UpdateLikeDislikeStatusType
) => {
  // Validate the input payload using the like/dislike schema
  const safeParse = updateLikeDislikeStatusSchema.safeParse(payload);
  if (!safeParse.success) {
    throw new Error("Invalid like/dislike status data");
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Send PATCH request to update like/dislike status
    const response = await fetchZodTyped(
      `${BASE_URL}/users/liked-users/update-status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
      updateLikeDislikeStatusResponseSchema
    );

    // Return success result with server response
    const result: Result<UpdateLikeDislikeStatusResponseType> = {
      status: true,
      data: response.data,
      message: `Profile ${payload.status}d successfully.`,
    };

    return result;
  } catch (error: any) {
    console.error("Failed to update like/dislike status", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with descriptive message
    const result: Result<UpdateLikeDislikeStatusResponseType> = {
      status: false,
      message: isTimeout
        ? "The request timed out. Please try again later."
        : "Failed to update user like/dislike status. Please try again.",
      data: null,
    };

    return result;
  }
};

/**
 * Updates the block or unblock status of a user.
 *
 * Validates the input, fetches the user's access token, and sends
 * a PATCH request to update the block/unblock status.
 *
 * @param payload - Object containing blockedUserId and status ('block' or 'unblock')
 * @returns Result object with success status, message, and updated data
 * @throws Error if payload validation fails
 */
const updateBlockUnblockStatusAction = async (
  payload: UpdateBlockUnblockStatusType
) => {
  // Validate the input payload using the block/unblock schema
  const safeParse = updateBlockUnblockStatusSchema.safeParse(payload);
  if (!safeParse.success) {
    throw new Error("Invalid block/unblock status data");
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Send PATCH request to update block/unblock status
    const response = await fetchZodTyped(
      `${BASE_URL}/users/blocked-users/update-status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
      updateBlockUnblockStatusResponseSchema
    );

    // Return success result with server response
    const result: Result<UpdateBlockUnblockStatusResponseType> = {
      status: true,
      data: response.data,
      message: `User ${payload.status}d successfully.`,
    };

    return result;
  } catch (error: any) {
    console.error("Failed to update block/unblock status", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with descriptive message
    const result: Result<UpdateBlockUnblockStatusResponseType> = {
      status: false,
      message: isTimeout
        ? "The request timed out. Please try again later."
        : "Failed to update user block/unblock status. Please try again.",
      data: null,
    };

    return result;
  }
};

export { updateLikeDisLikeStatusAction, updateBlockUnblockStatusAction };
