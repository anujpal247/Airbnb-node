import { z } from "zod";

export const bookingSchema = z.object({
  userId: z.number({ message: "User Id must be present" }),
  hotelId: z.number({ message: "Hotel Id must be present" }),
  bookingAmount: z
    .number({ message: "Booking Amount must be present" })
    .min(1, { message: "Booking Amount must be greater than 1" }),
  totalGuest: z
    .number({ message: "Total Guest must be present" })
    .min(1, { message: "Total Guest must be atleast 1" }),
});
