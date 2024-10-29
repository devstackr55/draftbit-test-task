import { MarginPadding } from "../../models/MarginPadding";
import { AppDataSource } from "../../data-source";
import { mapErrorToErrorType } from "../../utils/helper";
import { ValidationError } from "../../utils/error";
import { marginPaddingSchema } from "../../validations/marginPadding.validation";

class UpdateMarginPaddingService {
  static async run(params: any): Promise<[Error | null, MarginPadding | null]> {
    try {
      const { id, data } = params;
      // Validate input
      const { error, value } = marginPaddingSchema.update.validate(data);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const entityManager = AppDataSource.manager;

      // Check if MarginPadding exists
      const existing = await entityManager.findOne(MarginPadding, {
        where: { id },
      });
      if (!existing) {
        throw new Error("MarginPadding not found");
      }

      // Update marginPadding
      await entityManager.update(MarginPadding, id, value);

      // Fetch the updated margin padding
      const updatedMarginPadding = await entityManager.findOne(MarginPadding, {
        where: { id },
        relations: ["layoutSetting"], // Include any necessary relations
      });

      return [null, updatedMarginPadding]; // Return the updated entity
    } catch (error: any) {
      return [mapErrorToErrorType(error), null]; // Map the error and return
    }
  }
}

export default UpdateMarginPaddingService;
