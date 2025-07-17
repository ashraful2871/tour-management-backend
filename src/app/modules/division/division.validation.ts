import z from "zod";

export const createDivisionZodSchema = z.object({
  name: z.string({
    required_error: "division name is required",
    invalid_type_error: "division name must be a string",
  }),
  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid url" })
    .optional(),
  description: z.string().optional(),
});

export const updatedDivisionZodSchema = z.object({
  name: z.string({
    required_error: "division name is required",
    invalid_type_error: "division name must be a string",
  }),
  slug: z.string({
    required_error: "slug is required",
    invalid_type_error: "slug must be a string",
  }),
  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid url" })
    .optional(),
  description: z.string().optional(),
});
