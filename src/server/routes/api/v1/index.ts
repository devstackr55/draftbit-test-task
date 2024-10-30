import express, { Router } from "express";

import marginPaddingRoutes from "./marginPadding.routes";
import layoutSettingsRoutes from "./layoutSettings.routes";

const router: Router = express.Router();
const NAMESPACE = "v1";

router.use(`/${NAMESPACE}/margin-paddings`, marginPaddingRoutes);
router.use(`/${NAMESPACE}/layout-settings`, layoutSettingsRoutes);

export default router;
