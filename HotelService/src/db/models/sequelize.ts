import { Sequelize } from "sequelize";
import { serverConfig } from "../../config";

const sequelize = new Sequelize({
  host: serverConfig.DB_HOST,
  port: serverConfig.DB_PORT,
  username: serverConfig.DB_USER,
  password: serverConfig.DB_PASSWORD,
  database: serverConfig.DB_NAME,
  dialect: "mysql",
});

export default sequelize;
