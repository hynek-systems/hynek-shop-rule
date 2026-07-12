import { OperandKind } from "./operand-kind.ts";
import { RuleOperator } from "./rule-operator.ts";

export class GreaterThanOrEqualOperator extends RuleOperator {
  public readonly id = "greater_than_or_equal";

  public readonly label = "Greater than or equal";

  public readonly operandKind = OperandKind.Single;

  public evaluate(left: unknown, right: unknown): boolean {
    return typeof left === "number" && typeof right === "number" && left >= right;
  }
}
