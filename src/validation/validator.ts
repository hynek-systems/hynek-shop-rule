import { ValidationError } from "./validation-error.js";

export interface Validator<T> {
  validate(value: T): ValidationError[];
}
