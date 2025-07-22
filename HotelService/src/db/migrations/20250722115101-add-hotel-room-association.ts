import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE rooms
      ADD CONSTRAINT fk_room_hotel
      FOREIGN KEY (hotel_id)
      REFERENCES hotels(id)
      ON DELETE CASCADE;
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE rooms
      DROP CONSTRAINT fk_room_hotel;
    `);
  },
};
