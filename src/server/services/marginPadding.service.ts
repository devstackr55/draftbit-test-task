import { MarginPadding } from "../models/MarginPadding";
import { DataSource } from "typeorm"; // Import DataSource
import { marginPaddingSchema } from "../validations/marginPadding.validation";
import { LayoutSetting } from "../models/LayoutSetting";

export class MarginPaddingService {
  private repository;
  private layoutSettingRepository; // Declare a repository for LayoutSettings

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(MarginPadding);
    this.layoutSettingRepository = this.dataSource.getRepository(LayoutSetting); // Initialize the LayoutSetting repository
  }

  async create(data: any): Promise<[Error | null, any]> {
    try {
      // Validate input
      const { error, value } = marginPaddingSchema.create.validate(data);
      if (error) {
        return [new Error(error.details[0].message), null];
      }

      // Check if layoutSetting exists and has no marginPadding
      const existing = await this.repository.findOne({
        where: { layoutSetting: value.layoutSettingId },
      });
      if (existing) {
        return [
          new Error("MarginPadding already exists for this layout setting"),
          null,
        ];
      }

      // Create new marginPadding
      const marginPadding = this.repository.create(value);
      const result = await this.repository.save(marginPadding);
      return [null, result];
    } catch (error) {
      return [error as Error, null];
    }
  }

  async update(id: string, data: any): Promise<[Error | null, any]> {
    try {
      // Validate input
      const { error, value } = marginPaddingSchema.update.validate(data);
      if (error) {
        return [new Error(error.details[0].message), null];
      }

      // Check if exists
      const existing = await this.repository.findOne({ where: { id } });
      if (!existing) {
        return [new Error("MarginPadding not found"), null];
      }

      // Update marginPadding
      await this.repository.update(id, value);
      return [null, existing]; // Return the updated entity or similar
    } catch (error) {
      return [error as Error, null];
    }
  }

  async findById(id: string): Promise<[Error | null, any]> {
    try {
      // Validate input
      const { error } = marginPaddingSchema.findById.validate({ id });
      if (error) {
        return [new Error(error.details[0].message), null];
      }

      const marginPadding = await this.repository.findOne({
        where: { id },
        relations: ["layoutSetting"],
      });
      if (!marginPadding) {
        return [new Error("MarginPadding not found"), null];
      }

      return [null, marginPadding];
    } catch (error) {
      return [error as Error, null];
    }
  }

  async delete(id: string): Promise<[Error | null, boolean]> {
    try {
      // Validate input
      const { error } = marginPaddingSchema.delete.validate({ id });
      if (error) {
        return [new Error(error.details[0].message), false];
      }

      // Check if exists
      const existing = await this.repository.findOne({ where: { id } });
      if (!existing) {
        return [new Error("MarginPadding not found"), false];
      }

      // Delete marginPadding
      await this.repository.delete(id);
      return [null, true];
    } catch (error) {
      return [error as Error, false];
    }
  }

  async findByLayoutSettingId(
    layoutSetting: any
  ): Promise<[Error | null, any]> {
    try {
      const marginPadding = await this.repository.findOne({
        where: { layoutSetting }, // Uncomment and use layoutSetting filter
        relations: ["layoutSetting"],
      });
      if (!marginPadding) {
        return [new Error("MarginPadding not found"), null];
      }

      return [null, marginPadding];
    } catch (error) {
      return [error as Error, null];
    }
  }

  async layoutSettings(): Promise<[Error | null, any]> {
    try {
      const layoutSettingsData = await this.layoutSettingRepository.find({
        relations: [
          "border",
          "layout",
          "effect",
          "marginPadding",
          "position",
          "component",
        ],
      });

      if (!layoutSettingsData || layoutSettingsData.length === 0) {
        return [new Error("LayoutSetting not found"), null];
      }

      // Currently, we are returning only the first layout setting for simplicity.
      // To return all layout settings, modify this to return `layoutSettingsData` instead of `layoutSetting`.
      const layoutSetting = layoutSettingsData[0];

      const formattedData = {
        id: layoutSetting.id,
        componentId: layoutSetting.component?.id || null,
        borderId: layoutSetting.border?.id || null,
        layoutId: layoutSetting.layout?.id || null,
        effectId: layoutSetting.effect?.id || null,
        marginPaddingId: layoutSetting.marginPadding?.id || null,
        positionId: layoutSetting.position?.id || null,
        createdAt: layoutSetting.createdAt,
        updatedAt: layoutSetting.updatedAt,
      };

      return [null, formattedData];
    } catch (error) {
      return [error as Error, null];
    }
  }
}
