"use server";

import { fetchZodTyped } from "../client";
import {
  AddMessageReportType,
  addMessageReportSchema,
  AddMessageReportResponseType,
  addMessageReportResponseSchema,
  ReportActionType,
  reportActionSchema,
  reportActionResponseSchema,
  ReportActionResponseType,
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
    const updatedResponse: AddMessageReportResponseType = {
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
      data: updatedResponse,
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

/**
 * Apply an action (warn, ban, looks fine) on a report
 *
 * @param reportId - The ID of the report
 * @param requestPayload - The action to take on the report
 * @returns Result<ReportActionResponseType>
 */
const applyReportAction = async (
  reportId: string,
  requestPayload: ReportActionType
) => {
  const safeParse = reportActionSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid report action payload");
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Send PATCH request to backend API with typed response parsing
    const response = await fetchZodTyped(
      `${BASE_URL}/reports/${reportId}/take-action`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      reportActionResponseSchema
    );

    // Extract only the relevant fields for the client
    const updatedResponse: ReportActionResponseType = {
      id: response.data.id,
      conversationId: response.data.conversationId,
      messageId: response.data.messageId,
      senderId: response.data.senderId,
      receiverId: response.data.receiverId,
      type: response.data.type,
      description: response.data.description,
      status: response.data.status,
      actionTaken: response.data.actionTaken,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    // Return success result
    const result: Result<ReportActionResponseType> = {
      status: true,
      data: updatedResponse,
      message: `Action applied successfully.`,
    };
    return result;
  } catch (error: any) {
    console.error("Report action failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with user-friendly message
    const result: Result<ReportActionResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : error.message ||
          "Unable to apply action on the report. Please try again later.",
    };
    return result;
  }
};

export { applyReportAction, createMessageReportAction };
