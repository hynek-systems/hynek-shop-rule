import { OperandKind } from "./operand-kind.ts";

import { RuleOperator } from "./rule-operator.ts";

export class BeforeOperator extends RuleOperator {
  public readonly id = "before";

  public readonly label = "Before";

  public readonly operandKind = OperandKind.Single;

  public evaluate(left: unknown, right: unknown): boolean {
    return left instanceof Date && right instanceof Date && left < right;
  }

  public override serializeOperand(value: unknown): unknown {
    const date = value as Date;

    return date.toISOString();
  }

  public override deserializeOperand(value: unknown): unknown {
    const date = value as string;

    return new Date(date);
  }
}
