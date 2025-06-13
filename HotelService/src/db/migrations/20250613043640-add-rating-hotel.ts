import { QueryInterface } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Hotel"
      ADD COLUMN rating DECIMAL(3, 2) DEFAULT NULL,
      ADD COLUMN rating_count INT DEFAULT NULL
      `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Hotel"
      DROP COLUMN rating,
      DROP COLUMN rating_count
      `);
  },
};
