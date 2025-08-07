import z from "zod";

// Password regex for strong validation
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=_-])[A-Za-z\d@$!%*?&#^+=_-]{6,}$/;

export const mediaSchema = z.object({
  id: z.string(),
  collectionName: z.string(),
  filename: z.string(),
  originalName: z.string(),
  extension: z.string(),
  mimetype: z.string(),
  size: z.number(),
  directory: z.string(),
  disk: z.string(),
  url: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const uploadMediaResponseSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      collectionName: z.string(),
      filename: z.string(),
      originalName: z.string(),
      extension: z.string(),
      mimetype: z.string(),
      size: z.number(),
      directory: z.string(),
      disk: z.string(),
      url: z.string().url(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
});

export type UploadMediaResponseType = z.infer<
  typeof uploadMediaResponseSchema.shape.data
>;
