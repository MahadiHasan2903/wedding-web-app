"use server";

import { BASE_URL } from "@/lib/config/constants";
import { fetchZodTyped } from "@/lib/action/client";
import { getServerSessionData } from "@/lib/config/auth";
import { Result } from "@/lib/types/common/common.types";
import {
  uploadMediaResponseSchema,
  UploadMediaResponseType,
} from "@/lib/schema/common/media.schema";

/**
 * Uploads media files (images/videos) to the server using a FormData payload.
 *
 * @param requestPayload - FormData object containing the media files to upload
 * @returns A result object indicating success or failure of the upload operation
 */
const uploadMediaAction = async (requestPayload: FormData) => {
  if (!requestPayload) {
    throw new Error("No media file(s) provided for upload.");
  }

  // Retrieve server session data including access token
  const { accessToken } = await getServerSessionData();

  try {
    // Attempt to upload media via HTTP POST request
    const response = await fetchZodTyped(
      `${BASE_URL}/media/upload-multiple`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: requestPayload,
      },
      uploadMediaResponseSchema
    );

    const uploadMediaResponse = response.data.map((media) => ({
      id: media.id,
      collectionName: media.collectionName,
      filename: media.filename,
      originalName: media.originalName,
      extension: media.extension,
      mimetype: media.mimetype,
      size: media.size,
      directory: media.directory,
      disk: media.disk,
      url: media.url,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt,
    }));

    // Construct and return a successful result
    const result: Result<UploadMediaResponseType> = {
      status: true,
      data: uploadMediaResponse,
      message: "File(s) uploaded successfully.",
    };

    return result;
  } catch (error: any) {
    console.error("File upload failed:", error);

    const isTimeout = error.message?.includes("timed out");

    // Return a structured error response with helpful message
    const result: Result<UploadMediaResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "Upload timed out. Please check your connection and try again."
        : `Upload failed: ${
            String(error.message) || "Unknown error occurred. Please try again."
          }`,
    };

    return result;
  }
};

export { uploadMediaAction };
