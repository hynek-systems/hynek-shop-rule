import { Rule } from "../nodes/rule.js";

import { EqualsOperator } from "../operators/rule/equals-operator.js";
import { NotEqualsOperator } from "../operators/rule/not-equals-operator.ts";

export class FieldExpression {
  public constructor(private readonly field: string) {}

  public equals(value: unknown): Rule {
    return new Rule(this.field, new EqualsOperator(), value);
  }

  public notEquals(value: unknown): Rule {
    return new Rule(this.field, new NotEqualsOperator(), value);
  }
}
