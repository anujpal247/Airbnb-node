import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, getHotelById } from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
  console.log("hotel service");
  const hotel = await createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}
