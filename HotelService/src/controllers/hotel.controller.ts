import { Request, Response, NextFunction } from "express";
import {
  createHotelService,
  getHotelByIdService,
} from "../services/hotel.service";

export async function createHotelController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotel = await createHotelService(req.body);

  res.status(201).json({
    success: true,
    message: "Hotel created successfully",
    data: hotel,
  });
}

export async function getHotelByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotel = await getHotelByIdService(Number(req.params));

  res.status(200).json({
    success: true,
    message: "Hotel found successfully",
    data: hotel,
  });
}
