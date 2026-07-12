import { Node } from "./node.js";
import type { Field } from "../fields/field.js";
import type { RuleOperator } from "../operators/rule/rule-operator.ts";
import { FieldExpression } from "../builders/field-expression.ts";
import type { NodeVisitor } from "../visitors/node-visitor.ts";

export class Rule extends Node {
  public constructor(
    public readonly field: string,
    public readonly operator: RuleOperator,
    public readonly value: unknown,
  ) {
    super();
  }

  public static field<T = unknown>(field: Field<T> | string): FieldExpression<T> {
    return new FieldExpression<T>(field);
  }

  public accept<TResult>(visitor: NodeVisitor<TResult>): TResult {
    return visitor.visitRule(this);
  }
}
