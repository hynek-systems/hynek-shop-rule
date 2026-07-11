import { Node } from "./node.js";
import type { Field } from "../fields/field.js";
import type { RuleOperator } from "../operators/rule/rule-operator.ts";
import { FieldExpression } from "../builders/field-expression.ts";

export class Rule extends Node {
  public constructor(
    public readonly field: string,
    public readonly operator: RuleOperator,
    public readonly value: unknown,
  ) {
    super();
  }

  public static field(field: Field | string): FieldExpression {
    return new FieldExpression(field);
  }
}
