import express from "express";
import { validateRequestBody } from "../../validators";
import {
  createHotelController,
  deleteHotelController,
  getAllHotelController,
  getHotelByIdController,
  updateHotelController,
} from "../../controllers/hotel.controller";
import {
  hotelSchema,
  updateHotelSchema,
} from "../../validators/hotel.validator";

const hotelRouter = express.Router();

hotelRouter.post("/", validateRequestBody(hotelSchema), createHotelController);

hotelRouter.get("/:id", getHotelByIdController);
hotelRouter.delete("/:id", deleteHotelController);
hotelRouter.get("/", getAllHotelController);
hotelRouter.put(
  "/:id",
  validateRequestBody(updateHotelSchema),
  updateHotelController
);

export default hotelRouter;
