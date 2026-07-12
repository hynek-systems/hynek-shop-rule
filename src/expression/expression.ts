import type { BooleanExpression } from "./boolean-expression.ts";
import type { DateExpression } from "./date-expression.ts";
import type { NumberExpression } from "./number-expression.ts";
import type { BaseExpression } from "./base-expression.ts";
import type { StringExpression } from "./string-expression.ts";

export type Expression<T> = T extends string
  ? StringExpression
  : T extends number
    ? NumberExpression
    : T extends boolean
      ? BooleanExpression
      : T extends Date
        ? DateExpression
        : BaseExpression<T>;
