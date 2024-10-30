import { LayoutSettingController } from "../../../controllers/layoutSetting.controller";

import { Router } from "express";

const layoutSettingsRoutes = Router();

layoutSettingsRoutes.post(
  "/",
  LayoutSettingController.getLayoutSettings
);

export default layoutSettingsRoutes;
