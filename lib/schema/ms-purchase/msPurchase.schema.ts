import { z } from "zod";

// Schema for purchasing a membership package
export const msPackagePurchaseSchema = z.object({
  msPackageId: z.coerce.number(),
  purchasePackageCategory: z
    .string()
    .min(2, "Package category is required")
    .refine((value) => value.trim().length > 0, "Package category is required"),
});

export type MsPackagePurchaseType = z.infer<typeof msPackagePurchaseSchema>;

// Schema for the API response after purchasing a membership package
export const msPackagePurchaseResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
  data: z.object({
    id: z.string(),
    user: z.string(),
    amount: z.number(),
    discount: z.number(),
    payable: z.number(),
    status: z.string(),
    paymentStatus: z.string(),
    purchasedAt: z.string(),
    expiresAt: z.string().nullable(),
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
});

// Type for the `data` field of the package purchase response
export type MsPackagePurchaseResponseType = z.infer<
  typeof msPackagePurchaseResponseSchema.shape.data
>;
