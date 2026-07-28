import { OperandKind } from "./operand-kind.ts";

import { RuleOperator } from "./rule-operator.ts";

export class AfterOperator extends RuleOperator {
  public readonly id = "after";

  public readonly label = "After";

  public readonly operandKind = OperandKind.Single;

  public override isValidOperand(value: unknown): boolean {
    return this.isValidDate(value);
  }

  public evaluate(left: unknown, right: unknown): boolean {
    return left instanceof Date && right instanceof Date && left > right;
  }

  public override serializeOperand(value: unknown): unknown {
    return (value as Date).toISOString();
  }

  public override deserializeOperand(value: unknown): unknown {
    return new Date(value as string);
  }
}
