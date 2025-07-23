import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
import {
  createHotel,
  getAllHotel,
  getHotelById,
  softDeleteHotel,
  updateHotel,
} from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
  console.log("hotel service");
  const hotel = await createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}

export async function getAllHotelService() {
  const hotels = await getAllHotel();
  return hotels;
}

export async function deleteHotelService(id: number) {
  const res = await softDeleteHotel(id);
  return res;
}

export async function updateHotelService(
  id: number,
  updateHotelData: updateHotelDTO
) {
  const hotel = await updateHotel(id, updateHotelData);
  return hotel;
}
