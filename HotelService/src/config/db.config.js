const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.DB_HOST);

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  },
};

module.exports = config;
