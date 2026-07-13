import type { Rule } from "../nodes/rule.ts";
import type { BaseExpression } from "./base-expression.ts";

export interface DateExpression extends BaseExpression<Date> {
  before(value: Date): Rule;

  after(value: Date): Rule;

  between(from: Date, to: Date): Rule;
}
