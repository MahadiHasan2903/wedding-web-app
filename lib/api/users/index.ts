import { fetchTyped } from "../client";
import { BASE_URL } from "@/lib/config/constants";
import { User } from "@/lib/types/user/user.types";
import { PaginatedResponse } from "@/lib/types/common/common.types";

type GetAllUsersResponse = PaginatedResponse<User>;
type GetAllAdminsResponse = PaginatedResponse<User>;
type GetAllBlockedUsersResponse = PaginatedResponse<User>;

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

/**
 * Fetches a paginated and filtered list of users from the backend API.
 *
 * @param page - The page number for pagination (default is 1).
 * @param pageSize - The number of users per page (default is 10).
 * @param age - Age range filter (e.g., "25-35").
 * @param height - Height range filter (e.g., "160-180").
 * @param weight - Weight range filter (e.g., "50-70").
 * @param lookingFor - Gender preference filter (e.g., "female").
 * @param maritalStatus - Marital status filter (e.g., "single").
 * @param hasChildren - Whether the user has children.
 * @param monthlyIncome - Monthly income range (e.g., "2000-3000").
 * @param religion - Religion filter.
 * @param education - Education level filter.
 * @param politicalView - Political view filter.
 * @param country - Country filter.
 * @param languageSpoken - Spoken language filter.
 * @param profession - Profession filter.
 * @param livingArrangement - Living arrangement filter.
 * @param familyMember - Number of family members filter.
 * @param hasPet - Whether the user has a pet.
 * @param dietaryPreference - Dietary preference filter.
 * @param smokingHabit - Smoking habit filter.
 * @param drinkingHabit - Drinking habit filter.
 * @param healthCondition - Health condition filter.
 * @returns A list of users and pagination metadata.
 * @throws Error if the API returns no data or an invalid structure.
 */
const getAllUsers = async (
  page = 1,
  pageSize = 10,
  age?: string,
  height?: string,
  weight?: string,
  lookingFor?: string,
  maritalStatus?: string,
  hasChildren?: boolean,
  monthlyIncome?: string,
  religion?: string,
  education?: string,
  politicalView?: string,
  country?: string,
  languageSpoken?: string,
  profession?: string,
  livingArrangement?: string,
  familyMember?: string,
  hasPet?: boolean,
  dietaryPreference?: string,
  smokingHabit?: string,
  drinkingHabit?: string,
  healthCondition?: string
) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  if (age) params.append("age", age);
  if (height) params.append("height", height);
  if (weight) params.append("weight", weight);
  if (lookingFor) params.append("lookingFor", lookingFor);
  if (maritalStatus) params.append("maritalStatus", maritalStatus);
  if (hasChildren !== undefined)
    params.append("hasChildren", hasChildren ? "true" : "false");
  if (monthlyIncome) params.append("monthlyIncome", monthlyIncome);
  if (religion) params.append("religion", religion);
  if (education) params.append("education", education);
  if (politicalView) params.append("politicalView", politicalView);
  if (country) params.append("country", country);
  if (languageSpoken) params.append("languageSpoken", languageSpoken);
  if (profession) params.append("profession", profession);
  if (livingArrangement) params.append("livingArrangement", livingArrangement);
  if (familyMember) params.append("familyMember", familyMember);
  if (hasPet !== undefined) params.append("hasPet", hasPet ? "true" : "false");
  if (dietaryPreference) params.append("dietaryPreference", dietaryPreference);
  if (smokingHabit) params.append("smokingHabit", smokingHabit);
  if (drinkingHabit) params.append("drinkingHabit", drinkingHabit);
  if (healthCondition) params.append("healthCondition", healthCondition);

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
 * Fetches a paginated list of admin users from the server.
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
  pageSize: number = 10
) => {
  const response = await fetchTyped<GetAllBlockedUsersResponse>(
    `${BASE_URL}/users/blocked-users?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

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
 * Fetches full details for a specific user by their ID.
 *
 * @param userId - The ID of the user to fetch.
 * @returns The complete `User` object.
 * @throws Error if the user is not found or the response is invalid.
 */
const getUserDetails = async (userId: string) => {
  const response = await fetchTyped<GetUserDetailsResponse>(
    `${BASE_URL}/users/${userId}`,
    {
      method: "GET",
    }
  );

  if (!response.data) {
    throw new Error(
      `Error: No user found for user id: ${userId} or invalid response from the server.`
    );
  }

  const userDetails: User = {
    ...response.data,
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
    ...response.data,
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
  getAllBlockedUsers,
  getLoggedInUserProfile,
};

export default users;
