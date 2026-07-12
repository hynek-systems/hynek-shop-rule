import type { BooleanExpression } from "./boolean-expression.js";
import type { DateExpression } from "./date-expression.js";
import type { NumberExpression } from "./number-expression.js";
import type { BaseExpression } from "./base-expression.js";
import type { StringExpression } from "./string-expression.js";

export type Expression<T> = T extends string
  ? StringExpression
  : T extends number
    ? NumberExpression
    : T extends boolean
      ? BooleanExpression
      : T extends Date
        ? DateExpression
        : BaseExpression<T>;
