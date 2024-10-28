import Joi, { Schema, ValidationResult } from "joi";
import { AuthenticateError, NotFoundError, UniqueConstraintError, ValidationError } from "./error";
import { handleError, handleSuccess } from "./responseUtils";
import { Response } from "express";
import { ERRORS } from "../constant";

interface JoiFieldsValidatorParams<T> {
  schema: Schema;
  fields: T;
}

export const joiFieldsValidator = <T>({
  schema,
  fields,
}: JoiFieldsValidatorParams<T>): Joi.ValidationError | undefined => {
  const { error }: ValidationResult<T> = schema.validate(fields, {
    abortEarly: false,
  });
  return error;
};

// Todo: Optimize the code
export const mapErrorToErrorType = (error: unknown): Error => {
  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof AuthenticateError||
    error instanceof UniqueConstraintError
  ) {
    return error; // Return the known error as is
  }
  // Handle unknown errors or wrap in a generic error
  return new Error(ERRORS.UNEXPECTED);
};

interface ServiceParams<T> {
  service: { run: (params: T) => Promise<[Error | null, any]> };
  params: T;
  response: Response;
}

export const responseHandler = async <T>({
  service,
  params,
  response,
}: ServiceParams<T>) => {
  const [error, result] = await service.run(params);
  if (error) {
    return handleError(response, error);
  }
  return handleSuccess(response, result);
};
