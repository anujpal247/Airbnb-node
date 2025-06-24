import { QueryInterface } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS bookings(
        id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        user_id INT NOT NULL,
        hotel_id INT NOT NULL,
        booking_amount INT NOT NULL,
        total_guest INT NOT NULL,
        status ENUM('pending', 'confirmed', 'cancelled'),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
      `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS bookings
    `);
  },
};
