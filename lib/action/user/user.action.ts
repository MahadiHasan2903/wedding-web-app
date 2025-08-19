"use server";

import {
  ChangePasswordType,
  changePasswordSchema,
  UpdateUserResponseType,
  UpdateAccountStatusType,
  updateUserResponseSchema,
  updateAccountStatusSchema,
  ChangePasswordResponseType,
  changePasswordResponseSchema,
  DeleteAdditionalPhotosResponseType,
  deleteAdditionalPhotosResponseSchema,
  UpdateUserRoleType,
  updateUserRoleSchema,
} from "@/lib/schema/user/user.schema";
import { BASE_URL } from "@/lib/config/constants";
import { fetchZodTyped } from "@/lib/action/client";
import { getServerSessionData } from "@/lib/config/auth";
import { Result } from "@/lib/types/common/common.types";

/**
 * Updates the user's profile by sending a PATCH request with the provided FormData.
 *
 * @param updatedProfileData - FormData containing the updated user profile fields.
 * @returns Result object containing updated user data on success, or an error message on failure.
 */
const updateUserProfileAction = async (updatedProfileData: FormData) => {
  // Validate the incoming form data
  if (!updatedProfileData) {
    throw new Error("No profile data provided for update.");
  }

  const { accessToken } = await getServerSessionData();

  try {
    const response = await fetchZodTyped(
      `${BASE_URL}/users/update-profile`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: updatedProfileData,
      },
      updateUserResponseSchema
    );

    // Map the validated response data to the expected user type
    const updatedUserProfile: UpdateUserResponseType = {
      id: response.data.id,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      phoneNumber: response.data.phoneNumber,
      bio: response.data.bio,
      motherTongue: response.data.motherTongue,
      dateOfBirth: response.data.dateOfBirth,
      gender: response.data.gender,
      nationality: response.data.nationality,
      country: response.data.country,
      city: response.data.city,
      maritalStatus: response.data.maritalStatus,
      profilePicture: response.data.profilePicture ?? null,
      additionalPhotos: response.data.additionalPhotos ?? [],
      blockedUsers: response.data.blockedUsers ?? null,
      likedUsers: response.data.likedUsers ?? null,
      socialMediaLinks: response.data.socialMediaLinks,
      preferredLanguages: response.data.preferredLanguages ?? [],
      userRole: response.data.userRole,
      accountStatus: response.data.accountStatus,
      purchasedMembership: response.data.purchasedMembership ?? null,
      timeZone: response.data.timeZone,
      highestEducation: response.data.highestEducation,
      institutionName: response.data.institutionName,
      profession: response.data.profession,
      companyName: response.data.companyName,
      monthlyIncome: response.data.monthlyIncome,
      incomeCurrency: response.data.incomeCurrency,
      religion: response.data.religion,
      politicalView: response.data.politicalView,
      livingArrangement: response.data.livingArrangement,
      familyMemberCount: response.data.familyMemberCount ?? null,
      interestedInGender: response.data.interestedInGender,
      lookingFor: response.data.lookingFor,
      preferredAgeRange: response.data.preferredAgeRange,
      preferredNationality: response.data.preferredNationality,
      religionPreference: response.data.religionPreference,
      politicalPreference: response.data.politicalPreference,
      partnerExpectations: response.data.partnerExpectations,
      weightKg: response.data.weightKg,
      heightCm: response.data.heightCm,
      bodyType: response.data.bodyType,
      drinkingHabit: response.data.drinkingHabit,
      smokingHabit: response.data.smokingHabit,
      healthCondition: response.data.healthCondition,
      hasPet: response.data.hasPet ?? null,
      dietaryPreference: response.data.dietaryPreference,
      children: response.data.children,
      familyBackground: response.data.familyBackground,
      culturalPractices: response.data.culturalPractices,
      astrologicalSign: response.data.astrologicalSign,
      loveLanguage: response.data.loveLanguage,
      favoriteQuote: response.data.favoriteQuote,
      profileVisibility: response.data.profileVisibility,
      photoVisibility: response.data.photoVisibility,
      messageAvailability: response.data.messageAvailability,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    // Return success result with updated user data
    const result: Result<UpdateUserResponseType> = {
      status: true,
      data: updatedUserProfile,
      message: "Profile updated successfully.",
    };

    return result;
  } catch (error: any) {
    console.error("Profile update failed", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with a descriptive error message
    const result: Result<UpdateUserResponseType> = {
      status: false,
      message: isTimeout
        ? "The request timed out. Please try again later."
        : String(error.message) ||
          "Failed to update profile. Please check your input or try again.",
      data: null,
    };

    return result;
  }
};

/**
 * Deletes an additional photo from the user's profile by photo ID.
 *
 * @param photoId - The ID of the photo to delete
 * @returns A `Result` object indicating the success or failure of the operation
 */
const deleteUserAdditionalPhotoAction = async (photoId: string) => {
  // Ensure a valid photo ID is provided
  if (!photoId) {
    throw new Error("Invalid photo ID provided.");
  }

  const { accessToken } = await getServerSessionData();

  try {
    const response = await fetchZodTyped(
      `${BASE_URL}/users/photo/${photoId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      deleteAdditionalPhotosResponseSchema
    );

    // Return success result with server-confirmed response
    const result: Result<DeleteAdditionalPhotosResponseType> = {
      status: true,
      data: response.data,
      message: "Photo deleted from your album successfully.",
    };

    return result;
  } catch (error: any) {
    console.error("Photo deletion failed", error);

    const isTimeout = error.message?.includes("timed out");

    // Return failure result with a descriptive error message
    const result: Result<DeleteAdditionalPhotosResponseType> = {
      status: false,
      message: isTimeout
        ? "The request timed out. Please try again later."
        : String(error.message) ||
          "Failed to delete photo from your album. Please try again.",
      data: null,
    };

    return result;
  }
};

/**
 * Handles the password change process by validating input and sending
 * a request to the backend API to update the user's password.
 *
 * @param requestPayload - The password change form data
 * @returns Result object indicating success or failure of the operation
 */
const changePasswordAction = async (requestPayload: ChangePasswordType) => {
  // Validate the password change input using Zod schema
  const safeParse = changePasswordSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    // Throw error if validation fails
    throw new Error("Invalid password data.");
  }

  const { accessToken } = await getServerSessionData();

  try {
    // Send POST request to change password endpoint with validated data
    const response = await fetchZodTyped(
      `${BASE_URL}/account/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          currentPassword: requestPayload.currentPassword,
          newPassword: requestPayload.newPassword,
        }),
      },
      changePasswordResponseSchema
    );

    // Return success result with response data
    const result: Result<ChangePasswordResponseType> = {
      status: true,
      message: "Your password has been changed successfully.",
      data: response.data,
    };

    return result;
  } catch (error: any) {
    console.error("Password change failed:", error);

    // Detect if error was due to a timeout
    const isTimeout = error.message?.includes("timed out");

    // Return failure result with appropriate message
    const result: Result<ChangePasswordResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "Request timed out. Please check your connection and try again."
        : String(error.message) ||
          "Failed to change your password at this time. Please try again later.",
    };

    return result;
  }
};

