import { z } from "zod";

/**
 * Schema for updating like/dislike status of a user
 */
export const updateLikeDislikeStatusSchema = z.object({
  likedUserId: z
    .string()
    .min(2, "User is required")
    .refine((value) => value.trim().length > 0, "User is required"),
  status: z
    .string()
    .min(2, "Status is required")
    .refine((value) => value.trim().length > 0, "Status is required"),
});

export type UpdateLikeDislikeStatusType = z.infer<
  typeof updateLikeDislikeStatusSchema
>;

export const updateLikeDislikeStatusResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.array(z.string()),
});

export type UpdateLikeDislikeStatusResponseType = z.infer<
  typeof updateLikeDislikeStatusResponseSchema.shape.data
>;

/**
 * Schema for updating block/unblock status of a user
 */
export const updateBlockUnblockStatusSchema = z.object({
  blockedUserId: z
    .string()
    .min(2, "User is required")
    .refine((value) => value.trim().length > 0, "User is required"),
  status: z
    .string()
    .min(2, "Status is required")
    .refine((value) => value.trim().length > 0, "Status is required"),
});

export type UpdateBlockUnblockStatusType = z.infer<
  typeof updateBlockUnblockStatusSchema
>;

export const updateBlockUnblockStatusResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.array(z.string()),
});

export type UpdateBlockUnblockStatusResponseType = z.infer<
  typeof updateBlockUnblockStatusResponseSchema.shape.data
>;
