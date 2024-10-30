import Joi from "joi";
import { MeasurementUnit } from "../constant/MeasurementUnit";

export const marginPaddingSchema = {
  create: Joi.object({
    layoutSettingId: Joi.number().required(),
    marginLeftValue: Joi.number().allow(null),
    marginLeftUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    marginRightValue: Joi.number().allow(null),
    marginRightUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    marginTopValue: Joi.number().allow(null),
    marginTopUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    marginBottomValue: Joi.number().allow(null),
    marginBottomUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingLeftValue: Joi.number().allow(null),
    paddingLeftUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingRightValue: Joi.number().allow(null),
    paddingRightUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingTopValue: Joi.number().allow(null),
    paddingTopUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingBottomValue: Joi.number().allow(null),
    paddingBottomUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
  }),

  update: Joi.object({
    marginLeftValue: Joi.number().allow(null),
    marginLeftUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    marginRightValue: Joi.number().allow(null),
    marginRightUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    marginTopValue: Joi.number().allow(null),
    marginTopUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    marginBottomValue: Joi.number().allow(null),
    marginBottomUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingLeftValue: Joi.number().allow(null),
    paddingLeftUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingRightValue: Joi.number().allow(null),
    paddingRightUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingTopValue: Joi.number().allow(null),
    paddingTopUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
    paddingBottomValue: Joi.number().allow(null),
    paddingBottomUnit: Joi.string()
      .valid(...Object.values(MeasurementUnit))
      .allow(null),
  }),

  findById: Joi.object({
    id: Joi.string().uuid().required(),
  }),

  delete: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};
