import type { RuleOperator } from "../operators/rule/rule-operator.ts";

export abstract class Field<T = unknown> {
  public constructor(
    public readonly id: string,
    public readonly label: string,
  ) {}

  public abstract operators(): RuleOperator[];
}
