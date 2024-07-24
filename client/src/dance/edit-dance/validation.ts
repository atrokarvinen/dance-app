import { z } from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Maximum 50 characters allowed" }),
  image: z.instanceof(FileList),
});
