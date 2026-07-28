import { OperandKind } from "./operand-kind.ts";

import { Range } from "../../values/range.ts";

import { RuleOperator } from "./rule-operator.ts";

export class BetweenOperator extends RuleOperator {
  public readonly id = "between";

  public readonly label = "Between";

  public readonly operandKind = OperandKind.Range;

  public override isValidOperand(value: unknown): boolean {
    if (!(value instanceof Range)) {
      return false;
    }

    if (typeof value.from === "number" && typeof value.to === "number") {
      return Number.isFinite(value.from) && Number.isFinite(value.to) && value.from <= value.to;
    }

    if (this.isValidDate(value.from) && this.isValidDate(value.to)) {
      return value.from <= value.to;
    }

    return false;
  }

  public evaluate(left: unknown, right: unknown): boolean {
    if (
      typeof left === "number" &&
      right instanceof Range &&
      typeof right.from === "number" &&
      typeof right.to === "number"
    ) {
      return left >= right.from && left <= right.to;
    }

    if (
      left instanceof Date &&
      right instanceof Range &&
      right.from instanceof Date &&
      right.to instanceof Date
    ) {
      return left >= right.from && left <= right.to;
    }

    return false;
  }

  public override serializeOperand(value: unknown): unknown {
    const range = value as Range<unknown>;

    return {
      from: this.serializeValue(range.from),
      to: this.serializeValue(range.to),
    };
  }

  private serializeValue(value: unknown): unknown {
    if (value instanceof Date) {
      return value.toISOString();
    }

    return value;
  }

  public override deserializeOperand(value: unknown): unknown {
    const range = value as {
      from: unknown;
      to: unknown;
    };

    return new Range(this.deserializeValue(range.from), this.deserializeValue(range.to));
  }

  private deserializeValue(value: unknown): unknown {
    if (typeof value === "string" && !Number.isNaN(Date.parse(value))) {
      return new Date(value);
    }

    return value;
  }
}
