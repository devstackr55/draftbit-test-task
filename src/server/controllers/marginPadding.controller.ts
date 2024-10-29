import { Request, Response } from "express";
import { responseHandler } from "../utils/helper";
import GetMarginPaddingService from "../services/marginPaddingServices/GetMarginPaddingService";
import UpdateMarginPaddingService from "../services/marginPaddingServices/UpdateMarginPaddingService";
import CreateMarginPaddingService from "../services/marginPaddingServices/CreateMarginPaddingService";
import ResetMarginPaddingService from "../services/marginPaddingServices/ResetMarginPaddingService";

export class MarginPaddingController {
  static async createNewMarginPadding(req: Request, res: Response) {
    const updateData = {
      data: req.body.name,
    };
    return responseHandler({
      service: CreateMarginPaddingService,
      params: updateData,
      response: res,
    });
  }

  static async updateMarginPaddin(req: Request, res: Response) {
    const updateData = {
      data: req.body.name,
      id: req.params.id,
    };
    return responseHandler({
      service: UpdateMarginPaddingService,
      params: updateData,
      response: res,
    });
  }

  static async GetMarginPadding(req: Request, res: Response) {
    const id = req.params.id;
    return responseHandler({
      service: GetMarginPaddingService,
      params: { id },
      response: res,
    });
  }
  static async resetmarginPadding(req: Request, res: Response) {
    const id = req.params.id;
    return responseHandler({
      service: ResetMarginPaddingService,
      params: { id },
      response: res,
    });
  }
}
