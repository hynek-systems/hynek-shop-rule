import type { BaseExpression } from "../expression/base-expression.ts";
import { Field } from "../fields/field.ts";
import { Rule } from "../nodes/rule.ts";
import { BeforeOperator } from "../operators/rule/before-operator.ts";
import { BetweenOperator } from "../operators/rule/between-operator.ts";
import { ContainsOperator } from "../operators/rule/contains-operator.ts";
import { EndsWithOperator } from "../operators/rule/ends-with-operator.ts";
import { EqualsOperator } from "../operators/rule/equals-operator.ts";
import { GreaterThanOperator } from "../operators/rule/greater-than-operator.ts";
import { GreaterThanOrEqualOperator } from "../operators/rule/greater-than-or-equal-operator.ts";
import { LessThanOperator } from "../operators/rule/less-than-operator.ts";
import { LessThanOrEqualOperator } from "../operators/rule/less-than-or-equal-operator.ts";
import { NotEqualsOperator } from "../operators/rule/not-equals-operator.ts";
import { StartsWithOperator } from "../operators/rule/starts-with-operator.ts";
import { Range } from "../values/range.ts";

export class FieldExpression<T = unknown> implements BaseExpression<T> {
  private readonly field: string;

  public constructor(field: string | Field<T>) {
    this.field = field instanceof Field ? field.id : field;
  }

  public equals(value: T): Rule {
    return new Rule(this.field, new EqualsOperator(), value);
  }

  public eq(value: T): Rule {
    return this.equals(value);
  }

  public notEquals(value: T): Rule {
    return new Rule(this.field, new NotEqualsOperator(), value);
  }

  public neq(value: T): Rule {
    return this.notEquals(value);
  }

  public contains(value: T): Rule {
    return new Rule(this.field, new ContainsOperator(), value);
  }

  public startsWith(value: T): Rule {
    return new Rule(this.field, new StartsWithOperator(), value);
  }

  public endsWith(value: string): Rule {
    return new Rule(this.field, new EndsWithOperator(), value);
  }

  public greaterThan(value: number): Rule {
    return new Rule(this.field, new GreaterThanOperator(), value);
  }

  public gt(value: number): Rule {
    return this.greaterThan(value);
  }

  public greaterThanOrEqual(value: number): Rule {
    return new Rule(this.field, new GreaterThanOrEqualOperator(), value);
  }

  public gte(value: number): Rule {
    return this.greaterThanOrEqual(value);
  }

  public lessThan(value: number): Rule {
    return new Rule(this.field, new LessThanOperator(), value);
  }

  public lt(value: number): Rule {
    return this.lessThan(value);
  }

  public lessThanOrEqual(value: number): Rule {
    return new Rule(this.field, new LessThanOrEqualOperator(), value);
  }

  public lte(value: number): Rule {
    return this.lessThanOrEqual(value);
  }

  public between(from: number, to: number): Rule {
    return new Rule(this.field, new BetweenOperator(), new Range(from, to));
  }

  public before(value: Date): Rule {
    return new Rule(this.field, new BeforeOperator(), value);
  }
}
