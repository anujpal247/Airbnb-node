import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class IdempotencyKey extends Model<
  InferAttributes<IdempotencyKey>,
  InferCreationAttributes<IdempotencyKey>
> {
  declare id: CreationOptional<number>;
  declare idem_key: string;
  declare bookingId: number;
  declare finalized?: boolean;
}

IdempotencyKey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idem_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    finalized: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "idempotencyKeys",
    timestamps: true,
    underscored: true,
    // version: true, // enables Optimistic locking
  }
);

export default IdempotencyKey;
