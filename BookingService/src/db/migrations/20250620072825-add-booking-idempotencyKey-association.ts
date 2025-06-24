import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE idempotencyKeys
      ADD booking_id INT,
      ADD CONSTRAINT fk_booking
      FOREIGN KEY (booking_id) REFERENCES bookings(id)
      ON DELETE CASCADE;
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE idempotencyKeys
      DROP CONSTRAINT fk_booking
    `);
  },
};
