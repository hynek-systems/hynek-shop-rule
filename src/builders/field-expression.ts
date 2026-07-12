import type { BaseExpression } from "../expression/base-expression.ts";
import { Field } from "../fields/field.js";
import { Rule } from "../nodes/rule.js";
import { ContainsOperator } from "../operators/rule/contains-operator.ts";
import { EqualsOperator } from "../operators/rule/equals-operator.js";
import { NotEqualsOperator } from "../operators/rule/not-equals-operator.ts";
import { StartsWithOperator } from "../operators/rule/starts-with-operator.ts";

export class FieldExpression<T = unknown> implements BaseExpression<T> {
  private readonly field: string;

  public constructor(field: string | Field<T>) {
    this.field = field instanceof Field ? field.id : field;
  }

  public equals(value: T): Rule {
    return new Rule(this.field, new EqualsOperator(), value);
  }

  public notEquals(value: T): Rule {
    return new Rule(this.field, new NotEqualsOperator(), value);
  }

  public contains(value: T): Rule {
    return new Rule(this.field, new ContainsOperator(), value);
  }

  public startsWith(value: T): Rule {
    return new Rule(this.field, new StartsWithOperator(), value);
  }
}
