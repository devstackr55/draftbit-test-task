import { DataSource, EntityManager } from "typeorm"; // Import DataSource and EntityManager
import { MarginPadding } from "../models/MarginPadding";
import { marginPaddingSchema } from "../validations/marginPadding.validation";
import { LayoutSetting } from "../models/LayoutSetting";
import { AppDataSource } from "../data-source";

export class MarginPaddingService {
  static entityManager: EntityManager;

  static initialize(dataSource: DataSource) {
    this.entityManager = dataSource.manager; // Initialize the static EntityManager
  }

  static async create(data: any): Promise<[Error | null, any]> {
    try {
      // Validate input
      const { error, value } = marginPaddingSchema.create.validate(data);
      if (error) {
        return [new Error(error.details[0].message), null];
      }

      // Check if layoutSetting exists and has no marginPadding
      const existing = await this.entityManager.findOne(MarginPadding, {
        where: { layoutSetting: value.layoutSettingId },
      });
      if (existing) {
        return [
          new Error("MarginPadding already exists for this layout setting"),
          null,
        ];
      }

      // Create new marginPadding
      const marginPadding = this.entityManager.create(MarginPadding, value);
      const result = await this.entityManager.save(
        MarginPadding,
        marginPadding
      );
      return [null, result];
    } catch (error) {
      return [error as Error, null];
    }
  }

  static async update(id: string, data: any): Promise<[Error | null, any]> {
    try {
      // Validate input
      const { error, value } = marginPaddingSchema.update.validate(data);
      if (error) {
        return [new Error(error.details[0].message), null];
      }

      // Check if exists
      const existing = await this.entityManager.findOne(MarginPadding, {
        where: { id },
      });
      if (!existing) {
        return [new Error("MarginPadding not found"), null];
      }

      // Update marginPadding
      await this.entityManager.update(MarginPadding, id, value);
      return [null, existing]; // Return the updated entity or similar
    } catch (error) {
      return [error as Error, null];
    }
  }

  static async findById(id: string): Promise<[Error | null, any]> {
    try {
      // Validate input
      const { error } = marginPaddingSchema.findById.validate({ id });
      if (error) {
        return [new Error(error.details[0].message), null];
      }

      const marginPadding = await this.entityManager.findOne(MarginPadding, {
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

  static async delete(id: string): Promise<[Error | null, boolean]> {
    try {
      // Validate input
      const { error } = marginPaddingSchema.delete.validate({ id });
      if (error) {
        return [new Error(error.details[0].message), false];
      }

      // Check if exists
      const existing = await this.entityManager.findOne(MarginPadding, {
        where: { id },
      });
      if (!existing) {
        return [new Error("MarginPadding not found"), false];
      }

      // Delete marginPadding
      await this.entityManager.delete(MarginPadding, id);
      return [null, true];
    } catch (error) {
      return [error as Error, false];
    }
  }

  static async findByLayoutSettingId(
    layoutSettingId: any
  ): Promise<[Error | null, any]> {
    try {
      const marginPadding = await this.entityManager.findOne(MarginPadding, {
        where: { layoutSetting: layoutSettingId }, // Use layoutSettingId filter
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

  static async layoutSettings(): Promise<[Error | null, any]> {
    try {
      const layoutSettingsData = await this.entityManager.find(LayoutSetting, {
        relations: [
          "border",
          "layout",
          "effect",
          "marginPadding",
          "position",
          "component",
        ],
      });
      console.log("layoutSettingsData", layoutSettingsData);

      if (!layoutSettingsData || layoutSettingsData.length === 0) {
        return [new Error("LayoutSetting not found"), null];
      }

      // Return all layout settings
      return [null, layoutSettingsData];
    } catch (error) {
      return [error as Error, null];
    }
  }
}

// Usage example:
// Initialize the service with the DataSource before calling static methods
MarginPaddingService.initialize(AppDataSource);
