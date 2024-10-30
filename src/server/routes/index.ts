import { Application, Request, Response } from "express";

import appRouter from "./api";

const initRoutes = (app: Application): void => {
  app.use(appRouter);

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).send({ message: "hello" });
  });
};

export default initRoutes;
