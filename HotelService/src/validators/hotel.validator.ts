import { z } from "zod";

export const hotelSchema = z.object({
  name: z.string().min(1, { message: "name field is required" }),
  address: z.string().min(1, { message: "address field is required" }),
  location: z.string().min(1, { message: "location field is required" }),
  rating: z.number().optional(),
  ratingCount: z.number().optional(),
});

export const updateHotelSchema = z.object({
  name: z.string().min(1, { message: "name field is required" }),
  address: z.string().min(1, { message: "address field is required" }),
  location: z.string().min(1, { message: "location field is required" }),
});
