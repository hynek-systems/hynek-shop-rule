import type { BaseExpression } from "./base-expression.js";

export interface DateExpression extends BaseExpression<Date> {
  before(value: Date): never;

  after(value: Date): never;

  between(from: Date, to: Date): never;
}
