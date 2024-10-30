import Joi from "joi";
import { MarginPadding } from "../../models/MarginPadding";

import { AppDataSource } from "../../data-source";

import { mapErrorToErrorType } from "../../utils/helper";
import { ValidationError } from "../../utils/error";

const marginPaddingSchema = {
  findById: Joi.object({
    id: Joi.string().trim().required(),
  }),
};

interface paramsType {
  id: string;
}

class GetMarginPaddingService {
  static async run(
    params: paramsType
  ): Promise<[Error | null, MarginPadding | null]> {
    try {
      const { id } = params;
      const { error } = marginPaddingSchema.findById.validate({ id });
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const entityManager = AppDataSource.manager;
      const marginPadding = await entityManager.findOne(MarginPadding, {
        where: { id },
        relations: ["layoutSetting"],
      });

      if (!marginPadding) {
        throw new Error("MarginPadding not found");
      }

      return [null, marginPadding];
    } catch (error: any) {
      return [mapErrorToErrorType(error), null];
    }
  }
}

export default GetMarginPaddingService;
