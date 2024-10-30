import { LayoutSettingController } from "../../../controllers/layoutSetting.controller";

import { Router } from "express";

const layoutSettingsRoutes = Router();

layoutSettingsRoutes.get(
  "/",
  LayoutSettingController.getLayoutSettings
);

export default layoutSettingsRoutes;
