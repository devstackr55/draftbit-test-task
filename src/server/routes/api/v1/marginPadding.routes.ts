import { LayoutSettingController } from "../../../controllers/layoutSetting.controller";
import { MarginPaddingController } from "../../../controllers/marginPadding.controller";
import { Router } from "express";

const marginPaddingRoutes = Router();

// Define routes without using .bind()
marginPaddingRoutes.post(
  "/margin-padding",
  MarginPaddingController.createNewMarginPadding
);
marginPaddingRoutes.put(
  "/margin-padding/:id",
  MarginPaddingController.updateMarginPadding
);
marginPaddingRoutes.get(
  "/margin-padding/:id",
  MarginPaddingController.GetMarginPadding
);
marginPaddingRoutes.delete(
  "/margin-padding/:id",
  MarginPaddingController.resetmarginPadding
);
// marginPaddingRoutes.get(
//   "/layout-setting/:layoutSettingId/margin-padding",
//   MarginPaddingController.findByLayoutSettingId
// );
marginPaddingRoutes.get(
  "/layout-settings/",
  LayoutSettingController.getLayoutSettings
);

export default marginPaddingRoutes;
