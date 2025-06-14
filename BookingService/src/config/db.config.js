const dotenv = require("dotenv");

dotenv.config();

console.log("DB user: ", process.env.DB_USER);
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  },
};

module.exports = config;
