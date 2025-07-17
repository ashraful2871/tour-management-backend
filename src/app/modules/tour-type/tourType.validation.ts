import z from "zod";

export const createTourTypeZodSchema = z.object({
  name: z.string({
    invalid_type_error: "tour type name must be a string",
    required_error: "tour type name is required",
  }),
});
export const updateTourTypeZodSchema = z.object({
  name: z.string({
    invalid_type_error: "tour type name must be a string",
    required_error: "tour type name is required",
  }),
});
