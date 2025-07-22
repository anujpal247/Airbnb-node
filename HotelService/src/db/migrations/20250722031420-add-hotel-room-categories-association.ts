import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE room_categories
      ADD CONSTRAINT fk_hotel
      FOREIGN KEY (hotel_id) 
      REFERENCES hotels(id)
      ON DELETE CASCADE;
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE room_categories
      DROP CONSTRAINT fk_hotel;
    `);
  },
};
