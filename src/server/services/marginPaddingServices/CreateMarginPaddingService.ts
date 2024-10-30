import { MarginPadding } from "../../models/MarginPadding";

import { AppDataSource } from "../../data-source";

import { mapErrorToErrorType } from "../../utils/helper";
import { ValidationError } from "../../utils/error";

import { marginPaddingSchema } from "../../validations/marginPadding.validation";

class CreateMarginPaddingService {
  static async run(data: any): Promise<[Error | null, MarginPadding | null]> {
    try {
      const { error, value } = marginPaddingSchema.create.validate(data);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const entityManager = AppDataSource.manager;
      const existing = await entityManager.findOne(MarginPadding, {
        where: { layoutSetting: value.layoutSettingId },
      });
      if (existing) {
        throw new Error("MarginPadding already exists for this layout setting");
      }

      const marginPadding = entityManager.create(MarginPadding, value);
      const result = await entityManager.save(MarginPadding, marginPadding);

      return [null, result];
    } catch (error: any) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default CreateMarginPaddingService;
