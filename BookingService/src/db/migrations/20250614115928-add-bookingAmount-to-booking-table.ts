import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Bookings", "bookingAmount", {
      type: DataTypes.INTEGER,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Bookings", "bookingAmount");
  },
};
