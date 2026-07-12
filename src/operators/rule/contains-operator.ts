import { OperandKind } from "./operand-kind.ts";
import { RuleOperator } from "./rule-operator.ts";

export class ContainsOperator extends RuleOperator {
  readonly id = "contains";

  readonly label = "Contains";

  readonly operandKind = OperandKind.Single;

  public evaluate(left: unknown, right: unknown): boolean {
    return (left as string).includes(right as string);
  }
}
