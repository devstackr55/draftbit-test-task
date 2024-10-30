import Joi from "joi";

import { MarginPadding } from "../../models/MarginPadding";

import { AppDataSource } from "../../data-source";

import { mapErrorToErrorType } from "../../utils/helper";
import { ValidationError } from "../../utils/error";

const marginPaddingSchema = {
  reset: Joi.object({
    id: Joi.string().required(),
  }),
};
interface ResetMarginPaddingServiceParams {
  id: string;
}

class ResetMarginPaddingService {
  static async run(
    params: ResetMarginPaddingServiceParams
  ): Promise<[Error | null, boolean]> {
    try {
      const { id } = params;
      const { error } = marginPaddingSchema.reset.validate({ id });
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

      await entityManager.update(MarginPadding, id, {
        // Reset logic can be defined here; for now, let's just set some default values
        // Replace these default values with the actual ones you want to reset to
      });

      return [null, true];
    } catch (error: any) {
      return [mapErrorToErrorType(error), false];
    }
  }
}

export default ResetMarginPaddingService;
