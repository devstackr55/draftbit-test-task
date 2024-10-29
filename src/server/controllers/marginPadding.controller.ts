import { Request, Response } from "express";
import { MarginPaddingService } from "../services/marginPadding.service";
import { AppDataSource } from "../data-source";

export class MarginPaddingController {
  private service: MarginPaddingService;

  constructor() {
    // Initialize the service with the AppDataSource
    this.service = new MarginPaddingService(AppDataSource);
  }

  async create(req: Request, res: Response) {
    const [error, result] = await this.service.create(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const [error, result] = await this.service.update(req.params.id, req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const [error, result] = await this.service.findById(req.params.id);
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const [error, result] = await this.service.delete(req.params.id);
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(204).send();
  }

  async findByLayoutSettingId(req: Request, res: Response) {
    const [error, result] = await this.service.findByLayoutSettingId(
      Number(req.params.layoutSettingId)
    );
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json(result);
  }

  async layoutSettings(req: Request, res: Response) {
    const [error, result] = await this.service.layoutSettings();
    if (error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json(result);
  }
}
