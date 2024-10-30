import { LayoutSettingController } from "../../../controllers/layoutSetting.controller";
import { MarginPaddingController } from "../../../controllers/marginPadding.controller";

import { Router } from "express";

const marginPaddingRoutes = Router();

marginPaddingRoutes.post(
  "/",
  MarginPaddingController.createNewMarginPadding
);

marginPaddingRoutes.put(
  "/:id",
  MarginPaddingController.updateMarginPadding
);

marginPaddingRoutes.get(
  "/:id",
  MarginPaddingController.GetMarginPadding
);

marginPaddingRoutes.delete(
  "/:id",
  MarginPaddingController.resetmarginPadding
);

marginPaddingRoutes.get(
  "/layout-settings/",
  LayoutSettingController.getLayoutSettings
);

export default marginPaddingRoutes;
