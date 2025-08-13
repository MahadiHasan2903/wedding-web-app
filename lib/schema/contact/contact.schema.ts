import { z } from "zod";

// Define a schema for validating contact submission request input
export const contactSubmissionFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name is required")
    .refine((value) => value.trim().length > 0, "First name is required"),
  lastName: z
    .string()
    .min(2, "Last name is required")
    .refine((value) => value.trim().length > 0, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  subject: z
    .string()
    .min(2, "Subject is required")
    .refine((value) => value.trim().length > 0, "Subject is required"),
  message: z
    .string()
    .min(2, "Message is required")
    .refine((value) => value.trim().length > 0, "Message is required"),
});

// Infer TypeScript type from schema
export type ContactSubmissionFormType = z.infer<
  typeof contactSubmissionFormSchema
>;

export const contactSubmissionFormResponseSchema = z.object({
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
    subject: z.string(),
    message: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type ContactSubmissionFormResponseType = z.infer<
  typeof contactSubmissionFormResponseSchema.shape.data
>;
