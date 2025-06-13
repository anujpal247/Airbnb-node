import { createHotelDTO } from "../dto/hotel.dto";
import Hotel from "../db/models/hotel.model";
import logger from "../config/logger.config";
import { NotFoundError } from "../utils/errors/app.error";

// repo layer -> responsible for db query
export async function createHotel(hotelData: createHotelDTO) {
  console.log("hotel repo");
  const hotel = await Hotel.create({
    name: hotelData.name,
    address: hotelData.address,
    rating: hotelData.rating,
    ratingCount: hotelData.ratingCount,
  });
  logger.info(`Hotel created ${hotel.id}`);
  console.log(hotel);
  return hotel;
}

export async function getHotelById(id: number) {
  const hotel = await Hotel.findByPk(id);

  if (!hotel) {
    logger.error(`Hotel with id ${id} not found`);
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }
  logger.info(`Hotel found ${hotel.id}`);
  return hotel;
}
