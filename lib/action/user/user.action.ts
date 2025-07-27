"use server";

import { fetchZodTyped } from "@/lib/action/client";
import { getServerSessionData } from "@/lib/config/auth";
import { BASE_URL } from "@/lib/config/constants";
import {
  updateUserResponseSchema,
  UpdateUserResponseType,
} from "@/lib/schema/user/user.schema";
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

export { updateUserProfileAction };
