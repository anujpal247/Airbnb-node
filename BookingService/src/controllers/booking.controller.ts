import { Request, Response, NextFunction } from "express";
import {
  confirmBookingService,
  createBookingService,
} from "../services/booking.service";

export const createBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const booking = await createBookingService(req.body);
  res.status(201).json({
    success: true,
    message: "Booking successfully created!!",
    data: booking,
  });
};

export const confirmBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("params: ", req.params);
  const { idempotencyKey } = req.params;
  const booking = await confirmBookingService(idempotencyKey);
  res.status(200).json({
    success: true,
    message: "Booking confirmed successfully",
    data: booking,
  });
};
