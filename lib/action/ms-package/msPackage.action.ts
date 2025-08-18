"use server";

import { getServerSessionData } from "@/lib/config/auth";
import { fetchZodTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import {
  UpdateMsPackageType,
  updateMsPackageSchema,
  UpdateMsPackageResponseType,
  updateMsPackageResponseSchema,
} from "@/lib/schema/ms-package/msPackage.types";
import { Result } from "@/lib/types/common/common.types";

/**
 * Update an existing membership package by its ID.
 *
 * @param msPackageId - The ID of the membership package to update.
 * @param requestPayload - The membership package update payload.
 * @returns A `Result` object containing the updated package data or an error message.
 */
const updateMsPackageAction = async (
  msPackageId: number,
  requestPayload: UpdateMsPackageType
) => {
  // Validate the request payload before sending the API request
  const safeParse = updateMsPackageSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error(
      "Invalid membership package data. Please check your input."
    );
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Send PATCH request to update the membership package
    const response = await fetchZodTyped(
      `${BASE_URL}/membership-package/${msPackageId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      updateMsPackageResponseSchema
    );

    // Normalize the API response into our expected structure
    const updateMsPackage: UpdateMsPackageResponseType = {
      id: response.data.id,
      title: response.data.title,
      description: response.data.description,
      status: response.data.status,
      categoryInfo: {
        category: response.data.categoryInfo.category,
        originalPrice: response.data.categoryInfo.originalPrice,
        sellPrice: response.data.categoryInfo.sellPrice,
      },
    };

    // Return success result
    const result: Result<UpdateMsPackageResponseType> = {
      status: true,
      data: updateMsPackage,
      message: "Membership package updated successfully.",
    };
    return result;
  } catch (error: any) {
    console.error("Membership package update failed:", error);

    // Detect network timeout specifically
    const isTimeout = error.message?.includes("timed out");

    // Return error result with descriptive message
    const result: Result<UpdateMsPackageResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your connection and try again."
        : error.message ||
          "An unexpected error occurred while updating the membership package.",
    };
    return result;
  }
};

export { updateMsPackageAction };
