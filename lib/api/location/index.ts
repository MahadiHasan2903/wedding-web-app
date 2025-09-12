import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { Location } from "@/lib/types/common/common.types";

interface GetLocationResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    ip: string;
    country: string;
    region: string;
    city: string;
  };
}

/**
 * Fetches the user's location details based on their IP address.
 *
 * This function sends a GET request to the `/location/country` endpoint
 * and returns a normalized object containing IP, country, region, and city.
 * If the fetch fails or any field is missing, default values are returned.
 *
 * @returns  An object containing the user's IP, country, region, and city.
 */
const getUserLocationByIp = async () => {
  try {
    // Send request to the location API
    const response = await fetchTyped<GetLocationResponse>(
      `${BASE_URL}/location/country`,
      {
        method: "GET",
      }
    );

    // Normalize the response object with fallback default values
    const countryDetails: Location = {
      ip: response?.data?.ip ?? "0.0.0.0",
      country: response?.data?.country ?? "Unknown",
      region: response?.data?.region ?? "Unknown",
      city: response?.data?.city ?? "Unknown",
    };

    return countryDetails;
  } catch (error) {
    // If fetch fails, return default values
    return {
      ip: "0.0.0.0",
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
    };
  }
};

// Export the location API functions
const location = {
  getUserLocationByIp,
};

export default location;
