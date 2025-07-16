"use server";

import { BASE_URL } from "@/lib/config/constants";
import { fetchZodTyped } from "../client";
import { Result } from "@/lib/types/common/result.types";
import {
  registrationRequestResponseSchema,
  RegistrationRequestResponseType,
  registrationRequestSchema,
  RegistrationRequestType,
} from "@/lib/schema/auth.schema";

/**
 * Sends a registration request to the server with validated user data,
 * and returns the result including the OTP if successful.
 *
 * @param requestPayload - User registration data to be validated and submitted
 * @returns A Result object indicating success or failure, with optional OTP data
 */
const accountRegistrationRequestAction = async (
  requestPayload: RegistrationRequestType
): Promise<Result<RegistrationRequestResponseType>> => {
  // Validate input data against the registration schema
  const safeParse = registrationRequestSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Provided registration data is invalid.");
  }

  try {
    // Make POST request to registration request endpoint
    const response = await fetchZodTyped(
      `${BASE_URL}/account/registration-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      },
      registrationRequestResponseSchema
    );

    console.log("Response:", JSON.stringify(response, null, 2));

    // Extract OTP from the response data (if present)
    const registrationData: RegistrationRequestResponseType = {
      otp: response.data.otp,
    };

    // Return a successful result with informative message
    return {
      status: true,
      data: registrationData,
      message:
        "Registration successful! An OTP has been sent to your email for verification.",
    };
  } catch (error: any) {
    console.error("Registration request failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return a failure result with context-sensitive error message
    return {
      status: false,
      message: isTimeout
        ? "The request timed out. Please try again."
        : "Failed to complete registration request. Please try again later.",
      data: null,
    };
  }
};

export { accountRegistrationRequestAction };
