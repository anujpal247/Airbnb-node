// This file contains all the basic configuration logic for the app server to work
import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
};

type DatabaseConfig = {
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  HOST: string;
};

function loadEnv() {
  dotenv.config();
  console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
};

export const databaseConfig: DatabaseConfig = {
  PORT: Number(process.env.DB_PORT) || 5433,
  HOST: process.env.DB_HOST || "localhost",
  USERNAME: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "root",
};
