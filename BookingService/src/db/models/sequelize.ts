import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // port: Number(process.env.DB_PORT),
});

export default sequelize;
