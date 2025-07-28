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
