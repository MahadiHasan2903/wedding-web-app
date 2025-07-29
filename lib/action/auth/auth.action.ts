"use server";

import { fetchZodTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { Result } from "@/lib/types/common/common.types";
import {
  LoginType,
  loginSchema,
  LoginResponseType,
  ResetPasswordType,
  resetPasswordSchema,
  loginResponseSchema,
  RegistrationRequestType,
  registrationRequestSchema,
  ResetPasswordResponseType,
  ForgetPasswordRequestType,
  forgetPasswordRequestSchema,
  resetPasswordResponseSchema,
  RegistrationConfirmationType,
  ForgetPasswordConfirmationType,
  registrationConfirmationSchema,
  RegistrationRequestResponseType,
  forgetPasswordConfirmationSchema,
  registrationRequestResponseSchema,
  ForgetPasswordRequestResponseType,
  forgetPasswordRequestResponseSchema,
  RegistrationConfirmationResponseType,
  registrationConfirmationResponseSchema,
  forgetPasswordConfirmationResponseSchema,
  ForgetPasswordConfirmationResponseType,
} from "@/lib/schema/auth/auth.schema";

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
        profilePicture: response.data.user.profilePicture,
        purchasedMembership: response.data.user.purchasedMembership,
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

/**
 * Resets the user's password by validating the payload and sending a POST request.
 *
 * @param requestPayload - The new password data to be validated and sent to the backend.
 * @returns A result object indicating success or failure, with relevant messages.
 */
const resetPasswordAction = async (requestPayload: ResetPasswordType) => {
  // Validate the reset password payload using Zod schema
  const safeParse = resetPasswordSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error(
      "The provided password data is invalid. Please check the form inputs."
    );
  }

  try {
    // Make a POST request to the reset password endpoint
    const response = await fetchZodTyped(
      `${BASE_URL}/account/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      },
      resetPasswordResponseSchema
    );

    // Return success result
    const result: Result<ResetPasswordResponseType> = {
      status: true,
      data: response.data,
      message: "Your password has been successfully reset.",
    };

    return result;
  } catch (error: any) {
    console.error("Failed to reset password:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with more user-friendly messages
    const result: Result<ResetPasswordResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : "We couldn't reset your password at this time. Please try again later.",
    };

    return result;
  }
};

/**
 * Sends a forgot password request to the backend with the user's email address.
 *
 * @param requestPayload - An object containing the user's email.
 * @returns A result object indicating success or failure, with relevant data and message.
 */
const forgetPasswordRequestAction = async (
  requestPayload: ForgetPasswordRequestType
) => {
  // Validate the input using Zod schema
  const safeParse = forgetPasswordRequestSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid input. Please enter a valid email address.");
  }

  try {
    // Send POST request to the "forget password" endpoint
    const response = await fetchZodTyped(
      `${BASE_URL}/account/forget-password-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      },
      forgetPasswordRequestResponseSchema // Validate the response shape
    );

    const forgetPasswordResponseData = {
      otp: response.data.otp,
    };

    // Return success result
    const result: Result<ForgetPasswordRequestResponseType> = {
      status: true,
      data: forgetPasswordResponseData,
      message: "A verification code has been sent to your email address.",
    };

    return result;
  } catch (error: any) {
    console.error("Failed to send forgot password request:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with user-friendly error message
    const result: Result<ForgetPasswordRequestResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : "Unable to process your request at the moment. Please try again later.",
    };

    return result;
  }
};

/**
 * Verifies the OTP code sent during the "Forgot Password" process.
 *
 * This function first validates the input using a Zod schema. If valid, it sends a POST request
 * to the backend to confirm the OTP. The response indicates whether the user can proceed to reset the password.
 *
 * @param requestPayload - The payload containing the user's email and OTP code.
 * @returns A Result object indicating the outcome, including a message and optional data.
 */
const forgetPasswordConfirmationAction = async (
  requestPayload: ForgetPasswordConfirmationType
) => {
  // Validate input against the schema
  const safeParse = forgetPasswordConfirmationSchema.safeParse(requestPayload);

  if (!safeParse.success) {
    throw new Error("Invalid OTP confirmation data provided.");
  }

  try {
    // Send POST request to backend to verify OTP
    const response = await fetchZodTyped(
      `${BASE_URL}/account/verify-forget-password-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      },
      forgetPasswordConfirmationResponseSchema
    );

    // Return success result
    const result: Result<ForgetPasswordConfirmationResponseType> = {
      status: true,
      data: response.data,
      message: "OTP verified successfully. You may now reset your password.",
    };

    return result;
  } catch (error: any) {
    console.error("OTP verification failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with appropriate error message
    const result: Result<ForgetPasswordConfirmationResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : "Failed to verify OTP. Please make sure the code is correct and try again.",
    };

    return result;
  }
};

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
 * Verifies the user's registration by confirming the OTP sent to their email.
 * Validates the input, sends the OTP confirmation to the server,
 * and returns the result with user info or error messages.
 *
 * @param requestPayload - The OTP confirmation data including user info and OTP code.
 * @returns A result object indicating success or failure, including user data and messages.
 */
const accountRegistrationConfirmationAction = async (
  requestPayload: RegistrationConfirmationType
) => {
  // Validate the OTP confirmation input against the schema
  const safeParse = registrationConfirmationSchema.safeParse(requestPayload);

  if (!safeParse.success) {
    throw new Error("Invalid OTP confirmation data provided.");
  }

  try {
    // Send POST request to verify the OTP and confirm registration
    const response = await fetchZodTyped(
      `${BASE_URL}/account/registration-confirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      },
      registrationConfirmationResponseSchema
    );

    // Extract user details from the response
    const registrationConfirmationData: RegistrationConfirmationResponseType = {
      id: response.data.id,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      phoneNumber: response.data.phoneNumber,
      userRole: response.data.userRole,
      accountStatus: response.data.accountStatus,
    };

    // Return success result with confirmation message
    const result: Result<RegistrationConfirmationResponseType> = {
      status: true,
      data: registrationConfirmationData,
      message: "OTP verified successfully. Your account is now activated.",
    };

    return result;
  } catch (error: any) {
    console.error("OTP verification failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with appropriate message
    const result: Result<RegistrationConfirmationResponseType> = {
      status: false,
      message: isTimeout
        ? "The request timed out. Please check your connection and try again."
        : "Failed to verify OTP. Please ensure your code is correct and try again.",
      data: null,
    };

    return result;
  }
};

export {
  accountLoginAction,
  resetPasswordAction,
  forgetPasswordRequestAction,
  forgetPasswordConfirmationAction,
  accountRegistrationRequestAction,
  accountRegistrationConfirmationAction,
};
