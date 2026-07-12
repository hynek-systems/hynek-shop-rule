import { ValidationError } from "./validation-error.ts";

export interface Validator<T> {
  validate(value: T): ValidationError[];
}
