import express, { Router } from "express";
import V1Routes from "./v1/index";

const appRouter: Router = express.Router();

appRouter.use("/api", V1Routes);

export default appRouter;
