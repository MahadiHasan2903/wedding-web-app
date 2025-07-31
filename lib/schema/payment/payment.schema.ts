import { z } from "zod";

// Schema for initiating a payment request
export const initiatePaymentSchema = z.object({
  membershipPurchaseId: z
    .string()
    .min(2, "Membership purchase id is required")
    .refine(
      (value) => value.trim().length > 0,
      "Membership purchase id is required"
    ),
  currency: z
    .string()
    .min(2, "Currency is required")
    .refine((value) => value.trim().length > 0, "Currency is required"),
  gateway: z
    .string()
    .min(2, "Gateway is required")
    .refine((value) => value.trim().length > 0, "Gateway is required"),
});

// Type for the initiate payment request payload
export type InitiatePaymentType = z.infer<typeof initiatePaymentSchema>;

// Schema for a successful payment initiation response
export const initiatePaymentResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    clientSecret: z.string().optional(),
    approvalUrl:z.string().optional(),
    transactionId: z.string(),
    paymentStatus: z.string(),
  }),
});

// Type for the `data` field of a payment initiation response
export type InitiatePaymentResponseType = z.infer<
  typeof initiatePaymentResponseSchema.shape.data
>;

// Schema for PayPal payment callback response
export const paypalPaymentCallbackResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    url: z.string(),
  }),
});

// Type for the `data` field of PayPal payment callback response
export type PaypalPaymentCallbackResponseType = z.infer<
  typeof paypalPaymentCallbackResponseSchema.shape.data
>;
