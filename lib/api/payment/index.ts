import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { PaginatedResponse } from "@/lib/types/common/common.types";
import { PaymentTransaction } from "@/lib/types/payment/payment.types";

type GetLoggedInUserPaymentHistoryResponse =
  PaginatedResponse<PaymentTransaction>;

/**
 * Fetches the payment history for the currently logged-in user.
 *
 * Makes a GET request to the `/payment/my-history` endpoint with pagination
 * and authorization headers. Parses and transforms the response into a structured
 * list of `PaymentTransaction` items, along with pagination metadata.
 *
 * @param accessToken - The JWT access token for authenticating the user.
 * @param page - (Optional) The page number to fetch. Defaults to 1.
 * @param pageSize - (Optional) The number of items per page. Defaults to 10.
 * @returns An object containing the array of payment history entries (`paymentHistories`)
 *          and associated pagination metadata (`paginationInfo`).
 * @throws If the server response is missing or invalid.
 */

const getLoggedInUserPaymentHistory = async (
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetLoggedInUserPaymentHistoryResponse>(
    `${BASE_URL}/payment/my-history?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Error: No payment history found or invalid response from the server.`
    );
  }

  const paymentHistories: PaymentTransaction[] = response.data.items.map(
    (payment) => ({
      id: payment.id,
      user: payment.user,
      transactionId: payment.transactionId,
      currency: payment.currency,
      gateway: payment.gateway,
      servicePurchaseId: {
        id: payment.servicePurchaseId.id,
        user: payment.servicePurchaseId.user,
        packageId: payment.servicePurchaseId.packageId,
        purchasePackageCategory:
          payment.servicePurchaseId.purchasePackageCategory,
        amount: payment.servicePurchaseId.amount,
        discount: payment.servicePurchaseId.discount,
        payable: payment.servicePurchaseId.payable,
        status: payment.servicePurchaseId.status,
        paymentStatus: payment.servicePurchaseId.paymentStatus,
        purchasedAt: payment.servicePurchaseId.purchasedAt,
        expiresAt: payment.servicePurchaseId.expiresAt,
      },
      paymentStatus: payment.paymentStatus,
      amount: payment.amount,
      discount: payment.discount,
      payable: payment.payable,
      storeAmount: payment.storeAmount,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    })
  );

  return {
    paymentHistories,
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

const payment = {
  getLoggedInUserPaymentHistory,
};

export default payment;
