import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS rooms(
        id  INT AUTO_INCREMENT PRIMARY KEY,
        room_no INT NOT NULL,
        room_category_id INT NOT NULL,
        hotel_id INT NOT NULL,
        booking_id INT NOT NULL,
        date_of_availability DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
      );
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS rooms;
    `);
  },
};
