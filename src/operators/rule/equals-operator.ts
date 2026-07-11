import { OperandKind } from "./operand-kind.ts";
import { RuleOperator } from "./rule-operator.ts";

export class EqualsOperator extends RuleOperator {
  readonly id = "=";

  readonly label = "Equals";

  readonly operandKind = OperandKind.Single;
}
