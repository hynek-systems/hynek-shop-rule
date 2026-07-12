import type { Rule } from "../nodes/rule.ts";
import type { BaseExpression } from "./base-expression.js";

export interface NumberExpression extends BaseExpression<number> {
  greaterThan(value: number): Rule;

  greaterThanOrEqual(value: number): never;

  lessThan(value: number): never;

  lessThanOrEqual(value: number): never;

  between(min: number, max: number): never;
}
