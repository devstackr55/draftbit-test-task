import { Request, Response } from "express";
import { MarginPaddingService } from "../services/marginPadding.service";

export class MarginPaddingController {
  static async create(req: Request, res: Response) {
    const [error, result] = await MarginPaddingService.create(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(201).json(result);
  }

  static async update(req: Request, res: Response) {
    const [error, result] = await MarginPaddingService.update(
      req.params.id,
      req.body
    );
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(result);
  }

  static async findById(req: Request, res: Response) {
    const [error, result] = await MarginPaddingService.findById(req.params.id);
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json(result);
  }

  static async delete(req: Request, res: Response) {
    const [error, success] = await MarginPaddingService.delete(req.params.id);
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(204).send(); // No content for successful delete
  }

  static async findByLayoutSettingId(req: Request, res: Response) {
    const [error, result] = await MarginPaddingService.findByLayoutSettingId(
      req.params.layoutSettingId
    );
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json(result);
  }

  static async layoutSettings(req: Request, res: Response) {
    console.log("runn");
    const [error, result] = await MarginPaddingService.layoutSettings();
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json(result);
  }
}
