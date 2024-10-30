import express, { Router } from "express";

import marginPaddingRoutes from "./marginPadding.routes";

const router: Router = express.Router();
const NAMESPACE = "v1";
router.use(`/${NAMESPACE}/`, marginPaddingRoutes);

export default router;