/**
 * Updates the user's account status by sending a PATCH request to the API.
 *
 * @param requestPayload - The object containing the new account status
 * @returns Result object indicating success or failure of the update operation
 */
const updateAccountStatusAction = async (
  requestPayload: UpdateAccountStatusType
) => {
  // Validate the request payload against the schema
  const safeParse = updateAccountStatusSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    // Throw error if validation fails
    throw new Error("Invalid account status provided.");
  }

  // Retrieve access token for authorization
  const { accessToken } = await getServerSessionData();

  try {
    // Send PATCH request to update account status endpoint
    const response = await fetchZodTyped(
      `${BASE_URL}/users/profile/account-status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      updateUserResponseSchema
    );

    // Map response data to expected user profile structure
    const updatedUserProfile: UpdateUserResponseType = {
      id: response.data.id,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      phoneNumber: response.data.phoneNumber,
      bio: response.data.bio,
      motherTongue: response.data.motherTongue,
      dateOfBirth: response.data.dateOfBirth,
      gender: response.data.gender,
      nationality: response.data.nationality,
      country: response.data.country,
      city: response.data.city,
      maritalStatus: response.data.maritalStatus,
      profilePicture: response.data.profilePicture ?? null,
      additionalPhotos: response.data.additionalPhotos ?? [],
      blockedUsers: response.data.blockedUsers ?? null,
      likedUsers: response.data.likedUsers ?? null,
      socialMediaLinks: response.data.socialMediaLinks,
      preferredLanguages: response.data.preferredLanguages ?? [],
      userRole: response.data.userRole,
      accountStatus: response.data.accountStatus,
      purchasedMembership: response.data.purchasedMembership ?? null,
      timeZone: response.data.timeZone,
      highestEducation: response.data.highestEducation,
      institutionName: response.data.institutionName,
      profession: response.data.profession,
      companyName: response.data.companyName,
      monthlyIncome: response.data.monthlyIncome,
      incomeCurrency: response.data.incomeCurrency,
      religion: response.data.religion,
      politicalView: response.data.politicalView,
      livingArrangement: response.data.livingArrangement,
      familyMemberCount: response.data.familyMemberCount ?? null,
      interestedInGender: response.data.interestedInGender,
      lookingFor: response.data.lookingFor,
      preferredAgeRange: response.data.preferredAgeRange,
      preferredNationality: response.data.preferredNationality,
      religionPreference: response.data.religionPreference,
      politicalPreference: response.data.politicalPreference,
      partnerExpectations: response.data.partnerExpectations,
      weightKg: response.data.weightKg,
      heightCm: response.data.heightCm,
      bodyType: response.data.bodyType,
      drinkingHabit: response.data.drinkingHabit,
      smokingHabit: response.data.smokingHabit,
      healthCondition: response.data.healthCondition,
      hasPet: response.data.hasPet ?? null,
      dietaryPreference: response.data.dietaryPreference,
      children: response.data.children,
      familyBackground: response.data.familyBackground,
      culturalPractices: response.data.culturalPractices,
      astrologicalSign: response.data.astrologicalSign,
      loveLanguage: response.data.loveLanguage,
      favoriteQuote: response.data.favoriteQuote,
      profileVisibility: response.data.profileVisibility,
      photoVisibility: response.data.photoVisibility,
      messageAvailability: response.data.messageAvailability,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    // Return success result with updated user profile
    const result: Result<UpdateUserResponseType> = {
      status: true,
      message: "Your account status has been updated successfully.",
      data: updatedUserProfile,
    };

    return result;
  } catch (error: any) {
    console.error("Account status update failed:", error);

    // Check if error is due to request timeout
    const isTimeout = error.message?.includes("timed out");

    // Return failure result with appropriate message based on error type
    const result: Result<UpdateUserResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : String(error.error) ||
          "Failed to update account status at the moment. Please try again later.",
    };

    return result;
  }
};

/**
 * Updates the role of a user in the system.
 *
 * @param requestPayload - The request payload containing userId and new role.
 * @returns A result object containing the updated user profile or an error message.
 */
const updateUserRoleAction = async (requestPayload: UpdateUserRoleType) => {
  // Validate the request payload against the Zod schema
  const safeParse = updateUserRoleSchema.safeParse(requestPayload);
  if (!safeParse.success) {
    throw new Error("Invalid user details provided.");
  }

  // Retrieve access token for authorization (from server session)
  const { accessToken } = await getServerSessionData();

  try {
    // Send PATCH request to backend API for updating user role
    const response = await fetchZodTyped(
      `${BASE_URL}/users/update-role`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      },
      updateUserResponseSchema
    );

    // Map response data to a strongly typed user profile object
    const updatedUserProfile: UpdateUserResponseType = {
      id: response.data.id,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      phoneNumber: response.data.phoneNumber,
      bio: response.data.bio,
      motherTongue: response.data.motherTongue,
      dateOfBirth: response.data.dateOfBirth,
      gender: response.data.gender,
      nationality: response.data.nationality,
      country: response.data.country,
      city: response.data.city,
      maritalStatus: response.data.maritalStatus,
      profilePicture: response.data.profilePicture ?? null,
      additionalPhotos: response.data.additionalPhotos ?? [],
      blockedUsers: response.data.blockedUsers ?? null,
      likedUsers: response.data.likedUsers ?? null,
      socialMediaLinks: response.data.socialMediaLinks,
      preferredLanguages: response.data.preferredLanguages ?? [],
      userRole: response.data.userRole,
      accountStatus: response.data.accountStatus,
      purchasedMembership: response.data.purchasedMembership ?? null,
      timeZone: response.data.timeZone,
      highestEducation: response.data.highestEducation,
      institutionName: response.data.institutionName,
      profession: response.data.profession,
      companyName: response.data.companyName,
      monthlyIncome: response.data.monthlyIncome,
      incomeCurrency: response.data.incomeCurrency,
      religion: response.data.religion,
      politicalView: response.data.politicalView,
      livingArrangement: response.data.livingArrangement,
      familyMemberCount: response.data.familyMemberCount ?? null,
      interestedInGender: response.data.interestedInGender,
      lookingFor: response.data.lookingFor,
      preferredAgeRange: response.data.preferredAgeRange,
      preferredNationality: response.data.preferredNationality,
      religionPreference: response.data.religionPreference,
      politicalPreference: response.data.politicalPreference,
      partnerExpectations: response.data.partnerExpectations,
      weightKg: response.data.weightKg,
      heightCm: response.data.heightCm,
      bodyType: response.data.bodyType,
      drinkingHabit: response.data.drinkingHabit,
      smokingHabit: response.data.smokingHabit,
      healthCondition: response.data.healthCondition,
      hasPet: response.data.hasPet ?? null,
      dietaryPreference: response.data.dietaryPreference,
      children: response.data.children,
      familyBackground: response.data.familyBackground,
      culturalPractices: response.data.culturalPractices,
      astrologicalSign: response.data.astrologicalSign,
      loveLanguage: response.data.loveLanguage,
      favoriteQuote: response.data.favoriteQuote,
      profileVisibility: response.data.profileVisibility,
      photoVisibility: response.data.photoVisibility,
      messageAvailability: response.data.messageAvailability,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    // Return a successful result object
    const result: Result<UpdateUserResponseType> = {
      status: true,
      message: "User role updated successfully.",
      data: updatedUserProfile,
    };

    return result;
  } catch (error: any) {
    console.error("User role update failed:", error);

    // Check if the error was caused by a request timeout
    const isTimeout = error.message?.includes("timed out");

    // Return a failure result object with appropriate error message
    const result: Result<UpdateUserResponseType> = {
      status: false,
      data: null,
      message: isTimeout
        ? "The request timed out. Please check your internet connection and try again."
        : String(error.error) ||
          "Failed to update user role at the moment. Please try again later.",
    };

    return result;
  }
};

export {
  changePasswordAction,
  updateUserRoleAction,
  updateUserProfileAction,
  updateAccountStatusAction,
  deleteUserAdditionalPhotoAction,
};
