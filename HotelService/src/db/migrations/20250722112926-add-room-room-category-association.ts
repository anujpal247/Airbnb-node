import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE rooms
      ADD CONSTRAINT fk_room_category
      FOREIGN KEY (room_category_id)
      REFERENCES room_categories(id)
      ON DELETE CASCADE;
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE rooms
      DROP CONSTRAINT fk_room_category;
    `);
  },
};
