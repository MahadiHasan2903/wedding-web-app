"use server";

import { fetchZodTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import {
  MsPackagePurchaseType,
  msPackagePurchaseSchema,
  MsPackagePurchaseResponseType,
  msPackagePurchaseResponseSchema,
} from "@/lib/schema/ms-purchase/msPurchase.schema";
import { Result } from "@/lib/types/common/common.types";
import { getServerSessionData } from "@/lib/config/auth";

/**
 * Sends a membership package purchase request to the backend API.
 *
 * - Validates the request payload using Zod before sending.
 * - Uses server session to retrieve access token.
 * - Handles both success and error cases with appropriate responses.
 *
 * @param requestPayload - The validated membership package purchase payload.
 * @returns A promise that resolves to a `Result` containing the purchase data or an error message.
 */
const msPackagePurchaseAction = async (
  requestPayload: MsPackagePurchaseType
) => {
  const safeParse = msPackagePurchaseSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid membership purchase data.");
  }

  const { accessToken } = await getServerSessionData();

  try {
    const response = await fetchZodTyped(
      `${BASE_URL}/membership-purchases`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      msPackagePurchaseResponseSchema
    );

    // Map response to the expected response type
    const msPackagePurchaseResponse: MsPackagePurchaseResponseType = {
      id: response.data.id,
      user: response.data.user,
      amount: response.data.amount,
      discount: response.data.discount,
      payable: response.data.payable,
      status: response.data.status,
      paymentStatus: response.data.paymentStatus,
      purchasedAt: response.data.purchasedAt,
      expiresAt: response.data.expiresAt,
      membershipPackageInfo: {
        id: response.data.membershipPackageInfo.id,
        title: response.data.membershipPackageInfo.title,
        description: response.data.membershipPackageInfo.description,
        categoryInfo: {
          category: response.data.membershipPackageInfo.categoryInfo.category,
          originalPrice:
            response.data.membershipPackageInfo.categoryInfo.originalPrice,
          sellPrice: response.data.membershipPackageInfo.categoryInfo.sellPrice,
        },
      },
    };

    // Return success result
    const result: Result<MsPackagePurchaseResponseType> = {
      status: true,
      data: msPackagePurchaseResponse,
      message: "Membership package purchase initialized successfully.",
    };

    return result;
  } catch (error: any) {
    console.error("Membership package purchase failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result
    const result: Result<MsPackagePurchaseResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your connection and try again."
        : String(error.message) ||
          "An unexpected error occurred while processing the membership purchase. Please try again later.",
    };

    return result;
  }
};

export { msPackagePurchaseAction };
