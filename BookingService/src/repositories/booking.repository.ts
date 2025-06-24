import { Transaction } from "sequelize";
import logger from "../config/logger.config";
import Booking from "../db/models/booking.model";
import IdempotencyKey from "../db/models/idempotency.model";
import { createBookingDTO } from "../dto/booking.dto";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

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

export async function getIdempotencyKeyWithLock(txn: Transaction, key: string) {
  const idempotencyKey = await IdempotencyKey.findAll({
    lock: true,
    transaction: txn,
    limit: 1,
    where: {
      idem_key: key,
    },
  });

  if (!idempotencyKey || idempotencyKey.length === 0) {
    throw new NotFoundError(`Idempotency key not found`);
  }

  return idempotencyKey[0];
}

export async function getBookingById(bookingId: number) {
  const booking = await Booking.findByPk(bookingId);
  return booking;
}

export async function confirmBooking(txn: Transaction, bookingId: number) {
  const booking = await Booking.findByPk(bookingId, { transaction: txn });

  if (!booking) {
    logger.info(`Booking not found with id ${bookingId}`);
    throw new BadRequestError(`booking not found with id ${bookingId}`);
  }
  booking.status = "confirmed";
  await booking.save({ transaction: txn });

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

export async function finalizeIdempotencyKey(txn: Transaction, key: string) {
  const idempotencyKeyData = await IdempotencyKey.findOne({
    where: { idem_key: key },
    transaction: txn,
  });

  if (!idempotencyKeyData) {
    logger.info(`idempotencyKey not found with id ${key}}`);
    throw new BadRequestError(`idempotencyKey not found with id ${key}`);
  }
  idempotencyKeyData.finalized = true;
  await idempotencyKeyData.save({ transaction: txn });

  return idempotencyKeyData;
}
