import { MarginPaddingController } from "../../controllers/marginPadding.controller";
import { Router } from "express";

const router = Router();
const controller = new MarginPaddingController();

router.post("/margin-padding", controller.create.bind(controller));
router.put("/margin-padding/:id", controller.update.bind(controller));
router.get("/margin-padding/:id", controller.findById.bind(controller));
router.delete("/margin-padding/:id", controller.delete.bind(controller));
router.get(
  "/layout-setting/:layoutSettingId/margin-padding",
  controller.findByLayoutSettingId.bind(controller)
);

export default router;
