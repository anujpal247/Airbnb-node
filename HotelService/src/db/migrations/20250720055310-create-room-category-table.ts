import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS room_categories(
        id  INT AUTO_INCREMENT PRIMARY KEY,
        room_type ENUM('SINGLE', 'DOUBLE', 'DELUXE', 'FAMILY', 'SUITE') NOT NULL,
        price INT NOT NULL,
        hotel_id INT NOT NULL,
        room_count INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
      );
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS room_categories;
    `);
  },
};
