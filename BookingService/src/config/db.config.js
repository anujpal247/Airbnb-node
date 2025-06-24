const dotenv = require("dotenv");

dotenv.config();

console.log("DB: ", process.env.DB_NAME);
const config = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "booking-dev",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "booking_dev",
    dialect: "mysql",
    // port: process.env.DB_PORT,
  },
};

module.exports = config;
