import { MarginPadding } from "../../models/MarginPadding";
import { AppDataSource } from "../../data-source";
import { mapErrorToErrorType } from "../../utils/helper";
import { ValidationError } from "../../utils/error";
import { marginPaddingSchema } from "../../validations/marginPadding.validation";

class CreateMarginPaddingService {
  static async run(data: any): Promise<[Error | null, MarginPadding | null]> {
    try {
      // Validate input
      const { error, value } = marginPaddingSchema.create.validate(data);
      if (error) {
        throw new ValidationError(error.details[0].message); // Throw validation error
      }

      const entityManager = AppDataSource.manager; // Get the entity manager

      // Check if layoutSetting exists and has no existing marginPadding
      const existing = await entityManager.findOne(MarginPadding, {
        where: { layoutSetting: value.layoutSettingId },
      });
      if (existing) {
        throw new Error("MarginPadding already exists for this layout setting");
      }

      // Create new marginPadding
      const marginPadding = entityManager.create(MarginPadding, value);
      const result = await entityManager.save(MarginPadding, marginPadding);

      return [null, result]; // Return the created entity
    } catch (error: any) {
      return [mapErrorToErrorType(error), null]; // Map the error and return
    }
  }
}

export default CreateMarginPaddingService;
