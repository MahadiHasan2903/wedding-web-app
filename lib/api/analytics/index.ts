import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";

//Interface representing the response structure for user statistics.
interface GetUserStatsResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    activeCount: number;
    inactiveCount: number;
    bannedCount: number;
    vipCount: number;
  };
}

//Interface representing the response structure for new registered user statistics.
interface GetNewRegistrationsStatsResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    last24HoursCount: number;
    last7DaysCount: number;
    last30DaysCount: number;
    last90DaysCount: number;
    monthlyRegistrations: Array<{
      month: string;
      year: number;
      newRegistration: number;
    }>;
  };
}

//Interface representing the response structure for gender wise user distribution statistics.
interface GetGenderDistributionResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    male: number;
    female: number;
    other: number;
    active: {
      male: number;
      female: number;
      other: number;
    };
    inactive: {
      male: number;
      female: number;
      other: number;
    };
  };
}

//Interface representing the response structure for subscription revenue statistics.
interface GetSubscriptionRevenueStatsResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    thisWeek: number;
    thisMonth: number;
    thisQuarter: number;
    total: number;
    monthlyRevenue: Array<{
      month: string;
      year: number;
      totalAmount: number;
    }>;
  };
}

/**
 * Fetches user statistics from the server.
 *
 * @param accessToken Optional Bearer token for authorization.
 * @returns An object containing active, inactive, and VIP user counts.
 * @throws Will throw an error if the server response is empty or invalid.
 */
const getUserStats = async (accessToken?: string) => {
  const response = await fetchTyped<GetUserStatsResponse>(
    `${BASE_URL}/users/users-stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Validate that the server returned data
  if (!response.data) {
    throw new Error(
      `Failed to fetch user statistics. The server returned an empty or malformed response.`
    );
  }

  // Extract and return only the relevant stats
  const userStats = {
    activeCount: response.data.activeCount,
    inactiveCount: response.data.inactiveCount,
    bannedCount: response.data.bannedCount,
    vipCount: response.data.vipCount,
  };

  return userStats;
};

/**
 * Fetches statistics for new user registrations over various time periods.
 *
 * @param accessToken Optional Bearer token for authorization.
 * @returns An object containing counts of new registrations in the last 24 hours, 7 days, 30 days, 90 days,  and an array of monthly registration details.
 * @throws Will throw an error if the server response is empty or invalid.
 */
const getNewRegistrationStats = async (accessToken?: string) => {
  const response = await fetchTyped<GetNewRegistrationsStatsResponse>(
    `${BASE_URL}/users/new-registrations-stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Ensure that the server returned valid data
  if (!response.data) {
    throw new Error(
      `Failed to fetch new registration statistics. The server returned an empty or malformed response.`
    );
  }

  // Map server response to a clean object with only relevant fields
  const newRegisteredUserStats = {
    last24HoursCount: response.data.last24HoursCount,
    last7DaysCount: response.data.last7DaysCount,
    last30DaysCount: response.data.last30DaysCount,
    last90DaysCount: response.data.last90DaysCount,
    monthlyRegistrations: response.data.monthlyRegistrations?.map((item) => ({
      month: item.month,
      year: item.year,
      newRegistration: item.newRegistration,
    })),
  };

  return newRegisteredUserStats;
};

/**
 * Fetches the gender distribution breakdown for all users.
 *
 * @param accessToken Optional Bearer token for authorization.
 * @returns An object containing overall counts and breakdowns for active and inactive users.
 * @throws Will throw an error if the server response is empty or invalid.
 */
const getGenderDistribution = async (accessToken?: string) => {
  const response = await fetchTyped<GetGenderDistributionResponse>(
    `${BASE_URL}/users/gender-distribution`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Ensure that the server returned valid data
  if (!response.data) {
    throw new Error(
      `Failed to fetch gender distribution. The server returned an empty or malformed response.`
    );
  }

  // Map the server response to a clean object
  const genderDistribution = {
    male: response.data.male,
    female: response.data.female,
    other: response.data.other,
    active: response.data.active,
    inactive: response.data.inactive,
  };

  return genderDistribution;
};

/**
 * Fetches subscription revenue statistics from the server.
 *
 * @param accessToken - Optional Bearer token used for authentication with the API.
 * @returns An object containing subscription revenue statistics
 * @throws Will throw an error if the response does not contain valid data.
 */
const getSubscriptionRevenueStats = async (accessToken?: string) => {
  // Make a GET request to fetch subscription revenue stats
  const response = await fetchTyped<GetSubscriptionRevenueStatsResponse>(
    `${BASE_URL}/payment/subscription-revenue`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Validate that the server returned proper data
  if (!response.data) {
    throw new Error(
      "Failed to fetch subscription revenue statistics: server returned an empty or malformed response."
    );
  }

  // Map the server response to a clean object containing only relevant fields
  const subscriptionRevenueStats = {
    thisWeek: response.data.thisWeek,
    thisMonth: response.data.thisMonth,
    thisQuarter: response.data.thisQuarter,
    total: response.data.total,
    monthlyRevenue: response.data.monthlyRevenue?.map((item) => ({
      month: item.month,
      year: item.year,
      totalAmount: item.totalAmount,
    })),
  };

  return subscriptionRevenueStats;
};

const analytics = {
  getUserStats,
  getGenderDistribution,
  getNewRegistrationStats,
  getSubscriptionRevenueStats,
};

export default analytics;
