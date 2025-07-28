import z from "zod";

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
