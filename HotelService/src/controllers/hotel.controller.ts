import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createHotelService,
  deleteHotelService,
  getAllHotelService,
  getHotelByIdService,
  updateHotelService,
} from "../services/hotel.service";

export async function createHotelController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotel = await createHotelService(req.body);

  res.status(StatusCodes.CREATED).json({
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
  const hotel = await getHotelByIdService(Number(req.params.id));

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotel found successfully",
    data: hotel,
  });
}

export async function getAllHotelController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotels = await getAllHotelService();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotels found successfully",
    data: hotels,
  });
}

export async function deleteHotelController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response = await deleteHotelService(Number(req.params.id));
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotel deleted successfully",
    data: response,
  });
}

export async function updateHotelController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hotel = await updateHotelService(Number(req.params.id), req.body);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotel updated successfully",
    data: hotel,
  });
}
