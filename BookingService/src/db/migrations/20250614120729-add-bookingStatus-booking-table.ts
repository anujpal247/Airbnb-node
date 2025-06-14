import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Bookings", "status", {
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Bookings", "status");
  },
};
