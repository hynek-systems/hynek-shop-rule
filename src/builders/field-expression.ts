import { Rule } from "../nodes/rule.js";

import { EqualsOperator } from "../operators/rule/equals-operator.js";

export class FieldExpression {
  public constructor(private readonly field: string) {}

  public equals(value: unknown): Rule {
    return new Rule(this.field, new EqualsOperator(), value);
  }
}
