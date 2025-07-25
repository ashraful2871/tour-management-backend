import z from "zod";

export const createTourZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  costFrom: z.number(),
  startDate: z.string().optional().optional(),
  endDate: z.string().optional().optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  maxGuest: z.number().optional(),
  minAge: z.number().optional(),
  division: z.string(),
  tourType: z.string(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
});

export const updateTourZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  costFrom: z.number().optional(),
  startDate: z.string().optional().optional(),
  endDate: z.string().optional().optional(),
  tourType: z.string().optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  maxGuest: z.number().optional(),
  minAge: z.number().optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
  deleteImages: z.array(z.string()).optional(),
});
