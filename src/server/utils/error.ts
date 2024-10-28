import { ERROR_NAMES } from '../constant';
import { ValidationErrorItem } from 'joi';

type CustomValidationMessage = string | { details: ValidationErrorItem[] };

export class ValidationError extends Error {
  status: number;
  fieldErrors: { fieldName: string; message: string }[] = [];

  constructor(message: CustomValidationMessage) {
    super(typeof message === 'string' ? message : "Validation failed");

    this.status = 400;
    this.name = ERROR_NAMES.VALIDATION;

    // If message is an object with details, populate fieldErrors
    if (typeof message !== 'string') {
      this.fieldErrors = message.details.map(({ path, message }: ValidationErrorItem) => ({
        fieldName: path[0]?.toString() || '',
        message,
      }));
    }
  }
}

export class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 404;
    this.name = ERROR_NAMES.NOT_FOUND;
  }
}

export class AuthenticateError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 401;
    this.name = ERROR_NAMES.AUTHENTICATE;
  }
}

export class UniqueConstraintError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 409; // Typically unique constraint errors are 409 Conflict
    this.name = ERROR_NAMES.UNIQUE_CONSTRAINT;
  }
}
