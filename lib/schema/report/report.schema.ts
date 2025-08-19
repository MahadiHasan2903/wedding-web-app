import { z } from "zod";

export const addMessageReportSchema = z.object({
  conversationId: z
    .string()
    .min(1, "Conversation is required")
    .refine((value) => value.trim().length > 0, "Conversation is required"),
  senderId: z
    .string()
    .min(1, "Sender is required")
    .refine((value) => value.trim().length > 0, "Sender is required"),
  receiverId: z
    .string()
    .min(1, "Receiver is required")
    .refine((value) => value.trim().length > 0, "Receiver is required"),
  messageId: z
    .string()
    .min(1, "Message is required")
    .refine((value) => value.trim().length > 0, "Message is required"),
  type: z.string().optional(),
  description: z.string().optional(),
});

export type AddMessageReportType = z.infer<typeof addMessageReportSchema>;

export const addMessageReportResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.object({
    id: z.string(),
    conversationId: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
    messageId: z.string(),
    type: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type AddMessageReportResponseType = z.infer<
  typeof addMessageReportResponseSchema.shape.data
>;

export const reportActionSchema = z.object({
  action: z.string(),
});

export type ReportActionType = z.infer<typeof reportActionSchema>;

export const reportActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  status: z.number(),
  data: z.object({
    id: z.string(),
    conversationId: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
    messageId: z.string(),
    type: z.string(),
    description: z.string(),
    status: z.string(),
    actionTaken: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type ReportActionResponseType = z.infer<
  typeof reportActionResponseSchema.shape.data
>;
