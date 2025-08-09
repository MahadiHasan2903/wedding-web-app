"use server";

import { fetchZodTyped } from "../client";
import {
  AddMessageReportType,
  addMessageReportSchema,
  AddMessageReportResponseType,
  addMessageReportResponseSchema,
} from "@/lib/schema/report/report.schema";
import { BASE_URL } from "@/lib/config/constants";
import { Result } from "@/lib/types/common/common.types";
import { getServerSessionData } from "@/lib/config/auth";

/**
 * Creates a new message report.
 *
 * @param requestPayload - The message report data provided by the user.
 * @returns A Result object containing either the created report data or an error message.
 */
const createMessageReportAction = async (
  requestPayload: AddMessageReportType
) => {
  // Validate the request payload locally
  const safeParse = addMessageReportSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid report data");
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Send POST request to backend API with typed response parsing
    const response = await fetchZodTyped(
      `${BASE_URL}/reports`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      addMessageReportResponseSchema
    );

    // Extract only the relevant fields for the client
    const submissionResponse: AddMessageReportResponseType = {
      id: response.data.id,
      conversationId: response.data.conversationId,
      messageId: response.data.messageId,
      senderId: response.data.senderId,
      receiverId: response.data.receiverId,
      type: response.data.type,
      description: response.data.description,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    // Return success result
    const result: Result<AddMessageReportResponseType> = {
      status: true,
      data: submissionResponse,
      message: "Your report has been submitted successfully.",
    };
    return result;
  } catch (error: any) {
    console.error("Message report submission failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with user-friendly message
    const result: Result<AddMessageReportResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : error.message ||
          "Unable to submit the report. Please try again later.",
    };
    return result;
  }
};

export { createMessageReportAction };
