import type { Rule } from "../nodes/rule.ts";
import type { BaseExpression } from "./base-expression.ts";

export interface NumberExpression extends BaseExpression<number> {
  greaterThan(value: number): Rule;

  greaterThanOrEqual(value: number): Rule;

  lessThan(value: number): Rule;

  lessThanOrEqual(value: number): never;

  between(min: number, max: number): never;
}
