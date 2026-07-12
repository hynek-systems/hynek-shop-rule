import { OperandKind } from "./operand-kind.ts";
import { RuleOperator } from "./rule-operator.ts";

export class NotEqualsOperator extends RuleOperator {
  public readonly id = "!=";

  public readonly label = "Not Equals";

  public readonly operandKind = OperandKind.Single;

  public evaluate(left: unknown, right: unknown): boolean {
    return left !== right;
  }
}
