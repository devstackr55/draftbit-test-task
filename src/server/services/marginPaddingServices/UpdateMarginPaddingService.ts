import { MarginPadding } from "../../models/MarginPadding";

import { AppDataSource } from "../../data-source";

import { mapErrorToErrorType } from "../../utils/helper";
import { ValidationError } from "../../utils/error";

import { marginPaddingSchema } from "../../validations/marginPadding.validation";

class UpdateMarginPaddingService {
  static async run(params: any): Promise<[Error | null, MarginPadding | null]> {
    try {
      const { id, data } = params;
      const { error, value } = marginPaddingSchema.update.validate(data);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const entityManager = AppDataSource.manager;

      const existing = await entityManager.findOne(MarginPadding, {
        where: { id },
      });
      if (!existing) {
        throw new Error("MarginPadding not found");
      }

      await entityManager.update(MarginPadding, id, value);

      const updatedMarginPadding = await entityManager.findOne(MarginPadding, {
        where: { id },
        relations: ["layoutSetting"],
      });

      return [null, updatedMarginPadding];
    } catch (error: any) {
      console.log("errrr", error);
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default UpdateMarginPaddingService;
