import { z } from "zod";

// Define a schema for validating user registration payload
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
    .refine((value) => value.trim().length > 0, "Password is required"),

  retypePassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((value) => value.trim().length > 0, "Password is required")
    .optional(),
});

// Infer TypeScript type from schema
export type RegistrationRequestType = z.infer<typeof registrationRequestSchema>;

// Define a schema for validating user registration request response schema
export const registrationRequestResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    otp: z.string().optional(),
  }),
});

// Infer TypeScript type from schema
export type RegistrationRequestResponseType = z.infer<
  typeof registrationRequestResponseSchema.shape.data
>;
