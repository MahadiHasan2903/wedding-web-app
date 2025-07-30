import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { User } from "@/lib/types/user/user.types";
import {
  PaginatedResponse,
  UserFilterOptions,
} from "@/lib/types/common/common.types";

type GetAllUsersResponse = PaginatedResponse<User>;
type GetAllAdminsResponse = PaginatedResponse<User>;
type GetAllBlockedUsersResponse = PaginatedResponse<User>;
type GetAllLikedUsersResponse = PaginatedResponse<User>;

interface GetUserDetailsResponse {
  status: number;
  success: boolean;
  message: string;
  data: User;
}

interface GetLoggedInUserProfileResponse {
  status: number;
  success: boolean;
  message: string;
  data: User;
}

interface GetUserLikeStatusCheckResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    isLiked: boolean;
  };
}

interface GetUserBlockStatusCheckResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    isBlocked: boolean;
  };
}

/**
 * Fetches a paginated and filtered list of users from the backend API.
 *
 * @param page - The page number for pagination (default is 1).
 * @param pageSize - The number of users per page (default is 10).
 * @param filters - Filter options
 * @returns
 */
const getAllUsers = async (
  page = 1,
  pageSize = 10,
  filters: UserFilterOptions = {}
) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  for (const [key, value] of Object.entries(filters)) {
    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "") &&
      !(typeof value === "boolean" && value === false)
    ) {
      params.append(key, String(value));
    }
  }

  const url = `${BASE_URL}/users?${params.toString()}`;

  const response = await fetchTyped<GetAllUsersResponse>(url, {
    method: "GET",
  });

  if (!response.data) {
    throw new Error(
      "Error: No users found or invalid response from the server."
    );
  }

  const users: User[] = response.data.items.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber ?? null,
    bio: user.bio ?? null,
    motherTongue: user.motherTongue ?? null,
    dateOfBirth: user.dateOfBirth ?? null,
    gender: user.gender ?? null,
    nationality: user.nationality ?? null,
    country: user.country ?? null,
    city: user.city ?? null,
    maritalStatus: user.maritalStatus ?? null,
    profilePicture: user.profilePicture ?? null,
    additionalPhotos: user.additionalPhotos ?? [],
    blockedUsers: user.blockedUsers ?? null,
    likedUsers: user.likedUsers ?? null,
    socialMediaLinks: user.socialMediaLinks ?? null,
    preferredLanguages: user.preferredLanguages ?? null,
    userRole: user.userRole,
    accountStatus: user.accountStatus,
    purchasedMembership: user.purchasedMembership ?? null,
    timeZone: user.timeZone ?? null,
    highestEducation: user.highestEducation ?? null,
    institutionName: user.institutionName ?? null,
    profession: user.profession ?? null,
    companyName: user.companyName ?? null,
    monthlyIncome: user.monthlyIncome ?? null,
    incomeCurrency: user.incomeCurrency ?? null,
    religion: user.religion ?? null,
    politicalView: user.politicalView ?? null,
    livingArrangement: user.livingArrangement ?? null,
    familyMemberCount: user.familyMemberCount ?? null,
    interestedInGender: user.interestedInGender ?? null,
    lookingFor: user.lookingFor ?? null,
    preferredAgeRange: user.preferredAgeRange ?? null,
    preferredNationality: user.preferredNationality ?? null,
    religionPreference: user.religionPreference ?? null,
    politicalPreference: user.politicalPreference ?? null,
    partnerExpectations: user.partnerExpectations ?? null,
    weightKg: user.weightKg ?? null,
    heightCm: user.heightCm ?? null,
    bodyType: user.bodyType ?? null,
    drinkingHabit: user.drinkingHabit ?? null,
    smokingHabit: user.smokingHabit ?? null,
    healthCondition: user.healthCondition ?? null,
    hasPet: user.hasPet ?? null,
    dietaryPreference: user.dietaryPreference ?? null,
    children: user.children ?? null,
    familyBackground: user.familyBackground ?? null,
    culturalPractices: user.culturalPractices ?? null,
    astrologicalSign: user.astrologicalSign ?? null,
    loveLanguage: user.loveLanguage ?? null,
    favoriteQuote: user.favoriteQuote ?? null,
    profileVisibility: user.profileVisibility,
    photoVisibility: user.photoVisibility,
    messageAvailability: user.messageAvailability,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  return {
    users,
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
 * Fetches full details for a specific user by their ID.
 *
 * @param userId - The ID of the user to fetch.
 * @param accessToken - Optional access token for authentication.
 *
 * @returns The complete `User` object.
 * @throws Error if the user is not found or the response is invalid.
 */
const getUserDetails = async (userId: string, accessToken?: string) => {
  const response = await fetchTyped<GetUserDetailsResponse>(
    `${BASE_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Error: No user found for user id: ${userId} or invalid response from the server.`
    );
  }

  const userDetails: User = {
    id: response.data.id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    userRole: response.data.userRole,
    accountStatus: response.data.accountStatus,
    phoneNumber: response.data.phoneNumber ?? null,
    bio: response.data.bio ?? null,
    motherTongue: response.data.motherTongue ?? null,
    dateOfBirth: response.data.dateOfBirth ?? null,
    gender: response.data.gender ?? null,
    nationality: response.data.nationality ?? null,
    country: response.data.country ?? null,
    city: response.data.city ?? null,
    maritalStatus: response.data.maritalStatus ?? null,
    profilePicture: response.data.profilePicture ?? null,
    additionalPhotos: response.data.additionalPhotos ?? [],
    blockedUsers: response.data.blockedUsers ?? null,
    likedUsers: response.data.likedUsers ?? null,
    socialMediaLinks: response.data.socialMediaLinks ?? null,
    preferredLanguages: response.data.preferredLanguages ?? null,
    purchasedMembership: response.data.purchasedMembership ?? null,
    timeZone: response.data.timeZone ?? null,
    highestEducation: response.data.highestEducation ?? null,
    institutionName: response.data.institutionName ?? null,
    profession: response.data.profession ?? null,
    companyName: response.data.companyName ?? null,
    monthlyIncome: response.data.monthlyIncome ?? null,
    incomeCurrency: response.data.incomeCurrency ?? null,
    religion: response.data.religion ?? null,
    politicalView: response.data.politicalView ?? null,
    livingArrangement: response.data.livingArrangement ?? null,
    familyMemberCount: response.data.familyMemberCount ?? null,
    interestedInGender: response.data.interestedInGender ?? null,
    lookingFor: response.data.lookingFor ?? null,
    preferredAgeRange: response.data.preferredAgeRange ?? null,
    preferredNationality: response.data.preferredNationality ?? null,
    religionPreference: response.data.religionPreference ?? null,
    politicalPreference: response.data.politicalPreference ?? null,
    partnerExpectations: response.data.partnerExpectations ?? null,
    weightKg: response.data.weightKg ?? null,
    heightCm: response.data.heightCm ?? null,
    bodyType: response.data.bodyType ?? null,
    drinkingHabit: response.data.drinkingHabit ?? null,
    smokingHabit: response.data.smokingHabit ?? null,
    healthCondition: response.data.healthCondition ?? null,
    hasPet: response.data.hasPet ?? null,
    dietaryPreference: response.data.dietaryPreference ?? null,
    children: response.data.children ?? null,
    familyBackground: response.data.familyBackground ?? null,
    culturalPractices: response.data.culturalPractices ?? null,
    astrologicalSign: response.data.astrologicalSign ?? null,
    loveLanguage: response.data.loveLanguage ?? null,
    favoriteQuote: response.data.favoriteQuote ?? null,
  };

  return userDetails;
};

