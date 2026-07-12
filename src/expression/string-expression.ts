import type { Rule } from "../nodes/rule.ts";
import type { BaseExpression } from "./base-expression.js";

export interface StringExpression extends BaseExpression<string> {
  contains(value: string): Rule;

  startsWith(value: string): Rule;

  endsWith(value: string): Rule;
}
