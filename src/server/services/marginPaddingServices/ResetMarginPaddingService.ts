import { MarginPadding } from "../../models/MarginPadding";
import { AppDataSource } from "../../data-source";
import { mapErrorToErrorType } from "../../utils/helper";
import Joi from "joi";
import { ValidationError } from "../../utils/error";

// Define validation schemas
const marginPaddingSchema = {
  reset: Joi.object({
    id: Joi.string().required(), // Assuming ID is required for reset
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
      // Validate input
      const { id } = params;
      const { error } = marginPaddingSchema.reset.validate({ id });
      if (error) {
        throw new ValidationError(error.details[0].message); // Throw validation error
      }

      const entityManager = AppDataSource.manager; // Get the entity manager

      // Check if the margin padding exists
      const existing = await entityManager.findOne(MarginPadding, {
        where: { id },
      });
      if (!existing) {
        throw new Error("MarginPadding not found");
      }

      // Reset the margin padding (you can modify this logic as per requirements)
      await entityManager.update(MarginPadding, id, {
        // Reset logic can be defined here; for now, let's just set some default values
        // Replace these default values with the actual ones you want to reset to
        // marginValue: 0,
        // paddingValue: 0,
      });

      return [null, true]; // Return success
    } catch (error: any) {
      return [mapErrorToErrorType(error), false]; // Map the error and return
    }
  }
}

export default ResetMarginPaddingService;
