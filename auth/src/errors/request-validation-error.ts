import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  // equiv
  // errors: ValidationError[]
  constructor(public errors: ValidationError[]) {
    // this.errors = errors
    super("Invalid request params");

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.param
      };
    });
  }
}