import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.get("database.host"),
  port: config.get("database.port"),
  username: config.get("database.username"),
  password: config.get("database.password"),
  database: config.get("database.name"),
  entities: ["src/server/models/**/*.ts"],
  migrations: ["src/server/migrations/**/*.ts"],
  synchronize: false,
  logging: true,
});
