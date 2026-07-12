import type { BaseExpression } from "./base-expression.js";

export interface StringExpression extends BaseExpression<string> {
  contains(value: string): never;

  startsWith(value: string): never;

  endsWith(value: string): never;
}