/**
 * Fetches a paginated list of admin users from the server.
 *
 * @param accessToken - Optional bearer token for authentication
 * @param page - Page number to fetch
 * @param pageSize - Number of admins per page
 * @returns A list of admins and pagination metadata.
 * @throws Error if the response contains no data or is invalid
 */
const getAllAdmins = async (
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetAllAdminsResponse>(
    `${BASE_URL}/users/admins?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Error: No admin found or invalid response from the server.`
    );
  }

  const admins: User[] = response.data.items.map((admin) => ({
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    phoneNumber: admin.phoneNumber ?? null,
    bio: admin.bio ?? null,
    motherTongue: admin.motherTongue ?? null,
    dateOfBirth: admin.dateOfBirth ?? null,
    gender: admin.gender ?? null,
    nationality: admin.nationality ?? null,
    country: admin.country ?? null,
    city: admin.city ?? null,
    maritalStatus: admin.maritalStatus ?? null,
    profilePicture: admin.profilePicture ?? null,
    additionalPhotos: admin.additionalPhotos ?? [],
    blockedUsers: admin.blockedUsers ?? null,
    likedUsers: admin.likedUsers ?? null,
    socialMediaLinks: admin.socialMediaLinks ?? null,
    preferredLanguages: admin.preferredLanguages ?? null,
    userRole: admin.userRole,
    accountStatus: admin.accountStatus,
    purchasedMembership: admin.purchasedMembership ?? null,
    timeZone: admin.timeZone ?? null,
    highestEducation: admin.highestEducation ?? null,
    institutionName: admin.institutionName ?? null,
    profession: admin.profession ?? null,
    companyName: admin.companyName ?? null,
    monthlyIncome: admin.monthlyIncome ?? null,
    incomeCurrency: admin.incomeCurrency ?? null,
    religion: admin.religion ?? null,
    politicalView: admin.politicalView ?? null,
    livingArrangement: admin.livingArrangement ?? null,
    familyMemberCount: admin.familyMemberCount ?? null,
    interestedInGender: admin.interestedInGender ?? null,
    lookingFor: admin.lookingFor ?? null,
    preferredAgeRange: admin.preferredAgeRange ?? null,
    preferredNationality: admin.preferredNationality ?? null,
    religionPreference: admin.religionPreference ?? null,
    politicalPreference: admin.politicalPreference ?? null,
    partnerExpectations: admin.partnerExpectations ?? null,
    weightKg: admin.weightKg ?? null,
    heightCm: admin.heightCm ?? null,
    bodyType: admin.bodyType ?? null,
    drinkingHabit: admin.drinkingHabit ?? null,
    smokingHabit: admin.smokingHabit ?? null,
    healthCondition: admin.healthCondition ?? null,
    hasPet: admin.hasPet ?? null,
    dietaryPreference: admin.dietaryPreference ?? null,
    children: admin.children ?? null,
    familyBackground: admin.familyBackground ?? null,
    culturalPractices: admin.culturalPractices ?? null,
    astrologicalSign: admin.astrologicalSign ?? null,
    loveLanguage: admin.loveLanguage ?? null,
    favoriteQuote: admin.favoriteQuote ?? null,
    profileVisibility: admin.profileVisibility,
    photoVisibility: admin.photoVisibility,
    messageAvailability: admin.messageAvailability,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  }));

  return {
    admins,
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
 * Fetches a paginated list of all blocked users from the server.
 *
 * @param accessToken - Optional bearer token for authentication
 * @param page - Page number to fetch
 * @param pageSize - Number of users per page
 * @returns A list of blocked users and pagination metadata.
 * @throws Error if the response contains no data or is invalid
 */
const getAllBlockedUsers = async (
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10,
  name?: string
) => {
  // Constructing the URL with optional query parameters
  const url =
    `${BASE_URL}/users/blocked-users?page=${page}&pageSize=${pageSize}&sort=id,DESC` +
    (name && name !== "" ? `&name=${name}` : "");

  const response = await fetchTyped<GetAllBlockedUsersResponse>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.data) {
    throw new Error(
      `Error: No blocked users found or invalid response from the server.`
    );
  }

  const blockedUsers: User[] = response.data.items.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber ?? null,
    bio: user.bio ?? null,
    motherTongue: user.motherTongue ?? null,
    dateOfBirth: user.dateOfBirth ?? null,
    gender: user.gender ?? null,
    nationality: user.nationality ?? null,
    country: user.country ?? null,
    city: user.city ?? null,
    maritalStatus: user.maritalStatus ?? null,
    profilePicture: user.profilePicture ?? null,
    additionalPhotos: user.additionalPhotos ?? [],
    blockedUsers: user.blockedUsers ?? null,
    likedUsers: user.likedUsers ?? null,
    socialMediaLinks: user.socialMediaLinks ?? null,
    preferredLanguages: user.preferredLanguages ?? null,
    userRole: user.userRole,
    accountStatus: user.accountStatus,
    purchasedMembership: user.purchasedMembership ?? null,
    timeZone: user.timeZone ?? null,
    highestEducation: user.highestEducation ?? null,
    institutionName: user.institutionName ?? null,
    profession: user.profession ?? null,
    companyName: user.companyName ?? null,
    monthlyIncome: user.monthlyIncome ?? null,
    incomeCurrency: user.incomeCurrency ?? null,
    religion: user.religion ?? null,
    politicalView: user.politicalView ?? null,
    livingArrangement: user.livingArrangement ?? null,
    familyMemberCount: user.familyMemberCount ?? null,
    interestedInGender: user.interestedInGender ?? null,
    lookingFor: user.lookingFor ?? null,
    preferredAgeRange: user.preferredAgeRange ?? null,
    preferredNationality: user.preferredNationality ?? null,
    religionPreference: user.religionPreference ?? null,
    politicalPreference: user.politicalPreference ?? null,
    partnerExpectations: user.partnerExpectations ?? null,
    weightKg: user.weightKg ?? null,
    heightCm: user.heightCm ?? null,
    bodyType: user.bodyType ?? null,
    drinkingHabit: user.drinkingHabit ?? null,
    smokingHabit: user.smokingHabit ?? null,
    healthCondition: user.healthCondition ?? null,
    hasPet: user.hasPet ?? null,
    dietaryPreference: user.dietaryPreference ?? null,
    children: user.children ?? null,
    familyBackground: user.familyBackground ?? null,
    culturalPractices: user.culturalPractices ?? null,
    astrologicalSign: user.astrologicalSign ?? null,
    loveLanguage: user.loveLanguage ?? null,
    favoriteQuote: user.favoriteQuote ?? null,
    profileVisibility: user.profileVisibility,
    photoVisibility: user.photoVisibility,
    messageAvailability: user.messageAvailability,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  return {
    blockedUsers,
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
 * Fetches whether the current user has blocked the specified target user.
 *
 * @param targetUserId - The ID of the user to check.
 * @param accessToken - Optional access token for authentication.
 * @returns An object indicating whether the target user is blocked.
 */
const getUserBlockStatus = async (
  targetUserId: string,
  accessToken?: string
) => {
  const response = await fetchTyped<GetUserBlockStatusCheckResponse>(
    `${BASE_URL}/users/blocked-users/check/${targetUserId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to retrieve block status. User with ID "${targetUserId}" may not exist or the server returned an invalid response.`
    );
  }

  return {
    isBlocked: response.data.isBlocked,
  };
};

/**
 * Fetches a paginated list of all liked from the server.
 *
 * @param accessToken - Optional bearer token for authentication
 * @param page - Page number to fetch
 * @param pageSize - Number of users per page
 * @returns A list of liked users and pagination metadata.
 * @throws Error if the response contains no data or is invalid
 */
const getAllLikedUsers = async (
  accessToken?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetAllLikedUsersResponse>(
    `${BASE_URL}/users/liked-users?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Error: No liked users found or invalid response from the server.`
    );
  }

  const likedProfiles: User[] = response.data.items.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber ?? null,
    bio: user.bio ?? null,
    motherTongue: user.motherTongue ?? null,
    dateOfBirth: user.dateOfBirth ?? null,
    gender: user.gender ?? null,
    nationality: user.nationality ?? null,
    country: user.country ?? null,
    city: user.city ?? null,
    maritalStatus: user.maritalStatus ?? null,
    profilePicture: user.profilePicture ?? null,
    additionalPhotos: user.additionalPhotos ?? [],
    blockedUsers: user.blockedUsers ?? null,
    likedUsers: user.likedUsers ?? null,
    socialMediaLinks: user.socialMediaLinks ?? null,
    preferredLanguages: user.preferredLanguages ?? null,
    userRole: user.userRole,
    accountStatus: user.accountStatus,
    purchasedMembership: user.purchasedMembership ?? null,
    timeZone: user.timeZone ?? null,
    highestEducation: user.highestEducation ?? null,
    institutionName: user.institutionName ?? null,
    profession: user.profession ?? null,
    companyName: user.companyName ?? null,
    monthlyIncome: user.monthlyIncome ?? null,
    incomeCurrency: user.incomeCurrency ?? null,
    religion: user.religion ?? null,
    politicalView: user.politicalView ?? null,
    livingArrangement: user.livingArrangement ?? null,
    familyMemberCount: user.familyMemberCount ?? null,
    interestedInGender: user.interestedInGender ?? null,
    lookingFor: user.lookingFor ?? null,
    preferredAgeRange: user.preferredAgeRange ?? null,
    preferredNationality: user.preferredNationality ?? null,
    religionPreference: user.religionPreference ?? null,
    politicalPreference: user.politicalPreference ?? null,
    partnerExpectations: user.partnerExpectations ?? null,
    weightKg: user.weightKg ?? null,
    heightCm: user.heightCm ?? null,
    bodyType: user.bodyType ?? null,
    drinkingHabit: user.drinkingHabit ?? null,
    smokingHabit: user.smokingHabit ?? null,
    healthCondition: user.healthCondition ?? null,
    hasPet: user.hasPet ?? null,
    dietaryPreference: user.dietaryPreference ?? null,
    children: user.children ?? null,
    familyBackground: user.familyBackground ?? null,
    culturalPractices: user.culturalPractices ?? null,
    astrologicalSign: user.astrologicalSign ?? null,
    loveLanguage: user.loveLanguage ?? null,
    favoriteQuote: user.favoriteQuote ?? null,
    profileVisibility: user.profileVisibility,
    photoVisibility: user.photoVisibility,
    messageAvailability: user.messageAvailability,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  return {
    likedProfiles,
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
 * Fetches whether the current user has liked the specified target user.
 *
 * @param targetUserId - The ID of the user to check.
 * @param accessToken - Optional access token for authentication.
 * @returns An object indicating whether the target user is liked.
 */
const getUserLikeStatus = async (
  targetUserId: string,
  accessToken?: string
) => {
  const response = await fetchTyped<GetUserLikeStatusCheckResponse>(
    `${BASE_URL}/users/liked-users/check/${targetUserId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to retrieve like status. User with ID "${targetUserId}" may not exist or the server returned an invalid response.`
    );
  }

  return {
    isLiked: response.data.isLiked,
  };
};

/**
 * Fetches the profile details of the currently logged-in user.
 *
 * @param accessToken - Optional bearer token used for authentication
 * @returns A User object containing the profile information of the logged-in user
 * @throws Error if the server response is invalid or no user data is returned
 */
const getLoggedInUserProfile = async (accessToken?: string) => {
  const response = await fetchTyped<GetLoggedInUserProfileResponse>(
    `${BASE_URL}/users/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch user profile: Server returned no data or an invalid response.`
    );
  }

  const userDetails: User = {
    id: response.data.id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    userRole: response.data.userRole,
    phoneNumber: response.data.phoneNumber ?? null,
    bio: response.data.bio ?? null,
    accountStatus: response.data.accountStatus ?? null,
    motherTongue: response.data.motherTongue ?? null,
    dateOfBirth: response.data.dateOfBirth ?? null,
    gender: response.data.gender ?? null,
    nationality: response.data.nationality ?? null,
    country: response.data.country ?? null,
    city: response.data.city ?? null,
    maritalStatus: response.data.maritalStatus ?? null,
    profilePicture: response.data.profilePicture ?? null,
    additionalPhotos: response.data.additionalPhotos ?? [],
    blockedUsers: response.data.blockedUsers ?? null,
    likedUsers: response.data.likedUsers ?? null,
    socialMediaLinks: response.data.socialMediaLinks ?? null,
    preferredLanguages: response.data.preferredLanguages ?? null,
    purchasedMembership: response.data.purchasedMembership ?? null,
    timeZone: response.data.timeZone ?? null,
    highestEducation: response.data.highestEducation ?? null,
    institutionName: response.data.institutionName ?? null,
    profession: response.data.profession ?? null,
    companyName: response.data.companyName ?? null,
    monthlyIncome: response.data.monthlyIncome ?? null,
    incomeCurrency: response.data.incomeCurrency ?? null,
    religion: response.data.religion ?? null,
    politicalView: response.data.politicalView ?? null,
    livingArrangement: response.data.livingArrangement ?? null,
    familyMemberCount: response.data.familyMemberCount ?? null,
    interestedInGender: response.data.interestedInGender ?? null,
    lookingFor: response.data.lookingFor ?? null,
    preferredAgeRange: response.data.preferredAgeRange ?? null,
    preferredNationality: response.data.preferredNationality ?? null,
    religionPreference: response.data.religionPreference ?? null,
    politicalPreference: response.data.politicalPreference ?? null,
    partnerExpectations: response.data.partnerExpectations ?? null,
    weightKg: response.data.weightKg ?? null,
    heightCm: response.data.heightCm ?? null,
    bodyType: response.data.bodyType ?? null,
    drinkingHabit: response.data.drinkingHabit ?? null,
    smokingHabit: response.data.smokingHabit ?? null,
    healthCondition: response.data.healthCondition ?? null,
    hasPet: response.data.hasPet ?? null,
    dietaryPreference: response.data.dietaryPreference ?? null,
    children: response.data.children ?? null,
    familyBackground: response.data.familyBackground ?? null,
    culturalPractices: response.data.culturalPractices ?? null,
    astrologicalSign: response.data.astrologicalSign ?? null,
    loveLanguage: response.data.loveLanguage ?? null,
    favoriteQuote: response.data.favoriteQuote ?? null,
  };

  return userDetails;
};

const users = {
  getAllUsers,
  getAllAdmins,
  getUserDetails,
  getAllLikedUsers,
  getUserLikeStatus,
  getAllBlockedUsers,
  getUserBlockStatus,
  getLoggedInUserProfile,
};

export default users;
