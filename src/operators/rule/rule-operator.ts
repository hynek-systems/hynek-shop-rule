import type { OperandKind } from "./operand-kind.ts";
import { Operator } from "../operator.ts";

export abstract class RuleOperator extends Operator {
  public abstract readonly operandKind: OperandKind;

  public abstract evaluate(left: unknown, right: unknown): boolean;
}
