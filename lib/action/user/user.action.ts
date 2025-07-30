"use server";

import {
  UpdateUserResponseType,
  updateUserResponseSchema,
  DeleteAdditionalPhotosResponseType,
  deleteAdditionalPhotosResponseSchema,
  changePasswordSchema,
  ChangePasswordType,
  changePasswordResponseSchema,
  ChangePasswordResponseType,
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
        : "Failed to update profile. Please check your input or try again.",
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
        : "Failed to delete photo from your album. Please try again.",
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
        : "Failed to change your password at this time. Please try again later.",
    };

    return result;
  }
};

export {
  updateUserProfileAction,
  deleteUserAdditionalPhotoAction,
  changePasswordAction,
};
