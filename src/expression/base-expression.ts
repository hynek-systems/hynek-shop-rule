import { Rule } from "../nodes/rule.ts";

export interface BaseExpression<T> {
  equals(value: T): Rule;

  notEquals(value: T): Rule;
}
