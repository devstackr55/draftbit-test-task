import { MarginPaddingController } from "../../../controllers/marginPadding.controller";
import { Router } from "express";

const marginPaddingRoutes = Router();
const controller = new MarginPaddingController();

marginPaddingRoutes.post("/margin-padding", controller.create.bind(controller));
marginPaddingRoutes.put(
  "/margin-padding/:id",
  controller.update.bind(controller)
);
marginPaddingRoutes.get(
  "/margin-padding/:id",
  controller.findById.bind(controller)
);
marginPaddingRoutes.delete(
  "/margin-padding/:id",
  controller.delete.bind(controller)
);
marginPaddingRoutes.get(
  "/layout-setting/:layoutSettingId/margin-padding",
  controller.findByLayoutSettingId.bind(controller)
);

marginPaddingRoutes.get(
  "/layout-settings/",
  controller.layoutSettings.bind(controller)
);

export default marginPaddingRoutes;
