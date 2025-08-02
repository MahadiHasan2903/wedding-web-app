import { z } from "zod";

export const addConversationSchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
});

export type AddConversationType = z.infer<typeof addConversationSchema>;

export const addConversationResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.object({
    id: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
    lastMessageId: z.string().nullable(),
    lastMessage: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type AddConversationResponseType = z.infer<
  typeof addConversationResponseSchema.shape.data
>;
