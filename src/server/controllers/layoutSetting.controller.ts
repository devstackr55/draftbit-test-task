import { Request, Response } from "express";
import { responseHandler } from "../utils/helper";
import LayoutSettingService from "../services/layoutSettingsServices/LayoutSettingService";

export class LayoutSettingController {
  static async getLayoutSettings(req: Request, res: Response) {
    return responseHandler({
      service: LayoutSettingService,
      params: {},
      response: res,
    });
  }
}
