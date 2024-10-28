import { DataSource } from "typeorm";
import config from "./src/config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.get("database.host"),
  port: config.get("database.port"),
  username: config.get("database.username"),
  password: config.get("database.password"),
  database: config.get("database.name"),
  entities: ["src/models/**/*.ts"],
  migrations: ["server/migrations/**/*.ts"],
  synchronize: false,
  logging: true,
});
