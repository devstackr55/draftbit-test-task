import { Router } from "express";

import { LayoutSettingController } from "../../../controllers/layoutSetting.controller";

const layoutSettingsRoutes = Router();

layoutSettingsRoutes.get("/", LayoutSettingController.getLayoutSettings);

export default layoutSettingsRoutes;
