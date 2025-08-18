import { z } from "zod";

export const updateMsPackageSchema = z.object({
  title: z
    .string()
    .min(2, "Package Title is required")
    .refine((value) => value.trim().length > 0, "Package Title is required"),
  description: z.array(z.string()).optional(),
  categoryInfo: z.object({
    category: z.string().optional(),
    originalPrice: z.coerce.number().min(1, "Original price is required"),
    sellPrice: z.coerce.number().min(1, "Selling price is required"),
  }),
});

export type UpdateMsPackageType = z.infer<typeof updateMsPackageSchema>;

export const updateMsPackageResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    id: z.number(),
    title: z.string(),
    description: z.array(z.string()),
    status: z.string(),
    categoryInfo: z.object({
      category: z.string(),
      originalPrice: z.number(),
      sellPrice: z.number(),
    }),
  }),
});

export type UpdateMsPackageResponseType = z.infer<
  typeof updateMsPackageResponseSchema.shape.data
>;
