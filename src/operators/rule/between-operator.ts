import { OperandKind } from "./operand-kind.ts";

import { Range } from "../../values/range.ts";

import { RuleOperator } from "./rule-operator.ts";

export class BetweenOperator<T> extends RuleOperator {
  public readonly id = "between";

  public readonly label = "Between";

  public readonly operandKind = OperandKind.Range;

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
    const range = value as Range<T>;

    return {
      from: range.from,
      to: range.to,
    };
  }

  public override deserializeOperand(value: unknown): unknown {
    const range = value as {
      from: T;
      to: T;
    };

    // TODO: When date the return should be new Rande(new Date(range.from as unknown as string), new Date(range.to as unknown as string));
    return new Range(range.from, range.to);
  }
}
