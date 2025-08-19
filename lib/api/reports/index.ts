import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { Report } from "@/lib/types/reports/reports.types";
import { PaginatedResponse } from "@/lib/types/common/common.types";

type GetReportsListResponse = PaginatedResponse<Report>;

interface GetReportDetailsResponse {
  success: boolean;
  message: string;
  status: number;
  data: Report;
}

/**
 * Fetches a paginated list of reports from the server.
 *
 * @param accessToken - Optional JWT token for authorization
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 10)
 * @returns An object containing the list of reports and pagination info
 * @throws Error if the server response does not contain data
 */
const getAllReports = async (
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetReportsListResponse>(
    `${BASE_URL}/reports?page=${page}&pageSize=${pageSize}&sort=createdAt,DESC`,
    {
      method: "GET",
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    }
  );

  // Validate that response contains data
  if (!response.data) {
    throw new Error(
      `Failed to fetch reports. Server returned no data for page ${page} with pageSize ${pageSize}.`
    );
  }

  // Normalize each report object
  const allReports: Report[] = response.data.items.map((report) => ({
    id: report.id,
    conversationId: report.conversationId,
    senderId: report.senderId,
    receiverId: report.receiverId,
    messageId: report.messageId,
    type: report.type,
    description: report.description,
    status: report.status,
    actionTaken: report.actionTaken,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  }));

  // Return report list with pagination metadata
  return {
    allReports,
    paginationInfo: {
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
      itemsPerPage: response.data.itemsPerPage,
      currentPage: response.data.currentPage,
      hasPrevPage: response.data.hasPrevPage,
      hasNextPage: response.data.hasNextPage,
      prevPage: response.data.prevPage,
      nextPage: response.data.nextPage,
    },
  };
};

/**
 * Fetches the details of a single report by its ID.
 *
 * @param reportId - UUID of the report to fetch
 * @param accessToken - Optional JWT token for authorization
 * @returns The detailed report object
 * @throws Error if the server response does not contain the report
 */
const getReportDetails = async (reportId: string, accessToken?: string) => {
  const response = await fetchTyped<GetReportDetailsResponse>(
    `${BASE_URL}/reports/${reportId}`,
    {
      method: "GET",
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    }
  );

  // Validate that response contains data
  if (!response.data) {
    throw new Error(
      `Failed to fetch report details for report ID: ${reportId}. Server returned no data.`
    );
  }

  // Normalize the report object
  const reportDetails: Report = {
    id: response.data.id,
    conversationId: response.data.conversationId,
    senderId: response.data.senderId,
    receiverId: response.data.receiverId,
    messageId: response.data.messageId,
    type: response.data.type,
    description: response.data.description,
    status: response.data.status,
    actionTaken: response.data.actionTaken,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
  };

  return reportDetails;
};

// Export the reports API functions
const reports = {
  getAllReports,
  getReportDetails,
};

export default reports;
