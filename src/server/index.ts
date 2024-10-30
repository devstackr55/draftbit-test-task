import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import config from "./config/config";
import morgan from "morgan";
import initRoutes from "./routes";

const PORT: number = config.get("port");
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

initRoutes(app);

export const connectDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
