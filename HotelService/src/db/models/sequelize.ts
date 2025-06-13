import { Sequelize } from "sequelize";
import { databaseConfig } from "../../config";

const sequelize = new Sequelize({
  host: databaseConfig.HOST,
  port: databaseConfig.PORT,
  username: databaseConfig.USERNAME,
  password: databaseConfig.PASSWORD,
  dialect: "postgres",
});

export default sequelize;
