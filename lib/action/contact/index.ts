"use server";

import { fetchZodTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import {
  ContactSubmissionFormType,
  contactSubmissionFormSchema,
  ContactSubmissionFormResponseType,
  contactSubmissionFormResponseSchema,
} from "@/lib/schema/contact/contact.schema";
import { Result } from "@/lib/types/common/common.types";

/**
 * Submits a contact form after validating the input and sends it to the backend API.
 *
 * @param requestPayload - The contact form data to be submitted.
 * @returns A Result object containing either the response data or an error message.
 */
const contactFormSubmitAction = async (
  requestPayload: ContactSubmissionFormType
) => {
  // Validate the contact form input
  const safeParse = contactSubmissionFormSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid contact form data.");
  }

  try {
    // Make POST request to the contact endpoint
    const response = await fetchZodTyped(
      `${BASE_URL}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      },
      contactSubmissionFormResponseSchema
    );

    const result: Result<ContactSubmissionFormResponseType> = {
      status: true,
      data: {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        subject: response.data.subject,
        message: response.data.message,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      },
      message: "Your message was submitted successfully.",
    };

    return result;
  } catch (error: any) {
    console.error("Contact form submission failed:", error);

    const isTimeout = error.message?.includes("timed out");

    const result: Result<ContactSubmissionFormResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "Request timed out. Please try again."
        : "Failed to submit the contact form. Please try again later.",
    };

    return result;
  }
};

export { contactFormSubmitAction };
