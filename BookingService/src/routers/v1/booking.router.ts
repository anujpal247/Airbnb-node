import express from "express";
import { validateRequestBody } from "../../validators";
import {
  confirmBookingController,
  createBookingController,
} from "../../controllers/booking.controller";
import { bookingSchema } from "../../validators/booking.validator";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  validateRequestBody(bookingSchema),
  createBookingController
);

bookingRouter.post("/:idempotencyKey", confirmBookingController);

export default bookingRouter;
