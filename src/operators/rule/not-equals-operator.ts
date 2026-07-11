import { OperandKind } from "./operand-kind.ts";
import { RuleOperator } from "./rule-operator.ts";

export class NotEqualsOperator extends RuleOperator {
  public readonly id = "not_equals";

  public readonly label = "Not Equals";

  public readonly operandKind = OperandKind.Single;
}
