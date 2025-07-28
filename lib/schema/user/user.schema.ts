import { z } from "zod";
import { mediaSchema } from "../common/media.schema";

export const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
  motherTongue: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  maritalStatus: z.string().optional(),
  profilePicture: z.any().optional(),
  additionalPhotos: z.array(z.any()).optional(),
  socialMediaLinks: z
    .array(
      z.object({
        name: z.string(),
        link: z.string().optional(),
      })
    )
    .optional(),
  preferredLanguages: z.array(z.string()).optional(),
  timeZone: z.string().optional(),
  highestEducation: z.string().optional(),
  institutionName: z.string().optional(),
  profession: z.string().optional(),
  companyName: z.string().optional(),
  monthlyIncome: z.union([z.string(), z.number()]).optional(),
  incomeCurrency: z.string().optional(),
  religion: z.string().optional(),
  politicalView: z.string().optional(),
  livingArrangement: z.string().optional(),
  familyMemberCount: z.number().optional(),
  interestedInGender: z.string().optional(),
  lookingFor: z.string().optional(),
  preferredAgeRange: z.string().optional(),
  preferredNationality: z.array(z.string()).optional(),
  religionPreference: z.string().optional(),
  politicalPreference: z.string().optional(),
  partnerExpectations: z.string().optional(),
  bodyType: z.string().optional(),
  drinkingHabit: z.string().optional(),
  smokingHabit: z.string().optional(),
  healthCondition: z.string().optional(),
  hasPet: z.union([z.string(), z.boolean()]).optional(),
  weightKg: z.union([z.string(), z.number()]).optional(),
  heightCm: z.union([z.string(), z.number()]).optional(),
  children: z.union([z.string(), z.number()]).optional(),
  dietaryPreference: z.string().optional(),
  familyBackground: z.string().optional(),
  culturalPractices: z.string().optional(),
  astrologicalSign: z.string().optional(),
  loveLanguage: z.string().optional(),
  favoriteQuote: z.string().optional(),
  profileVisibility: z.string().optional(),
  photoVisibility: z.string().optional(),
  messageAvailability: z.string().optional(),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;

export const updateUserResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    bio: z.string(),
    motherTongue: z.string(),
    dateOfBirth: z.string(),
    gender: z.string(),
    nationality: z.string(),
    country: z.string(),
    city: z.string(),
    maritalStatus: z.string(),
    profilePicture: mediaSchema.optional().nullable(),
    additionalPhotos: z.array(mediaSchema).default([]),
    blockedUsers: z.array(z.string()).nullable(),
    likedUsers: z.array(z.string()).nullable(),
    socialMediaLinks: z
      .array(
        z.object({
          name: z.string(),
          link: z.string().url().nullable(),
        })
      )
      .optional(),
    preferredLanguages: z.array(z.string()).default([]),
    userRole: z.string(),
    accountStatus: z.string(),
    purchasedMembership: z
      .object({
        id: z.string(),
        user: z.string(),
        amount: z.string(),
        discount: z.string(),
        payable: z.string(),
        status: z.string(),
        paymentStatus: z.string(),
        purchasedAt: z.string(),
        expiresAt: z.string().nullable(),
        membershipPackageInfo: z.object({
          id: z.number(),
          title: z.string(),
          description: z.array(z.string()),
          categoryInfo: z.object({
            category: z.string(),
            originalPrice: z.number(),
            sellPrice: z.number(),
          }),
        }),
      })
      .nullable(),
    timeZone: z.string(),
    highestEducation: z.string(),
    institutionName: z.string(),
    profession: z.string(),
    companyName: z.string(),
    monthlyIncome: z.number(),
    incomeCurrency: z.string(),
    religion: z.string(),
    politicalView: z.string(),
    livingArrangement: z.string(),
    familyMemberCount: z.number().nullable(),
    interestedInGender: z.string(),
    lookingFor: z.string(),
    preferredAgeRange: z.string(),
    preferredNationality: z.array(z.string()),
    religionPreference: z.string(),
    politicalPreference: z.string(),
    partnerExpectations: z.string(),
    weightKg: z.number(),
    heightCm: z.number(),
    bodyType: z.string(),
    drinkingHabit: z.string(),
    smokingHabit: z.string(),
    healthCondition: z.string(),
    hasPet: z.boolean().nullable(),
    dietaryPreference: z.string(),
    children: z.number(),
    familyBackground: z.string(),
    culturalPractices: z.string(),
    astrologicalSign: z.string(),
    loveLanguage: z.string(),
    favoriteQuote: z.string(),
    profileVisibility: z.string(),
    photoVisibility: z.string(),
    messageAvailability: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type UpdateUserResponseType = z.infer<
  typeof updateUserResponseSchema.shape.data
>;

export const deleteAdditionalPhotosResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.object({}),
});

export type DeleteAdditionalPhotosResponseType = z.infer<
  typeof deleteAdditionalPhotosResponseSchema.shape.data
>;
