import { Application, Request, Response } from "express";
import routes from "./api/marginPadding.routes";

const initRoutes = (app: Application): void => {
  app.use(routes);

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).send({ message: "hello" });
  });
};

export default initRoutes;
