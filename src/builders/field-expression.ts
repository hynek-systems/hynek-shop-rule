import { Field } from "../fields/field.js";
import { Rule } from "../nodes/rule.js";
import { EqualsOperator } from "../operators/rule/equals-operator.js";
import { NotEqualsOperator } from "../operators/rule/not-equals-operator.ts";

export class FieldExpression {
  private readonly field: string;

  public constructor(field: string | Field) {
    this.field = field instanceof Field ? field.id : field;
  }

  public equals(value: unknown): Rule {
    return new Rule(this.field, new EqualsOperator(), value);
  }

  public notEquals(value: unknown): Rule {
    return new Rule(this.field, new NotEqualsOperator(), value);
  }
}
