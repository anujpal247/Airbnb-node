import sequelize from "../db/models/sequelize";
import { createBookingDTO } from "../dto/booking.dto";
import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/helpers/generateIdempotencyKey";

export async function createBookingService(bookingData: createBookingDTO) {
  const booking = await createBooking(bookingData);
  const idempotencyKey = generateIdempotencyKey();

  await createIdempotencyKey(idempotencyKey, booking.id);

  return {
    bookingId: booking.id,
    idempotencyKey: idempotencyKey,
  };
}

export async function confirmBookingService(idempotencyKey: string) {
  return await sequelize.transaction(async (txn) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(
      txn,
      idempotencyKey
    );

    if (!idempotencyKeyData) {
      throw new NotFoundError(`Idempotency key not found`);
    }

    if (idempotencyKeyData.finalized) {
      throw new BadRequestError(`Idempotency key already finalized`);
    }

    // check payments here

    const booking = await confirmBooking(txn, idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(txn, idempotencyKey);

    return booking;
  });
}
