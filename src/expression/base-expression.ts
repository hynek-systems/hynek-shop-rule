import { Rule } from "../nodes/rule.js";

export interface BaseExpression<T> {
  equals(value: T): Rule;

  notEquals(value: T): Rule;
}
