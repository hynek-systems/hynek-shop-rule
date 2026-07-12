import { OperandKind } from "./operand-kind.js";
import { RuleOperator } from "./rule-operator.js";

export class LessThanOperator extends RuleOperator {
  public readonly id = "less_than";

  public readonly label = "Less than";

  public readonly operandKind = OperandKind.Single;

  public evaluate(left: unknown, right: unknown): boolean {
    return typeof left === "number" && typeof right === "number" && left < right;
  }
}
