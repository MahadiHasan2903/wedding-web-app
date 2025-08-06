import { z } from "zod";

// Schema to validate response after deleting message attachment
export const deleteMessageAttachmentResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.object({}),
});

// Type for delete message attachment API response
export type DeleteMessageAttachmentResponseType = z.infer<
  typeof deleteMessageAttachmentResponseSchema.shape.data
>;
