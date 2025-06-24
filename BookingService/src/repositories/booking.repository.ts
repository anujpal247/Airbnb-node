import logger from "../config/logger.config";
import Booking from "../db/models/booking.model";
import IdempotencyKey from "../db/models/idempotency.model";
import { createBookingDTO } from "../dto/booking.dto";
import { BadRequestError } from "../utils/errors/app.error";

export async function createBooking(bookingData: createBookingDTO) {
  const booking = await Booking.create({
    bookingAmount: bookingData.bookingAmount,
    hotelId: bookingData.hotelId,
    totalGuest: bookingData.totalGuest,
    userId: bookingData.userId,
  });

  if (!booking) {
    logger.error(`booking not created`);
    throw new BadRequestError(`Booking not created`);
  }

  return booking;
}

export async function createIdempotencyKey(
  idem_key: string,
  bookingId: number
) {
  const idempotencyKey = await IdempotencyKey.create({
    idem_key: idem_key,
    bookingId: bookingId,
  });

  return idempotencyKey;
}

export async function getIdempotencyKey(key: string) {
  const idempotencyKey = await IdempotencyKey.findOne({
    where: { idem_key: key },
  });

  return idempotencyKey;
}

export async function getBookingById(bookingId: number) {
  const booking = await Booking.findByPk(bookingId);
  return booking;
}

export async function confirmBooking(bookingId: number) {
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    logger.info(`Booking not found with id ${bookingId}`);
    throw new BadRequestError(`booking not found with id ${bookingId}`);
  }
  booking.status = "confirmed";
  await booking.save();

  return booking;
}

export async function cancelBooking(bookingId: number) {
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    logger.info(`Booking not found with id ${bookingId}`);
    throw new BadRequestError(`booking not found with id ${bookingId}`);
  }
  booking.status = "cancelled";
  await booking.save();

  return booking;
}

export async function finalizeIdempotencyKey(key: string) {
  const idempotencyKeyData = await IdempotencyKey.findOne({
    where: { idem_key: key },
  });

  if (!idempotencyKeyData) {
    logger.info(`idempotencyKey not found with id ${key}}`);
    throw new BadRequestError(`idempotencyKey not found with id ${key}`);
  }
  idempotencyKeyData.finalized = true;
  await idempotencyKeyData.save();

  return idempotencyKeyData;
}
