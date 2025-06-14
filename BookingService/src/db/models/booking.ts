// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Booking extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }

import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
} from "sequelize";
import sequelize from "./sequelize";

//   Booking.init(
//     {
//       userId: DataTypes.INTEGER,
//       hotelId: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Booking",
//     }
//   );
//   return Booking;
// };

class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare hotelId: number;
  declare bookingAmount: number;
  declare status: string;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCLED"),
      defaultValue: "PENDING",
    },
  },
  { sequelize, modelName: "Booking", timestamps: true }
);
