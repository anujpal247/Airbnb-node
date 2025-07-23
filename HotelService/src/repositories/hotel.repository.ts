import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
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
    location: hotelData.location,
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

export async function getAllHotel() {
  const hotels = await Hotel.findAll({
    where: {
      deletedAt: null,
    },
  });
  if (!hotels) {
    logger.error(`Hotels not found`);
    throw new NotFoundError(`Hotel dit not exist`);
  }
  return hotels;
}

export async function softDeleteHotel(id: number) {
  const hotel = await getHotelById(id);
  hotel.deletedAt = new Date(); // update deletedAt field
  await hotel.save();
  return true;
}

export async function updateHotel(id: number, updateHotelData: updateHotelDTO) {
  const hotel = await getHotelById(id);
  hotel.name = updateHotelData.name;
  hotel.address = updateHotelData.address;
  hotel.location = updateHotelData.location;

  await hotel.save();
  return hotel;
}
