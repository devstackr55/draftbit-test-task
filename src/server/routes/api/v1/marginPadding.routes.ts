import { Router } from "express";

import { MarginPaddingController } from "../../../controllers/marginPadding.controller";

const marginPaddingRoutes = Router();

marginPaddingRoutes.post("/", MarginPaddingController.createNewMarginPadding);

marginPaddingRoutes.put("/:id", MarginPaddingController.updateMarginPadding);

marginPaddingRoutes.get("/:id", MarginPaddingController.GetMarginPadding);

marginPaddingRoutes.delete("/:id", MarginPaddingController.resetMarginPadding);

export default marginPaddingRoutes;
