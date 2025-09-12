import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";

interface GetUserLocationResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    ip: string;
    country: string;
    countryCode: string;
  };
}

const getUserLocationByIp = async () => {
  const response = await fetchTyped<GetUserLocationResponse>(
    `${BASE_URL}/location/country`,
    {
      method: "GET",
    }
  );

  // Validate that response contains data
  if (!response.data) {
    throw new Error("Failed to fetch user location or server returned no data");
  }

  // Normalize the report object
  const countryDetails = {
    ip: response.data.ip,
    country: response.data.country,
    countryCode: response.data.countryCode,
  };

  return countryDetails;
};

// Export the location API functions
const location = {
  getUserLocationByIp,
};

export default location;
