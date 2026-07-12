import type { BaseExpression } from "./base-expression.js";

export interface NumberExpression extends BaseExpression<number> {
  greaterThan(value: number): never;

  greaterThanOrEqual(value: number): never;

  lessThan(value: number): never;

  lessThanOrEqual(value: number): never;

  between(min: number, max: number): never;
}
