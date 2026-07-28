import { RuleOperator } from "./rule-operator.ts";
import { OperandKind } from "./operand-kind.ts";

export class StartsWithOperator extends RuleOperator {
  public readonly id = "starts_with";

  public readonly label = "Starts with";

  readonly operandKind = OperandKind.Single;

  public override isValidOperand(value: unknown): boolean {
    return typeof value === "string";
  }

  public evaluate(left: unknown, right: unknown): boolean {
    if (typeof left !== "string" || typeof right !== "string") {
      return false;
    }

    return left.startsWith(right);
  }
}
