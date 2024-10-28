import { ERRORS } from "../constant";
import { AuthenticateError, NotFoundError, ValidationError } from "./error";
import { Response } from "express";

export const handleError = (res: Response, error: Error): Response => {
  if (error instanceof ValidationError) {
    return res.status(error.status).send({
      message: error.message,
      fieldErrors: error.fieldErrors,
      success: false,
    });
  }

  if (error instanceof AuthenticateError) {
    return res.status(error.status).send({
      message: error.message,
      success: false,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.status).send({
      message: error.message,
      success: false,
    });
  }

  return res.status(500).send({
    message: ERRORS.INTERNAL_SERVER,
    success: false,
  });
};

export const handleSuccess = <T>(res: Response, data: T): Response => {
  return res.status(200).send({
    data,
    success: true,
  });
};
