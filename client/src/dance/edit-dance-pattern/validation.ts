import { z } from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Maximum 50 characters allowed" }),
  videoUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(500, { message: "Maximum 500 characters allowed" })
    .optional(),
});
