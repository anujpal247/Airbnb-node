import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "./sequelize";

class Hotel extends Model<
  InferAttributes<Hotel>,
  InferCreationAttributes<Hotel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare rating: number;
  declare ratingCount: number;
}

Hotel.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: "STRING",
      allowNull: false,
    },
    address: {
      type: "STRING",
      allowNull: false,
    },
    createdAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
    updatedAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
    rating: {
      type: "FLOAT",
      defaultValue: null,
    },
    ratingCount: {
      type: "FLOAT",
      defaultValue: null,
    },
  },
  {
    tableName: "Hotel",
    sequelize,
    timestamps: true, // adds createdAt , updatedAt
    underscored: true, // createdAt --> created_at
  }
);
