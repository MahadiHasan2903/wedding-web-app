import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";

// Response type for retrieving all membership packages
interface GetAllMsPackageResponse {
  status: number;
  success: boolean;
  message: string;
  data: Array<{
    id: number;
    title: string;
    description: string[];
    status: string;
    categoryInfo: {
      category: string;
      originalPrice: number;
      sellPrice: number;
    };
  }>;
}

//Response type for retrieving a single membership package by ID
interface GetMsPackageDetailsResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    description: string[];
    status: string;
    categoryInfo: {
      category: string;
      originalPrice: number;
      sellPrice: number;
    };
  };
}

/**
 * Fetch all membership packages from the API
 *
 * @returns A promise that resolves to an array of `MembershipPackage`
 * @throws Will throw an error if the API call fails or returns no data
 */
const getAllMsPackages = async (): Promise<MembershipPackage[]> => {
  const response = await fetchTyped<GetAllMsPackageResponse>(
    `${BASE_URL}/membership-package`,
    {
      method: "GET",
    }
  );

  if (!response.data) {
    throw new Error("Unable to retrieve membership packages.");
  }

  const membershipPackages: MembershipPackage[] = response.data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.status,
    categoryInfo: {
      category: item.categoryInfo.category,
      originalPrice: item.categoryInfo.originalPrice,
      sellPrice: item.categoryInfo.sellPrice,
    },
  }));

  return membershipPackages;
};

/**
 * Fetch membership package details by ID
 *
 * @param msPackageId - The ID of the membership package to fetch
 * @returns A promise that resolves to a `MembershipPackage`
 * @throws Will throw an error if the package ID is invalid or the API call fails
 */
const getMsPackageDetails = async (
  msPackageId: string
): Promise<MembershipPackage> => {
  const response = await fetchTyped<GetMsPackageDetailsResponse>(
    `${BASE_URL}/membership-package/${msPackageId}`,
    {
      method: "GET",
    }
  );

  if (!response.data) {
    throw new Error(`Membership package with ID "${msPackageId}" not found.`);
  }

  const membershipPackage: MembershipPackage = {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    status: response.data.status,
    categoryInfo: {
      category: response.data.categoryInfo.category,
      originalPrice: response.data.categoryInfo.originalPrice,
      sellPrice: response.data.categoryInfo.sellPrice,
    },
  };

  return membershipPackage;
};

// Membership Package Service

const msPackage = {
  getAllMsPackages,
  getMsPackageDetails,
};

export default msPackage;
