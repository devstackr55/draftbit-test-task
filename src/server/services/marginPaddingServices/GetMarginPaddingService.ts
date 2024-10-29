import { MarginPadding } from "../../models/MarginPadding";
import { AppDataSource } from "../../data-source";
import { mapErrorToErrorType } from "../../utils/helper";
import Joi from "joi";
import { ValidationError } from "../../utils/error";

const marginPaddingSchema = {
  findById: Joi.object({
    id: Joi.string().trim().required(), // Define the validation schema
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
      // Validate input
      const { error } = marginPaddingSchema.findById.validate({ id });
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const entityManager = AppDataSource.manager; // Get the entity manager
      const marginPadding = await entityManager.findOne(MarginPadding, {
        where: { id },
        relations: ["layoutSetting"], // Adjust relations as necessary
      });

      // Check if marginPadding was found
      if (!marginPadding) {
        throw new Error("MarginPadding not found");
      }

      return [null, marginPadding]; // Return the found marginPadding
    } catch (error: any) {
      return [mapErrorToErrorType(error), null]; // Map the error and return
    }
  }
}

export default GetMarginPaddingService;
