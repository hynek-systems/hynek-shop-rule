import { OperandKind } from "./operand-kind.ts";
import { RuleOperator } from "./rule-operator.ts";

export class ContainsOperator extends RuleOperator {
  readonly id = "contains";

  readonly label = "Contains";

  readonly operandKind = OperandKind.Single;

  public override isValidOperand(value: unknown): boolean {
    return typeof value === "string";
  }

  public evaluate(left: unknown, right: unknown): boolean {
    return typeof left === "string" && typeof right === "string" && left.includes(right);
  }
}
