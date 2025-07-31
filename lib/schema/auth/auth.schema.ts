import { z } from "zod";
import { passwordRegex } from "../common/media.schema";

/**
 * Registration Request Schema
 */

// Schema to validate user registration input
export const registrationRequestSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name is required")
    .refine((value) => value.trim().length > 0, "First name is required"),

  lastName: z
    .string()
    .min(2, "Last name is required")
    .refine((value) => value.trim().length > 0, "Last name is required"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must be 6+ characters with uppercase, lowercase, number, and special character."
    ),
  retypePassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must be 6+ characters with uppercase, lowercase, number, and special character."
    )
    .optional(),
});

// Type inferred from registrationRequestSchema
export type RegistrationRequestType = z.infer<typeof registrationRequestSchema>;

/**
 * Registration Request Response Schema
 */

// Schema to validate backend response after registration request
export const registrationRequestResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    otp: z.string().optional(),
  }),
});

// Type inferred from `data` shape of registrationRequestResponseSchema
export type RegistrationRequestResponseType = z.infer<
  typeof registrationRequestResponseSchema.shape.data
>;

/**
 * Registration Confirmation Schema
 */

// Schema to validate OTP-based registration confirmation input
export const registrationConfirmationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP is required"),
});

// Type inferred from registrationConfirmationSchema
export type RegistrationConfirmationType = z.infer<
  typeof registrationConfirmationSchema
>;

/**
 * Registration Confirmation Response Schema
 */

// Schema to validate backend response after confirming registration
export const registrationConfirmationResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().nullable(),
    userRole: z.string(),
    accountStatus: z.string(),
  }),
});

// Type inferred from `data` shape of registrationConfirmationResponseSchema
export type RegistrationConfirmationResponseType = z.infer<
  typeof registrationConfirmationResponseSchema.shape.data
>;

//
// 🔑 Login Schema
//

// Schema to validate login form input
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must be 6+ characters with uppercase, lowercase, number, and special character."
    ),
});

// Type inferred from loginSchema
export type LoginType = z.infer<typeof loginSchema>;

/**
 * Login Response Schema
 */

// Schema to validate backend response after login
export const loginResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    user: z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phoneNumber: z.string().nullable(),
      userRole: z.string(),
      accountStatus: z.string(),
      profilePicture: z
        .object({
          id: z.string(),
          collectionName: z.string(),
          filename: z.string(),
          originalName: z.string(),
          extension: z.string(),
          mimetype: z.string(),
          size: z.number(),
          directory: z.string(),
          disk: z.string(),
          url: z.string().url(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        })
        .nullable(),
      purchasedMembership: z.object({
        id: z.string(),
        user: z.string(),
        amount: z.string(),
        discount: z.string(),
        payable: z.string(),
        status: z.string(),
        paymentStatus: z.string(),
        purchasedAt: z.string().datetime(),
        expiresAt: z.string().datetime().nullable(),
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
      }),
    }),
    accessToken: z.string(),
  }),
});

// Type inferred from `data` shape of loginResponseSchema
export type LoginResponseType = z.infer<typeof loginResponseSchema.shape.data>;

/**
 * Forgot Password Request Schema
 */

// Schema to validate forgot password form input
export const forgetPasswordRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Type inferred from forgetPasswordRequestSchema
export type ForgetPasswordRequestType = z.infer<
  typeof forgetPasswordRequestSchema
>;

/**
 * Forgot Password Request Response Schema
 */

// Schema to validate backend response after requesting password reset
export const forgetPasswordRequestResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    otp: z.string().optional(),
  }),
});

// Type inferred from `data` shape of forgetPasswordRequestResponseSchema
export type ForgetPasswordRequestResponseType = z.infer<
  typeof forgetPasswordRequestResponseSchema.shape.data
>;

/**
 * Reset Password Schema
 */

// Schema to validate reset password form input
export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP is required"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((value) => value.trim().length > 0, "Password is required"),
  retypePassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((value) => value.trim().length > 0, "Password is required")
    .optional(),
});

// Type inferred from resetPasswordSchema
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

/**
 * Forget Password Confirmation Schema
 */

// Schema to validate OTP-based forgetPassword confirmation input
export const forgetPasswordConfirmationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP is required"),
});

// Type inferred from forgetPasswordConfirmationSchema
export type ForgetPasswordConfirmationType = z.infer<
  typeof forgetPasswordConfirmationSchema
>;

// Schema to validate backend response after forget password confirmation
export const forgetPasswordConfirmationResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.object({}).strict(),
});

// Type inferred from `data` shape of forgetPasswordConfirmationResponseSchema
export type ForgetPasswordConfirmationResponseType = z.infer<
  typeof forgetPasswordConfirmationResponseSchema.shape.data
>;

/**
 * Reset Password Response Schema
 */

// Schema to validate backend response after resetting password
export const resetPasswordResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.object({}).strict(),
});

// Type inferred from `data` shape of resetPasswordResponseSchema
export type ResetPasswordResponseType = z.infer<
  typeof resetPasswordResponseSchema.shape.data
>;
