import { OperandKind } from "./operand-kind.js";
import { Range } from "../../values/range.js";

import { RuleOperator } from "./rule-operator.js";

export class BetweenOperator extends RuleOperator {
  public readonly id = "between";

  public readonly label = "Between";

  public readonly operandKind = OperandKind.Range;

  public evaluate(left: unknown, right: unknown): boolean {
    if (typeof left !== "number" || !(right instanceof Range)) {
      return false;
    }

    return (
      typeof right.from === "number" &&
      typeof right.to === "number" &&
      left >= right.from &&
      left <= right.to
    );
  }
}
