"use server";

import { fetchZodTyped } from "../client";
import {
  InitiatePaymentType,
  initiatePaymentSchema,
  InitiatePaymentResponseType,
  initiatePaymentResponseSchema,
  PaypalPaymentCallbackResponseType,
  paypalPaymentCallbackResponseSchema,
} from "@/lib/schema/payment/payment.schema";
import { BASE_URL } from "@/lib/config/constants";
import { Result } from "@/lib/types/common/common.types";
import { getServerSessionData } from "@/lib/config/auth";

/**
 * Initiates a membership payment by validating the request payload,
 * sending a request to the payment API, and returning a typed response.
 *
 * @param requestPayload - The payment initiation data including membershipPurchaseId, currency, and gateway.
 * @returns A Result object indicating success or failure along with the payment details or error message.
 * @throws Throws an error if the payload validation fails.
 */
const initiatePaymentAction = async (requestPayload: InitiatePaymentType) => {
  // Validate input payload with Zod schema
  const safeParse = initiatePaymentSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error(
      "Invalid payment initiation data. Please verify your input and try again."
    );
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Call payment initiation API with authorization header
    const response = await fetchZodTyped(
      `${BASE_URL}/payment/initiate-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      initiatePaymentResponseSchema
    );

    // Extract relevant payment info from API response
    const msPackagePurchaseResponse: InitiatePaymentResponseType = {
      clientSecret: response.data.clientSecret,
      approvalUrl: response.data.approvalUrl,
      transactionId: response.data.transactionId,
      paymentStatus: response.data.paymentStatus,
    };

    // Return success result with payment details
    const result: Result<InitiatePaymentResponseType> = {
      status: true,
      data: msPackagePurchaseResponse,
      message: "Payment intent created successfully.",
    };

    return result;
  } catch (error: any) {
    console.error("Payment initiation failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with user-friendly error message
    const result: Result<InitiatePaymentResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : String(error.message) ||
          "An unexpected error occurred while initiating the payment. Please try again later.",
    };

    return result;
  }
};

/**
 * Handles the PayPal payment callback by capturing the order and updating related records.
 *
 * @param orderId - The PayPal order ID returned from the frontend
 * @returns A result object with the redirect URL or an error message
 */
const paypalPaymentCallbackAction = async (orderId: string) => {
  if (!orderId) {
    throw new Error("Missing PayPal order ID. Please try again.");
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Call the backend API to finalize the PayPal payment
    const response = await fetchZodTyped(
      `${BASE_URL}/payment/paypal-payment-callback?orderId=${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
      paypalPaymentCallbackResponseSchema
    );

    // Extract the redirect URL from the API response
    const msPackagePurchaseResponse: PaypalPaymentCallbackResponseType = {
      url: response.data.url,
    };

    // Return success result with redirect URL
    const result: Result<PaypalPaymentCallbackResponseType> = {
      status: true,
      data: msPackagePurchaseResponse,
      message:
        "PayPal payment completed successfully. Please log in again to see the updated changes.",
    };

    return result;
  } catch (error: any) {
    console.error("PayPal payment callback failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with appropriate error message
    const result: Result<PaypalPaymentCallbackResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : error.message ||
          "PayPal payment could not be processed. Please try again later.",
    };

    return result;
  }
};

export { initiatePaymentAction, paypalPaymentCallbackAction };
