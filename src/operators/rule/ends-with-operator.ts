import { RuleOperator } from "./rule-operator.js";
import { OperandKind } from "./operand-kind.ts";

export class EndsWithOperator extends RuleOperator {
  public readonly id = "ends_with";

  public readonly label = "Ends with";

  readonly operandKind = OperandKind.Single;

  public evaluate(left: unknown, right: unknown): boolean {
    if (typeof left !== "string" || typeof right !== "string") {
      return false;
    }

    return left.endsWith(right);
  }
}
