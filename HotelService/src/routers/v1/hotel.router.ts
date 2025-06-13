import express from "express";
import { validateRequestBody } from "../../validators";
import {
  createHotelController,
  getHotelByIdController,
} from "../../controllers/hotel.controller";
import { hotelSchema } from "../../validators/hotel.validator";

const hotelRouter = express.Router();

hotelRouter.post("/", validateRequestBody(hotelSchema), createHotelController);

hotelRouter.get("/:id", getHotelByIdController);

export default hotelRouter;
