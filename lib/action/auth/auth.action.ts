"use server";

import { BASE_URL } from "@/lib/config/constants";
import { fetchZodTyped } from "../client";
import { Result } from "@/lib/types/common/result.types";
import {
  LoginType,
  loginSchema,
  LoginResponseType,
  loginResponseSchema,
  RegistrationRequestType,
  registrationRequestSchema,
  RegistrationRequestResponseType,
  registrationRequestResponseSchema,
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
) => {
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

    // Extract OTP from the response data (if present)
    const registrationData: RegistrationRequestResponseType = {
      otp: response.data.otp,
    };

    // Return a successful result with informative message
    const result: Result<RegistrationRequestResponseType> = {
      status: true,
      data: registrationData,
      message:
        "Registration successful. We've sent an OTP to your email for verification.",
    };

    return result;
  } catch (error: any) {
    console.error("Registration request failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return a failure result with context-sensitive error message
    const result: Result<RegistrationRequestResponseType> = {
      status: false,
      message: isTimeout
        ? "The request timed out. Please try again."
        : "Failed to complete registration request. Please try again later.",
      data: null,
    };

    return result;
  }
};

/**
 * Handles user login by validating credentials, sending them to the server,
 * and returning the structured login result including access token and user info.
 *
 * @param requestPayload - The login credentials (email and password)
 * @returns A Result containing user info and access token or error message
 */
const accountLoginAction = async (requestPayload: LoginType) => {
  // Validate the login payload using Zod
  const safeParse = loginSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid login data.");
  }

  try {
    // Make POST request to the login endpoint
    const response = await fetchZodTyped(
      `${BASE_URL}/account/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      },
      loginResponseSchema
    );

    // Structure the response data
    const loginResponseData: LoginResponseType = {
      user: {
        id: response.data.user.id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        phoneNumber: response.data.user.phoneNumber,
        userRole: response.data.user.userRole,
        accountStatus: response.data.user.accountStatus,
      },
      accessToken: response.data.accessToken,
    };

    // Successful result
    const result: Result<LoginResponseType> = {
      status: true,
      data: loginResponseData,
      message: "Login successful. Welcome back!",
    };

    return result;
  } catch (error: any) {
    console.error("Login request failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Failed result
    const result: Result<LoginResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "Login request timed out. Please try again."
        : "Login failed. Please check your credentials.",
    };

    return result;
  }
};

export { accountRegistrationRequestAction, accountLoginAction };
