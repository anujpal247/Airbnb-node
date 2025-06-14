import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: "INTEGER",
      },
      userId: {
        type: "INTEGER",
        allowNull: false,
      },
      hotelId: {
        type: "INTEGER",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: "DATE",
      },
      updatedAt: {
        allowNull: false,
        type: "DATE",
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Bookings");
  },
};
